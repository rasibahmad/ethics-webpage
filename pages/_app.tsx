import { MantineProvider, Box } from '@mantine/core'
import { Notifications } from '@mantine/notifications';
import { NextUIProvider, useSSR } from '@nextui-org/react'
import { SSRProvider } from '@react-aria/ssr'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session, useSession } from '@supabase/auth-helpers-react'
import { AppProps } from 'next/app'
import { useState } from 'react'
import Navbar from '../components/NavbarComponent'
import NavbarComponentv2 from '@/components/NavbarComponentv2'
import '../styles/form.css'

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {

  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  const { isBrowser } = useSSR()

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
        <MantineProvider>
        <Navbar />
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,

            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
            },
          })}
        >
          {/* Notifications: position='top-center' */}
          <Notifications />
          <Component {...pageProps} />
        </Box>
      </MantineProvider>
    </SessionContextProvider>
  )
}
