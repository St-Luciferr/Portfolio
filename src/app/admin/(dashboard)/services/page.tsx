'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ServiceForm } from '@/components/admin/ServiceForm';
import type { DBService } from '@/lib/types';
import Image from 'next/image';

export default function ServicesPage() {
  const [services, setServices] = useState<DBService[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<DBService | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/admin/services');
      const result = await response.json();

      if (result.success) {
        setServices(result.data);
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to fetch services',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Success',
          description: 'Service deleted successfully',
        });
        fetchServices();
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to delete service',
      });
    }
  };

  const handleEdit = (service: DBService) => {
    setEditingService(service);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingService(null);
    setDialogOpen(true);
  };

  const handleFormSuccess = () => {
    setDialogOpen(false);
    setEditingService(null);
    fetchServices();
  };

  // A published service without a slug shows on the homepage but has no
  // /services/[slug] page, so its card can't link anywhere (SITE_REVIEW F2).
  const missingSlug = services.filter((s) => s.is_published && !s.slug);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Loading services...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600 mt-2">
            Manage your service offerings
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {missingSlug.length > 0 && (
        <div
          role="alert"
          className="flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900"
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-none" />
          <div className="text-sm">
            <p className="font-semibold">
              {missingSlug.length === 1 ? '1 published service has' : `${missingSlug.length} published services have`} no slug
            </p>
            <p className="mt-1">
              These have no detail page and are left out of the sitemap:{' '}
              {missingSlug.map((s) => s.title).join(', ')}. Edit each one and set a slug.
            </p>
          </div>
        </div>
      )}

      {services.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <p className="text-gray-500 mb-4">No services yet</p>
          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Add your first service
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Icon</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div className="w-10 h-10 relative">
                      <Image
                        src={service.icon_url}
                        alt={service.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {service.title}
                    <span className="block text-xs font-normal text-gray-500">
                      {service.slug ? `/services/${service.slug}` : 'No slug'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={service.is_published ? 'default' : 'secondary'}
                    >
                      {service.is_published ? 'Published' : 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell>{service.display_order}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(service)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(service.id, service.title)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingService ? 'Edit Service' : 'Add New Service'}
            </DialogTitle>
            <DialogDescription>
              {editingService
                ? 'Update service details'
                : 'Add a new service to your offerings'}
            </DialogDescription>
          </DialogHeader>
          <ServiceForm
            service={editingService}
            onSuccess={handleFormSuccess}
            onCancel={() => setDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
