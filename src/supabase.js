import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://grrjmhlhjstrkpsgdjhg.supabase.co"
const supabaseKey = "sb_publishable_FEEiQ04t8-OWe4lV8CsJQw_96MxP4Oe"

export const supabase = createClient(supabaseUrl, supabaseKey)
