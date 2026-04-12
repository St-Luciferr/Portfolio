'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema } from '@/lib/validations';
import type { DBProject } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { useToast } from '@/hooks/use-toast';
import { Plus, X, Loader2 } from 'lucide-react';

interface ProjectFormProps {
  project?: DBProject | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const tagColors = [
  { value: 'blue-text-gradient', label: 'Blue' },
  { value: 'green-text-gradient', label: 'Green' },
  { value: 'pink-text-gradient', label: 'Pink' },
  { value: 'orange-text-gradient', label: 'Orange' },
];

export function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      slug: project?.slug || '',
      name: project?.name || '',
      description: project?.description || '',
      image_url: project?.image_url || '',
      source_code_link: project?.source_code_link || '',
      demo_url: project?.demo_url || null,
      is_demo: project?.is_demo || false,
      is_published: project?.is_published ?? true,
      display_order: project?.display_order ?? 0,
      tags: project?.project_tags?.map(tag => ({
        name: tag.name,
        color: tag.color,
      })) || [{ name: '', color: 'blue-text-gradient' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      const url = project
        ? `/api/admin/projects/${project.id}`
        : '/api/admin/projects';

      const method = project ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Success',
          description: project
            ? 'Project updated successfully'
            : 'Project created successfully',
        });
        onSuccess();
      } else {
        throw new Error(result.error || 'Operation failed');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to save project',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">
          Project Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Medical Q/A Chatbot"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <Label htmlFor="slug">
          URL Slug <span className="text-red-500">*</span>
        </Label>
        <Input
          id="slug"
          {...register('slug')}
          placeholder="medical-qa-chatbot"
        />
        <p className="text-sm text-gray-500">
          URL-friendly identifier (lowercase, hyphens only)
        </p>
        {errors.slug && (
          <p className="text-sm text-red-500">{errors.slug.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">
          Description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          {...register('description')}
          rows={4}
          placeholder="A context-aware medical chatbot using RAG..."
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Image Upload */}
      <ImageUpload
        bucket="projects"
        currentImage={watch('image_url')}
        onUpload={(url) => setValue('image_url', url)}
        label="Project Image *"
      />
      {errors.image_url && (
        <p className="text-sm text-red-500">{errors.image_url.message}</p>
      )}

      {/* Tags */}
      <div className="space-y-2">
        <Label>
          Tags <span className="text-red-500">*</span>
        </Label>
        <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <Input
                {...register(`tags.${index}.name` as const)}
                placeholder="Tag name (e.g., Python)"
                className="flex-1"
              />
              <Select
                value={watch(`tags.${index}.color`)}
                onValueChange={(value) =>
                  setValue(`tags.${index}.color` as const, value)
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tagColors.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      {color.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ name: '', color: 'blue-text-gradient' })}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Tag
        </Button>
        {errors.tags && (
          <p className="text-sm text-red-500">At least one tag is required</p>
        )}
      </div>

      {/* Source Code Link */}
      <div className="space-y-2">
        <Label htmlFor="source_code_link">
          Source Code Link <span className="text-red-500">*</span>
        </Label>
        <Input
          id="source_code_link"
          {...register('source_code_link')}
          placeholder="https://github.com/username/repo"
        />
        {errors.source_code_link && (
          <p className="text-sm text-red-500">
            {errors.source_code_link.message}
          </p>
        )}
      </div>

      {/* Demo URL */}
      <div className="space-y-2">
        <Label htmlFor="demo_url">Demo URL (Optional)</Label>
        <Input
          id="demo_url"
          {...register('demo_url')}
          placeholder="https://demo.example.com"
        />
        {errors.demo_url && (
          <p className="text-sm text-red-500">{errors.demo_url.message}</p>
        )}
      </div>

      {/* Display Order */}
      <div className="space-y-2">
        <Label htmlFor="display_order">Display Order</Label>
        <Input
          id="display_order"
          type="number"
          {...register('display_order', { valueAsNumber: true })}
          placeholder="0"
        />
        <p className="text-sm text-gray-500">
          Lower numbers appear first
        </p>
      </div>

      {/* Published Status */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_published"
          {...register('is_published')}
          className="w-4 h-4 rounded border-gray-300"
        />
        <Label htmlFor="is_published">Publish immediately</Label>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : project ? (
            'Update Project'
          ) : (
            'Create Project'
          )}
        </Button>
      </div>
    </form>
  );
}
