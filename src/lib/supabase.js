/**
 * Supabase client — single instance shared across the whole app.
 *
 * VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY come from the .env file.
 * Get these values from: Supabase dashboard → Project Settings → API
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    '[WeMood] Missing Supabase credentials.\n' +
    'Create a .env file in the project root with:\n' +
    '  VITE_SUPABASE_URL=https://xxxx.supabase.co\n' +
    '  VITE_SUPABASE_ANON_KEY=your-anon-key\n' +
    'Get these from: Supabase dashboard → Project Settings → API'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    // Supabase stores the session in localStorage automatically
    // so it survives page reloads
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true   // needed for email verification redirect
  }
})