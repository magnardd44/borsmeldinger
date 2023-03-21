import 'react-native-url-polyfill/auto'


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qqoqrvcjyoivkpycnnjv.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxb3FydmNqeW9pdmtweWNubmp2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3OTQxNDYyNywiZXhwIjoxOTk0OTkwNjI3fQ.ea1SEfFgM_H0Aep4wOo46LWt2coX3NJklKBx2wU-eCg"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;