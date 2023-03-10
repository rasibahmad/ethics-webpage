import { Textarea, Box, Button, Group, SimpleGrid, Table} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import ApplicationTable from '../components/ApplicationTable';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';

export default function Application() {
    const [applicationTitle, setApplicationTitle] = useState('')
    const [applicationError, setApplicationError] = useState(null)
    const user = useUser();

    // create application function
    const createApplication = async (e) => {
        e.preventDefault()

        if (!applicationTitle) {
            setApplicationError('Please Enter Application Title')
            return
        }

        const { data, error } = await supabase
            .from('applications')
            .insert([{ applicationTitle }])
            .select()

        if (error) {
            console.log(error)
            setApplicationError('Please Enter Application Title')
        }

        if (data) {
            setApplicationError(null)
            const { error } = await supabase
            .from('applications')
            .update({user_id: user.id})
            .eq('id', data[0].id)
        }
    }

    const [question, setQuestion] = useState('')
    const [questionError, setQuestionError] = useState(null)

    // create question function
    const createQuestion = async (e) => {
        e.preventDefault()

        if (!question) {
            setQuestionError('Please Enter Question')
            return
        }

        const { data, error } = await supabase
            .from('questions')
            .insert([{ question }])
            .select()

        if (error) {
            console.log(error)
            setQuestionError('Please Enter Question')
        }

        if (data) {
            setQuestionError(null)
            const { error } = await supabase
            .from('questions')
            .update({user_id: user.id})
            .eq('id', data[0].id)
        }
    }

    const [fetchError, setFetchError] = useState(null)
    const [applicationsList, setApplicationsList] = useState([])

    // only fetch applications made by logged in user in the table
    useEffect(() => {
        const fetchApplications = async () => {
            const { data, error } = await supabase
                .from('applications')
                .select()
                .eq('user_id', user.id)

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
        <SimpleGrid cols={2} spacing="xl" verticalSpacing="xl">
            <div className="create application">
                <form onSubmit={createApplication}>
                    <Box sx={{ maxWidth: 300 }} mx="auto" >
                        <h2>Create Ethics Application</h2>
                        <Textarea
                            placeholder="E.g. Knowledge Elicitation"
                            label="Name"
                            description="Enter name of application to create"
                            radius="md"
                            withAsterisk
                            onChange={(e) => setApplicationTitle(e.target.value)}
                        />
                        <Group position="right" mt="md">
                            <Button type="submit">Create</Button>
                        </Group>
                        {applicationError && <p className='error' style={{ color: "red" }}>{applicationError}</p>}
                    </Box>
                </form>
            </div>
            <div className="create question">
                <form onSubmit={createQuestion}>
                    <Box sx={{ maxWidth: 300 }} mx="auto" >
                        <h2>Ask Question</h2>
                        <Textarea
                            placeholder="E.g. Do I need approval for ...?"
                            label="Question"
                            description="Enter the full details of the question"
                            radius="md"
                            withAsterisk
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <Group position="right" mt="md">
                            <Button type="submit">Submit</Button>
                        </Group>
                        {questionError && <p className='error' style={{ color: "red" }}>{questionError}</p>}
                    </Box>
                </form>
            </div>
            <div className="track applications" >
            <h2>Track Applications</h2>
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
                            <ApplicationTable key={application.id} application={application}/>
                        ))
                    )}
                    </tbody>
                </Table>
            </div>
        </SimpleGrid>
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
        return{
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