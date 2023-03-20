import { Text, Paper, Grid, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default function faq() {
    return (
        <Grid gutter="lg" justify="center">
            <Grid.Col span={8}>
                <Paper shadow="xl" p="xl" withBorder>
                    <Title order={3} align="center">Frequently Asked Questions</Title>
                    <br></br>
                    <Text fw={700}>How long does an application take to be reviewed?</Text>
                    <Text fz="sm">Answer: Typically within 2 weeks however in some cases this is not possible.</Text>
                    <br></br>
                    <Text fw={700}>Do I need ethical approval when using data from other sources?</Text>
                    <Text fz="sm">Answer: Yes, any data/dataset used in your project must be approved by ethics team.</Text>
                    <br></br>
                    <Text fw={700}>What should I do if my supervisor is unable to sign my application due to leave or unexpected circumstances?</Text>
                    <Text fz="sm">Answer: Please contact the module leader. Another supervisor may be assigned to review your application.</Text>
                </Paper>
            </Grid.Col>
        </Grid>
    )
}

// Protected page - checks the session on the server
export const getServerSideProps = async (ctx) => {
    // create authenticated supabase client
    const supabase = createServerSupabaseClient(ctx)
    // checks if there is a session
    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session)
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }

    return {
        props: {
            initialSession: session,
            user: session.user,
        },
    }
}