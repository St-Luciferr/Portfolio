'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceSchema } from '@/lib/validations';
import type { DBService } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface ServiceFormProps {
  service?: DBService | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ServiceForm({ service, onSuccess, onCancel }: ServiceFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: service?.title || '',
      icon_url: service?.icon_url || '',
      is_published: service?.is_published ?? true,
      display_order: service?.display_order ?? 0,
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      const url = service
        ? `/api/admin/services/${service.id}`
        : '/api/admin/services';

      const method = service ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Success',
          description: service
            ? 'Service updated successfully'
            : 'Service added successfully',
        });
        onSuccess();
      } else {
        throw new Error(result.error || 'Operation failed');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to save service',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">
          Service Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          {...register('title')}
          placeholder="ML Developer"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <ImageUpload
        bucket="services"
        currentImage={watch('icon_url')}
        onUpload={(url) => setValue('icon_url', url)}
        label="Service Icon *"
      />
      {errors.icon_url && (
        <p className="text-sm text-red-500">{errors.icon_url.message}</p>
      )}

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
          ) : service ? (
            'Update Service'
          ) : (
            'Add Service'
          )}
        </Button>
      </div>
    </form>
  );
}
