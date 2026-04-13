'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { heroSettingsSchema } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { ImageUpload } from '@/components/admin/ImageUpload';

export function HeroSettings() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(heroSettingsSchema),
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings/hero');
      const result = await response.json();

      if (result.success) {
        reset(result.data);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load hero settings',
      });
    } finally {
      setFetching(false);
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      const response = await fetch('/api/admin/settings/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Success',
          description: 'Hero settings updated successfully',
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update hero settings',
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section</CardTitle>
        <CardDescription>
          Update the main heading and introduction on your homepage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="heading">
              Heading <span className="text-red-500">*</span>
            </Label>
            <Input
              id="heading"
              {...register('heading')}
              placeholder="Hi, I'm"
            />
            {errors.heading && (
              <p className="text-sm text-red-500">{errors.heading.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Santosh"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">
              Subtitle <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="subtitle"
              {...register('subtitle')}
              rows={4}
              placeholder="a machine learning engineer passionate about..."
            />
            {errors.subtitle && (
              <p className="text-sm text-red-500">{errors.subtitle.message}</p>
            )}
          </div>

          <ImageUpload
            bucket="meta"
            currentImage={watch('background_image_url')}
            onUpload={(url) => setValue('background_image_url', url)}
            label="Hero Background Image"
            previewLoading="eager"
          />
          {errors.background_image_url && (
            <p className="text-sm text-red-500">
              {errors.background_image_url.message}
            </p>
          )}

          <ImageUpload
            bucket="resume"
            currentImage={watch('resume_url')}
            onUpload={(url) => setValue('resume_url', url)}
            label="Resume/CV (PDF or Image)"
            acceptPdf
          />
          {errors.resume_url && (
            <p className="text-sm text-red-500">{errors.resume_url.message}</p>
          )}

          <div className="flex justify-end pt-4 border-t">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
