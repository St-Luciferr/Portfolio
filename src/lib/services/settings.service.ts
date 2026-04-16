import { readerClient as supabase } from '@/lib/supabase/reader';
import type { DBSiteSettings } from '@/lib/types';
import type { SiteSettings, SelectedResultsSettings } from '@/types/frontend';
import { mapSiteSettings } from '@/mappers';

export async function getSiteSetting(key: string): Promise<DBSiteSettings | null> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('key', key)
    .single();

  if (error) {
    console.error(`Error fetching setting ${key}:`, error);
    return null;
  }

  return data;
}

export async function getSiteSettings(keys: string[]): Promise<Record<string, any>> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .in('key', keys);

  if (error) {
    console.error('Error fetching settings:', error);
    return {};
  }

  return (data || []).reduce(
    (acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    },
    {} as Record<string, any>
  );
}

export async function getAllSiteSettings(): Promise<SiteSettings> {
  const { data, error } = await supabase.from('site_settings').select('*');

  if (error) {
    console.error('Error fetching all settings:', error);
    return mapSiteSettings({});
  }

  const settingsMap = (data || []).reduce(
    (acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    },
    {} as Record<string, any>
  );

  return mapSiteSettings(settingsMap);
}

export async function getSelectedResultsSettings(): Promise<SelectedResultsSettings | null> {
  const settings = await getSiteSettings(['selected_results']);
  const raw = settings['selected_results'];
  if (!raw) return null;

  return {
    isEnabled: raw.is_enabled ?? true,
    heading: raw.heading || 'Selected Results',
    subheading: raw.subheading || '',
    metrics: (raw.metrics || []).map((m: { label?: string; value?: string; context?: string }) => ({
      label: m.label || '',
      value: m.value || '',
      context: m.context || '',
    })),
  };
}
