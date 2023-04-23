// cited and adapted from https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs + https://supabase.com/docs/guides/auth/auth-helpers/auth-ui

import { Auth } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Home from '../index'
import { Grid, Paper } from '@mantine/core';

const Login = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <div>
          <Grid gutter="lg" justify="center">
            <Grid.Col span={6}>
              <Paper shadow="xl" p="xl" withBorder>

                <Auth supabaseClient={supabase} appearance={{
                  style: {
                    button: { background: 'purple', color: 'white' },
                    anchor: { color: 'blue' },
                    label: { color: 'black' },
                    input: {}
                  },
                  theme: ThemeSupa
                }} providers={[]} />
              </Paper>
            </Grid.Col>
          </Grid>
        </div>
      ) : (
        <Home />
      )}
    </div>
  )
}

export default Login
