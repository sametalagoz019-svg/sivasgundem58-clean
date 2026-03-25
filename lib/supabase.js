import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "BURAYA_URL"
const supabaseKey = "BURAYA_KEY"

export const supabase = createClient(supabaseUrl, supabaseKey)
