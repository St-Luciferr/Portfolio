'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { technologySchema } from '@/lib/validations';
import type { DBTechnology } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface TechnologyFormProps {
  technology?: DBTechnology | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function TechnologyForm({ technology, onSuccess, onCancel }: TechnologyFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(technologySchema),
    defaultValues: {
      name: technology?.name || '',
      icon_url: technology?.icon_url || '',
      is_published: technology?.is_published ?? true,
      display_order: technology?.display_order ?? 0,
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      const url = technology
        ? `/api/admin/technologies/${technology.id}`
        : '/api/admin/technologies';

      const method = technology ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Success',
          description: technology
            ? 'Technology updated successfully'
            : 'Technology added successfully',
        });
        onSuccess();
      } else {
        throw new Error(result.error || 'Operation failed');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to save technology',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">
          Technology Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Python"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <ImageUpload
        bucket="technologies"
        currentImage={watch('icon_url')}
        onUpload={(url) => setValue('icon_url', url)}
        label="Technology Icon *"
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
          ) : technology ? (
            'Update Technology'
          ) : (
            'Add Technology'
          )}
        </Button>
      </div>
    </form>
  );
}
