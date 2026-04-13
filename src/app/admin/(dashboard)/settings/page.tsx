'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HeroSettings } from '@/components/admin/settings/HeroSettings';
import { BioSettings } from '@/components/admin/settings/BioSettings';
import { SEOSettings } from '@/components/admin/settings/SEOSettings';
import { ContactSettings } from '@/components/admin/settings/ContactSettings';
import { SocialSettings } from '@/components/admin/settings/SocialSettings';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your portfolio content and configuration
        </p>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="bio">Bio</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <HeroSettings />
        </TabsContent>

        <TabsContent value="bio">
          <BioSettings />
        </TabsContent>

        <TabsContent value="seo">
          <SEOSettings />
        </TabsContent>

        <TabsContent value="contact">
          <ContactSettings />
        </TabsContent>

        <TabsContent value="social">
          <SocialSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
