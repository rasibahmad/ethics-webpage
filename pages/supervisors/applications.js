import React, { useEffect, useState } from 'react';
import { Textarea, Box, Button, Group, SimpleGrid, Table } from '@mantine/core';
import { supabase } from '../../client';
import SupervisorApplicationTable from '../../components/supervisorApplicationTable';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default function supervisorApplications() {
    const [fetchError, setFetchError] = useState(null)
    const [applicationsList, setApplicationsList] = useState([])

    useEffect(() => {
        const fetchApplications = async () => {
            const { data, error } = await supabase
                .from('applications')
                .select()
                // only fetchs applications with status: Supervisor Review
                .eq('status', 'Supervisor Review') 

            if (error) {
                setFetchError('No Applications Found')
                setApplicationsList(null)
                console.log(error)
            }

            if (data) {
                setApplicationsList(data)
                setFetchError(null)
            }
        }
        fetchApplications()
    }, [])

    return (
        <Table highlightOnHover withBorder withColumnBorders>
            <thead>
                <tr>
                    <th>Application Title</th>
                    <th>ID</th>
                    <th>Created Date</th>
                    <th>Last Updated</th>
                    <th>Status</th>
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