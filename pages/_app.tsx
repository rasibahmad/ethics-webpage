// adapted from https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs

import { MantineProvider, Box } from '@mantine/core'
import { RouterTransition } from '../components/RouterTransition';
import { Notifications } from '@mantine/notifications';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session, useSession } from '@supabase/auth-helpers-react'
import { AppProps } from 'next/app'
import { useState } from 'react'
import Navbar from '@/components/NavbarComponent'
import '../styles/form.css'

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {

  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
        <MantineProvider>
        <Navbar />
        {/* adapted from https://mantine.dev/core/box/ */}
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            padding: theme.spacing.md,
            borderRadius: theme.radius.sm,

            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[1],
            },
          })}
        >
          {/* taken from https://mantine.dev/others/nprogress/#setup-navigationprogress */}
          <RouterTransition />
          {/* adapted from https://mantine.dev/others/notifications/ */}
          <Notifications position='top-center'/>
          <Component {...pageProps} />
        </Box>
      </MantineProvider>
    </SessionContextProvider>
  )
}
