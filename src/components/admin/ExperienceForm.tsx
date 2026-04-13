'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { experienceSchema } from '@/lib/validations';
import type { DBExperience, DBExperiencePoint } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, X } from 'lucide-react';

interface ExperienceFormProps {
  experience?: DBExperience | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ExperienceForm({ experience, onSuccess, onCancel }: ExperienceFormProps) {
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState<DBExperiencePoint[]>([]);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      title: experience?.title || '',
      company_name: experience?.company_name || '',
      icon_url: experience?.icon_url || '',
      icon_bg_color: experience?.icon_bg_color || '#3B82F6',
      date: experience?.date || '',
      points: [],
      is_published: experience?.is_published ?? true,
      display_order: experience?.display_order ?? 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'points',
  });

  useEffect(() => {
    if (experience) {
      fetchExperiencePoints();
    }
  }, [experience]);

  const fetchExperiencePoints = async () => {
    if (!experience) return;

    try {
      const response = await fetch(`/api/admin/experiences/${experience.id}`);
      const result = await response.json();

      if (result.success && result.data.points) {
        setPoints(result.data.points);
        // Initialize form with existing points as strings
        result.data.points.forEach((point: DBExperiencePoint) => {
          append(point.point);
        });
      }
    } catch (error) {
      console.error('Failed to fetch experience points:', error);
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      const url = experience
        ? `/api/admin/experiences/${experience.id}`
        : '/api/admin/experiences';

      const method = experience ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Success',
          description: experience
            ? 'Experience updated successfully'
            : 'Experience added successfully',
        });
        onSuccess();
      } else {
        throw new Error(result.error || 'Operation failed');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to save experience',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">
            Job Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            {...register('title')}
            placeholder="Senior Software Engineer"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company_name">
            Company Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="company_name"
            {...register('company_name')}
            placeholder="Tech Corp"
          />
          {errors.company_name && (
            <p className="text-sm text-red-500">{errors.company_name.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ImageUpload
          bucket="companies"
          currentImage={watch('icon_url')}
          onUpload={(url) => setValue('icon_url', url)}
          label="Company Icon *"
        />

        <div className="space-y-2">
          <Label htmlFor="icon_bg_color">
            Icon Background Color <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-2">
            <Input
              id="icon_bg_color"
              type="color"
              {...register('icon_bg_color')}
              className="w-20 h-10 cursor-pointer"
            />
            <Input
              type="text"
              {...register('icon_bg_color')}
              placeholder="#3B82F6"
              className="flex-1"
            />
          </div>
          {errors.icon_bg_color && (
            <p className="text-sm text-red-500">{errors.icon_bg_color.message}</p>
          )}
        </div>
      </div>
      {errors.icon_url && (
        <p className="text-sm text-red-500">{errors.icon_url.message}</p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">
            Date <span className="text-red-500">*</span>
          </Label>
          <Input
            id="date"
            {...register('date')}
            placeholder="Jan 2020 - Present"
          />
          {errors.date && (
            <p className="text-sm text-red-500">{errors.date.message}</p>
          )}
        </div>

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
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Experience Points</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append('')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Point
          </Button>
        </div>

        {fields.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed rounded-lg">
            <p className="text-gray-500 mb-2">No points added yet</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append('')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add First Point
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <div className="flex-1 space-y-1">
                  <Input
                    {...register(`points.${index}` as const)}
                    placeholder="Describe your achievement or responsibility"
                  />
                  {errors.points?.[index] && (
                    <p className="text-sm text-red-500">
                      {errors.points[index]?.message}
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
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
          ) : experience ? (
            'Update Experience'
          ) : (
            'Add Experience'
          )}
        </Button>
      </div>
    </form>
  );
}
