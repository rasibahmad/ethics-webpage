import React, { useEffect, useState } from 'react';
import { Paper, Table, Title, Grid, Button, Group } from '@mantine/core';
import { supabase } from '../../client';
import EthicsTeamApplicationTable from '../../components/ethicsTeamApplicationTable';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default function ethicsTeamApplications() {
    const [fetchError, setFetchError] = useState(null)
    const [applicationsList, setApplicationsList] = useState([])
    const [applicationTitleFilter, setApplicationTitleFilter] = useState('')
    const [idFilter, setIdFilter] = useState('')
    const [studentNameFilter, setStudentNameFilter] = useState('')
    const [createdFilter, setCreatedFilter] = useState('')
    const [updatedFilter, setUpdatedFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('')

    // adapted from https://youtu.be/VjohMDwjty4
    // fetch applications for ethics team
    useEffect(() => {
        const fetchApplications = async () => {
            const { data, error } = await supabase
                .from('applications')
                .select()
                .eq('status', 'Submitted')

            if (error) {
                setFetchError('No Applications Found')
                setApplicationsList(null)
                console.log(error)
            }

            if (data) {
                // console.log(data)
                setApplicationsList(data)
                setFetchError(null)
            }
        }
        fetchApplications()
    }, [])

    // convert to csv
    // adapted from https://stackoverflow.com/questions/48760815/export-to-csv-button-in-react-table
    function convertCSV(appList, headers) {
        const headerRow = headers.join(',') + '\n';
        const row = appList.map((item) => headers.map((header) =>
            item[header]).join(',')).join('\n')

        return headerRow + row
    }

    // filter the applications table based on the filter inputs
    const filteredApplications = applicationsList.filter((app) => {
        return app.applicationTitle.includes(applicationTitleFilter) &&
            app.id.toString().includes(idFilter) &&
            app.student_name.toLowerCase().includes(studentNameFilter.toLowerCase()) &&
            app.created_at.toLowerCase().includes(createdFilter.toLowerCase()) &&
            app.updated_at.toLowerCase().includes(updatedFilter.toLowerCase()) &&
            app.status.toLowerCase().includes(statusFilter.toLowerCase())
    })

    // export the table to csv button: takes the filtered values and converts to csv
    // adapted from https://stackoverflow.com/questions/48760815/export-to-csv-button-in-react-table
    const exportCSV = () => {
        const headers = ['id', 'applicationTitle', 'student_name', 'created_at', 'updated_at', 'assigned_to', 'status'];
        const csvData = convertCSV(filteredApplications, headers);
        console.log(csvData)
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'EthicsApplications.csv');
        document.body.appendChild(link);
        link.click()
        document.body.removeChild(link);
    }

    // clear filter button
    const clearFilter = () => {
        setStudentNameFilter('') 
        setApplicationTitleFilter('')
        setIdFilter('') 
        setCreatedFilter('') 
        setUpdatedFilter('') 
        setStatusFilter('')
    }

    return (
        <Grid justify="center">
            <Grid.Col span={8}>
                <Paper shadow="xl" p="xl" withBorder>
                    <Title order={3} align='center'>Ethics Applications</Title>
                    <div>
                        <label>Application Title: </label>
                        <input
                            type='text'
                            id='appT'
                            value={applicationTitleFilter}
                            onChange={(e) => setApplicationTitleFilter(e.target.value)}
                        />
                        <br></br>
                        <label>Student Name: </label>
                        <input
                            type='text'
                            id='studentName'
                            value={studentNameFilter}
                            onChange={(e) => setStudentNameFilter(e.target.value)}
                        />
                        <br></br>
                        <label>ID: </label>
                        <input
                            type='text'
                            id='id'
                            value={idFilter}
                            onChange={(e) => setIdFilter(e.target.value)}
                        />
                        <br></br>
                        <label>Created Date: </label>
                        <input
                            type='text'
                            id='created'
                            value={createdFilter}
                            onChange={(e) => setCreatedFilter(e.target.value)}
                        />
                        <br></br>
                        <label>Last Updated: </label>
                        <input
                            type='text'
                            id='updated'
                            value={updatedFilter}
                            onChange={(e) => setUpdatedFilter(e.target.value)}
                        />
                        <br></br>
                        <label>Status: </label>
                        <input
                            type='text'
                            id='status'
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        />
                        <br></br>
                        <br></br>
                        <Button onClick={clearFilter}>Clear</Button>
                        <Button className='btn2' onClick={exportCSV}>Export</Button>
                    </div>
                    <br></br>
                    <Table highlightOnHover withBorder withColumnBorders>
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Application Title</th>
                                <th>ID</th>
                                <th>Created Date</th>
                                <th>Last Updated</th>
                                <th>Assigned to</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {fetchError && <p className='error' style={{ color: "red" }}>{fetchError}</p>}
                        <tbody>
                            {/* uses filteredApplications list in the table */}
                            {filteredApplications.map(application => (
                                <EthicsTeamApplicationTable key={application.id} application={application} applicationsList={filteredApplications} />
                            ))}
                        </tbody>
                    </Table>
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