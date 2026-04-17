'use client';

import { useMemo, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import readingTime from 'reading-time';
import { blogPostSchema } from '@/lib/validations';
import type { DBBlogPost } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { MarkdownEditor } from '@/components/admin/MarkdownEditor';
import { useToast } from '@/hooks/use-toast';
import { Plus, X, Loader2, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogPostFormProps {
  post?: DBBlogPost | null;
  onSuccess: () => void;
  onCancel: () => void;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function BlogPostForm({ post, onSuccess, onCancel }: BlogPostFormProps) {
  const [loading, setLoading] = useState(false);
  const [seoOpen, setSeoOpen] = useState(false);
  const [keywordInput, setKeywordInput] = useState('');
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
    getValues,
  } = useForm({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      slug: post?.slug || '',
      title: post?.title || '',
      excerpt: post?.excerpt || '',
      content: post?.content || '',
      cover_image_url: post?.cover_image_url || null,
      cover_image_alt: post?.cover_image_alt || null,
      seo_title: post?.seo_title || null,
      seo_description: post?.seo_description || null,
      seo_keywords: (post?.seo_keywords as string[]) || [],
      canonical_url: post?.canonical_url || null,
      is_published: post?.is_published ?? false,
      display_order: post?.display_order ?? 0,
      tags:
        post?.blog_tags?.map((t) => ({
          name: t.name,
          slug: t.slug,
          display_order: t.display_order,
        })) || [],
    },
  });

  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
    control,
    name: 'tags',
  });

  const title = watch('title');
  const excerpt = watch('excerpt') || '';
  const content = watch('content') || '';
  const seoTitle = watch('seo_title') || '';
  const seoDescription = watch('seo_description') || '';
  const keywords = watch('seo_keywords') || [];
  const coverImageUrl = watch('cover_image_url');

  const minutes = useMemo(() => {
    if (!content.trim()) return 0;
    return Math.max(1, Math.round(readingTime(content).minutes));
  }, [content]);

  const handleTitleBlur = () => {
    const currentSlug = getValues('slug');
    if (!currentSlug && title) setValue('slug', slugify(title));
  };

  const addKeyword = () => {
    const kw = keywordInput.trim();
    if (!kw) return;
    if (!keywords.includes(kw)) setValue('seo_keywords', [...keywords, kw]);
    setKeywordInput('');
  };

  const removeKeyword = (kw: string) => {
    setValue(
      'seo_keywords',
      keywords.filter((k) => k !== kw)
    );
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const url = post ? `/api/admin/posts/${post.id}` : '/api/admin/posts';
      const method = post ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Success',
          description: post ? 'Post updated' : 'Post created',
        });
        onSuccess();
      } else {
        throw new Error(result.error || 'Operation failed');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to save post',
      });
    } finally {
      setLoading(false);
    }
  };

  const charCounter = (value: string, soft: number, max: number) => {
    const over = value.length > max;
    const warn = value.length > soft;
    return (
      <span
        className={cn(
          'text-xs',
          over ? 'text-red-600' : warn ? 'text-amber-600' : 'text-gray-500'
        )}
      >
        {value.length} / {soft} (max {max})
      </span>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">
          Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          {...register('title')}
          onBlur={handleTitleBlur}
          placeholder="Building a RAG chatbot for business documents"
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">
          URL Slug <span className="text-red-500">*</span>
        </Label>
        <Input id="slug" {...register('slug')} placeholder="rag-chatbot-business-docs" />
        <p className="text-xs text-gray-500">
          /blog/&lt;slug&gt; — lowercase, hyphens only. Auto-filled from title.
        </p>
        {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="excerpt">
            Excerpt <span className="text-red-500">*</span>
          </Label>
          {charCounter(excerpt, 160, 320)}
        </div>
        <Textarea
          id="excerpt"
          {...register('excerpt')}
          rows={3}
          placeholder="Short summary used as the meta description and preview card copy."
        />
        {errors.excerpt && (
          <p className="text-sm text-red-500">{errors.excerpt.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <ImageUpload
          bucket="blog"
          currentImage={coverImageUrl || ''}
          onUpload={(url) => setValue('cover_image_url', url)}
          label="Cover Image"
        />
        <Input
          {...register('cover_image_alt')}
          placeholder="Cover image alt text (required for a11y + SEO when image is set)"
        />
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="space-y-2">
          {tagFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <Input
                {...register(`tags.${index}.name` as const)}
                placeholder="Tag name (e.g., RAG)"
                onBlur={(e) => {
                  const currentSlug = getValues(`tags.${index}.slug`);
                  if (!currentSlug && e.target.value) {
                    setValue(`tags.${index}.slug`, slugify(e.target.value));
                  }
                }}
                className="flex-1"
              />
              <Input
                {...register(`tags.${index}.slug` as const)}
                placeholder="tag-slug"
                className="w-48"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeTag(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => appendTag({ name: '', slug: '' })}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Tag
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>
            Content (Markdown) <span className="text-red-500">*</span>
          </Label>
          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            {minutes > 0 ? `${minutes} min read` : 'reading time'}
          </span>
        </div>
        <Controller
          control={control}
          name="content"
          render={({ field }) => (
            <MarkdownEditor value={field.value || ''} onChange={field.onChange} />
          )}
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      <div className="border rounded-lg">
        <button
          type="button"
          onClick={() => setSeoOpen((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <span>SEO overrides (optional)</span>
          {seoOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {seoOpen && (
          <div className="px-4 pb-4 space-y-4 border-t">
            <div className="space-y-2 pt-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="seo_title">SEO Title</Label>
                {charCounter(seoTitle, 60, 80)}
              </div>
              <Input
                id="seo_title"
                {...register('seo_title')}
                placeholder="Falls back to post title when empty"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="seo_description">SEO Description</Label>
                {charCounter(seoDescription, 160, 200)}
              </div>
              <Textarea
                id="seo_description"
                {...register('seo_description')}
                rows={2}
                placeholder="Falls back to excerpt when empty"
              />
            </div>

            <div className="space-y-2">
              <Label>SEO Keywords</Label>
              <div className="flex gap-2">
                <Input
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addKeyword();
                    }
                  }}
                  placeholder="Type a keyword and press Enter"
                />
                <Button type="button" variant="outline" onClick={addKeyword}>
                  Add
                </Button>
              </div>
              {keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {keywords.map((kw) => (
                    <span
                      key={kw}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 text-xs"
                    >
                      {kw}
                      <button
                        type="button"
                        onClick={() => removeKeyword(kw)}
                        className="text-gray-500 hover:text-gray-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="canonical_url">Canonical URL</Label>
              <Input
                id="canonical_url"
                {...register('canonical_url')}
                placeholder="https://example.com/original-post (for syndicated content)"
              />
              {errors.canonical_url && (
                <p className="text-sm text-red-500">{errors.canonical_url.message}</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="space-y-2">
          <Label htmlFor="display_order">Display Order</Label>
          <Input
            id="display_order"
            type="number"
            {...register('display_order', { valueAsNumber: true })}
            placeholder="0"
          />
        </div>
        <div className="flex items-center gap-2 pt-7">
          <input
            type="checkbox"
            id="is_published"
            {...register('is_published')}
            className="w-4 h-4 rounded border-gray-300"
          />
          <Label htmlFor="is_published">Publish immediately</Label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving…
            </>
          ) : post ? (
            'Update Post'
          ) : (
            'Create Post'
          )}
        </Button>
      </div>
    </form>
  );
}
