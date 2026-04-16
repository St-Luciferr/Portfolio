'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { testimonialSchema } from '@/lib/validations';
import type { DBTestimonial } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface TestimonialFormProps {
  testimonial?: DBTestimonial | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function TestimonialForm({ testimonial, onSuccess, onCancel }: TestimonialFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      testimonial: testimonial?.testimonial || '',
      name: testimonial?.name || '',
      designation: testimonial?.designation || '',
      company: testimonial?.company || '',
      image_url: testimonial?.image_url || '',
      is_published: testimonial?.is_published ?? true,
      display_order: testimonial?.display_order ?? 0,
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const url = testimonial
        ? `/api/admin/testimonials/${testimonial.id}`
        : '/api/admin/testimonials';
      const method = testimonial ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Success',
          description: testimonial ? 'Testimonial updated' : 'Testimonial added',
        });
        onSuccess();
      } else {
        throw new Error(result.error || 'Operation failed');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to save testimonial',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="testimonial">
          Testimonial <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="testimonial"
          {...register('testimonial')}
          placeholder="What the client said about working with you..."
          rows={4}
        />
        {errors.testimonial && (
          <p className="text-sm text-red-500">{errors.testimonial.message as string}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
          <Input id="name" {...register('name')} placeholder="John Smith" />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message as string}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company <span className="text-red-500">*</span></Label>
          <Input id="company" {...register('company')} placeholder="Acme Corp" />
          {errors.company && (
            <p className="text-sm text-red-500">{errors.company.message as string}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="designation">
          Designation <span className="text-red-500">*</span>
        </Label>
        <Input id="designation" {...register('designation')} placeholder="CTO" />
        {errors.designation && (
          <p className="text-sm text-red-500">{errors.designation.message as string}</p>
        )}
      </div>

      <ImageUpload
        bucket="testimonials"
        currentImage={watch('image_url')}
        onUpload={(url) => setValue('image_url', url)}
        label="Profile Photo *"
      />
      {errors.image_url && (
        <p className="text-sm text-red-500">{errors.image_url.message as string}</p>
      )}

      <div className="space-y-2">
        <Label htmlFor="display_order">Display Order</Label>
        <Input
          id="display_order"
          type="number"
          {...register('display_order', { valueAsNumber: true })}
          placeholder="0"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_published"
          {...register('is_published')}
          className="w-4 h-4 rounded border-gray-300"
        />
        <Label htmlFor="is_published">Publish immediately</Label>
      </div>

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
          ) : testimonial ? (
            'Update Testimonial'
          ) : (
            'Add Testimonial'
          )}
        </Button>
      </div>
    </form>
  );
}
