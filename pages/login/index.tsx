// cited and adapted from https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs

import { Auth } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Home from '../index'

const Login = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth supabaseClient={supabase}  appearance={{ theme: ThemeSupa }} providers={[]}/>
      ) : (
        <Home />
      )}
    </div>
  )
}

export default Login
