'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, Upload, X, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface ImageUploadProps {
  bucket?: string;
  currentImage?: string;
  onUpload: (url: string) => void;
  label?: string;
  acceptPdf?: boolean; // Allow PDF files
}

export function ImageUpload({
  bucket = 'projects',
  currentImage,
  onUpload,
  label = 'Upload Image',
  acceptPdf = false,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const { toast } = useToast();

  // Check if current file is a PDF
  const isPdf = preview?.toLowerCase().endsWith('.pdf');
  const allowedTypes = acceptPdf
    ? ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml', 'application/pdf']
    : ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];

  useEffect(() => {
    setPreview(currentImage || null);
  }, [currentImage]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      toast({
        variant: 'destructive',
        title: 'Invalid file type',
        description: acceptPdf
          ? 'Please upload a valid image or PDF file'
          : 'Please upload a valid image file (JPEG, PNG, WebP, or SVG)',
      });
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: 'destructive',
        title: 'File too large',
        description: 'Please upload an image smaller than 5MB',
      });
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('bucket', bucket);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Upload failed');
      }

      setPreview(result.data.url);
      onUpload(result.data.url);

      toast({
        title: 'Success',
        description: acceptPdf ? 'File uploaded successfully' : 'Image uploaded successfully',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Upload failed',
        description: error.message || 'Failed to upload image',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onUpload('');
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {preview ? (
        <div
          className={
            isPdf
              ? 'relative w-full rounded-lg bg-gray-100 p-4'
              : 'relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden'
          }
        >
          {isPdf ? (
            <div className="flex items-center gap-3 pr-12">
              <FileText className="h-8 w-8 shrink-0 text-gray-500" />
              <a
                href={preview}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 truncate text-sm font-medium text-blue-600 hover:text-blue-700"
                title={preview}
              >
                View uploaded PDF
              </a>
            </div>
          ) : (
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />
          )}
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <Label
            htmlFor="image-upload"
            className="cursor-pointer text-blue-600 hover:text-blue-700"
          >
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </span>
            ) : (
              'Click to upload'
            )}
          </Label>
          <Input
            id="image-upload"
            type="file"
            accept={acceptPdf ? 'image/*,application/pdf' : 'image/*'}
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
          <p className="text-sm text-gray-500 mt-2">
            {acceptPdf
              ? 'PNG, JPG, WebP, SVG or PDF (max 5MB)'
              : 'PNG, JPG, WebP or SVG (max 5MB)'}
          </p>
        </div>
      )}
    </div>
  );
}
