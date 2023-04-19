import { Textarea, Box, Button, Group, Paper, Table, Grid, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import ApplicationTable from '../components/ApplicationTable';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';

export default function Application() {
    const [applicationTitle, setApplicationTitle] = useState('')
    const [applicationError, setApplicationError] = useState(null)
    const user = useUser();

    // adapted from https://youtu.be/dRVOhY-3iXY
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
                .update({ user_id: user.id })
                .eq('id', data[0].id)

            // adds new application record/updates my applications table
            const fetchApplications = async () => {
                const { data } = await supabase
                    .from('applications')
                    .select()
                    .eq('user_id', user.id)

                if (data) {
                    setApplicationsList(data)
                }
            }
            fetchApplications()
        }
    }
    // disable create button until value entered
    const disableCreateApp = !applicationTitle

    // adapted from https://youtu.be/VjohMDwjty4
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
                .update({ user_id: user.id })
                .eq('id', data[0].id)
        }
    }
    // disable submit button until value entered
    const disableQuestion = !question

    // adapted from https://youtu.be/VjohMDwjty4
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

    // refreshs application table when button pressed in table
    const refreshApplications = async () => {
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

    return (
        <Grid gutter="lg" justify="center">
            <Grid.Col span={4}>
                <Paper shadow="xl" p="xl" withBorder>
                    <div className="create application">
                        <form onSubmit={createApplication}>
                            <Box sx={{ maxWidth: 300 }} mx="auto" >
                                <Title order={3} align='center'>Create Ethics Application</Title>
                                <br></br>
                                <Textarea
                                    placeholder="E.g. Knowledge Elicitation"
                                    label="Name"
                                    description="Enter name of application to create"
                                    radius="md"
                                    onChange={(e) => setApplicationTitle(e.target.value)}
                                />
                                <Group position="right" mt="md">
                                    <Button
                                        disabled={disableCreateApp}
                                        type="submit"
                                        onClick={() =>
                                            notifications.show({
                                                title: 'Success Application Created!',
                                                message: 'Application can be viewed in My Applications table',
                                                autoClose: 10000,
                                                icon: <IconCheck />,
                                                color: 'teal',
                                            })
                                        }>
                                        Create
                                    </Button>
                                </Group>
                                {applicationError && <p className='error' style={{ color: "red" }}>{applicationError}</p>}
                            </Box>
                        </form>
                    </div>
                </Paper>
            </Grid.Col>
            {/* Commented out 'Ask Question Box' as will be moved to a separate 'Questions' page instead of being on the applications page */}
            {/* <Grid.Col span={4}>
                <Paper shadow="xl" p="xl" withBorder>
                    <div className="create question">
                        <form onSubmit={createQuestion}>
                            <Box sx={{ maxWidth: 300 }} mx="auto" >
                                <Title order={3} align='center'>Ask Question</Title>
                                <br></br>
                                <Textarea
                                    placeholder="E.g. Do I need approval for ...?"
                                    label="Question"
                                    description="Enter the full details of the question"
                                    radius="md"
                                    onChange={(e) => setQuestion(e.target.value)}
                                />
                                <Group position="right" mt="md">
                                    <Button disabled={disableQuestion} type="submit">Submit</Button>
                                </Group>
                                {questionError && <p className='error' style={{ color: "red" }}>{questionError}</p>}
                            </Box>
                        </form>
                    </div>
                </Paper>
            </Grid.Col> */}
            <Grid.Col span={8}>
                <Paper shadow="xl" p="xl" withBorder>
                    <div className="track applications" >
                        <Title order={3} align='center'>My Applications</Title>
                        <br></br>
                        <Table highlightOnHover withBorder withColumnBorders>
                            <thead>
                                <tr>
                                    <th>Application Title</th>
                                    <th>Application ID</th>
                                    <th>Created Date</th>
                                    <th>Last Updated</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {fetchError && <p className='error' style={{ color: "red" }}>{fetchError}</p>}
                            <tbody>
                                {/* adapted from https://youtu.be/VjohMDwjty4 */}
                                {applicationsList && (
                                    applicationsList.map(application => (
                                        <ApplicationTable key={application.id} application={application} refreshApplications={refreshApplications} />
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Paper>
            </Grid.Col>
        </Grid>
    )

}

// taken from https://supabase.com/docs/guides/auth/auth-helpers/nextjs#server-side-rendering-ssr
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