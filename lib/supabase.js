import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://twfqejewovajygbbdqfk.supabase.co"
const supabaseKey = "sb_publishable_5D0pZDQ2pkcBhr1hzUrJZw_ufQgu50v"

export const supabase = createClient(supabaseUrl, supabaseKey)
