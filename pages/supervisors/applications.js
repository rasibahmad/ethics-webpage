import React, { useEffect, useState } from 'react';
import { Paper, Table, Title, Grid } from '@mantine/core';
import { supabase } from '../../client';
import SupervisorApplicationTable from '../../components/supervisorApplicationTable';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';

export default function supervisorApplications() {
    const [fetchError, setFetchError] = useState(null)
    const [applicationsList, setApplicationsList] = useState([])
    const user = useUser();

    useEffect(() => {
        const fetchApplications = async () => {
            const { data, error } = await supabase
                .from('applications')
                .select()
                // only shows applications assigned to supervisor with Status: 'Submitted', 'Supervisor Approved', 'Supervisor Review', 'Approved, 'On Hold', 'Rejected'
                .eq('supervisor_email', user.email)
                .or('status.eq.Supervisor Approved,status.eq.Submitted,status.eq.Supervisor Review,status.eq.Approved,status.eq.On Hold,status.eq.Rejected')

            if (error) {
                setFetchError('No Applications Found')
                setApplicationsList(null)
                console.log(error)
            }

            if (data) {
                console.log(data)
                setApplicationsList(data)
                setFetchError(null)
            }
        }
        fetchApplications()
    }, [])

    return (
        <Grid justify="center">
            <Grid.Col span={8}>
                <Paper shadow="xl" p="xl" withBorder>
                    <Title order={3} align='center'>Student Applications</Title>
                    <br></br>
                    <Table highlightOnHover withBorder withColumnBorders>
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Application Title</th>
                                <th>ID</th>
                                <th>Created Date</th>
                                <th>Last Updated</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {fetchError && <p className='error' style={{ color: "red" }}>{fetchError}</p>}
                        <tbody>
                            {applicationsList && (
                                applicationsList.map(application => (
                                    <SupervisorApplicationTable key={application.id} application={application} />
                                ))
                            )}
                        </tbody>
                    </Table>
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