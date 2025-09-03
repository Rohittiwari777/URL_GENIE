import supabase from './supabase';

export interface UrlRow {
  id: string;
  created_at: string;
  original_url: string;
  short_url: string;
}

const TABLE_NAME = 'urls';

export async function fetchRecentUrls(limit: number = 10): Promise<UrlRow[]> {
  const { data, error } = await supabase
    .from<UrlRow>(TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function insertUrl(originalUrl: string, shortUrl: string): Promise<UrlRow> {
  const { data, error } = await supabase
    .from<UrlRow>(TABLE_NAME)
    .insert({ original_url: originalUrl, short_url: shortUrl })
    .select()
    .single();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error('Insert returned no data');
  }

  return data;
}

export async function deleteUrl(id: string): Promise<void> {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}
