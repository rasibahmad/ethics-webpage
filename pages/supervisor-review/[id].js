import { Textarea, Group, Button, TextInput, Checkbox, FileInput } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../client'

const viewApp = () => {
    const router = useRouter()
    const { id } = router.query
    const [applicationTitle, setApplicationTitle] = useState('')
    const [student_name, setStudentName] = useState('')
    const [student_number, setStudentNumber] = useState('')
    const [student_email, setStudentEmail] = useState('')
    const [project_objectives, setProjectObjectives] = useState('')
    const [study_objectives, setStudyObjectives] = useState('')
    const [data_collection_method, setDataCollectionMethod] = useState('')
    const [data_collected, setDataCollected] = useState('')
    const [participant_recruitment, setParticipantRecruitment] = useState('')
    const [data_storage, setDataStorage] = useState('')
    const [data_evidence, setDataEvidence] = useState('')
    const [risk, setRisk] = useState('')
    const [comments, setComments] = useState('')

    useEffect(() => {
        const fetchApplication = async () => {
            const { data, error } = await supabase
                .from('applications')
                .select()
                .eq('id', id)
                .single()

            if (error) {
                router.push('/supervisors/applications')
            }

            if (data) {
                setApplicationTitle(data.applicationTitle)
                setStudentName(data.student_name)
                setStudentNumber(data.student_number)
                setStudentEmail(data.student_email)
                setProjectObjectives(data.project_objectives)
                setStudyObjectives(data.study_objectives)
                setDataCollectionMethod(data.data_collection_method)
                setDataCollected(data.data_collected)
                setParticipantRecruitment(data.participant_recruitment)
                setDataStorage(data.data_storage)
                setDataEvidence(data.data_evidence)
                setRisk(data.risk)
                setComments(data.comments)
            }
        }
        fetchApplication()
    }, [id])

    return (
        <div className="application">
            <h2>Application Title: {applicationTitle}</h2>
            <h4>Application ID: {id}</h4>
            <form>
                <TextInput
                    label="Student Name"
                    radius="md"
                    withAsterisk
                    value={student_name}
                    onChange={(e) => setStudentName(e.target.value)}
                />
                <TextInput
                    label="Student Email"
                    radius="md"
                    withAsterisk
                    value={student_email}
                    onChange={(e) => setStudentEmail(e.target.value)}
                />
                <TextInput
                    label="Student Number"
                    description="Enter 9-digit Student number"
                    radius="md"
                    withAsterisk
                    value={student_number}
                    onChange={(e) => setStudentNumber(e.target.value)}
                />
                <h2>Section 1: Study Details</h2>
                <h3>Please provide the following information about your study. Be as detailed as possible. Where a question is not relevant, please indicate ‘Not Applicable’ but also explain why you believe that to be so.</h3>
                <Textarea
                    placeholder=""
                    label="Project Objectives"
                    description="Please provide a brief outline of your overall project objectives"
                    radius="md"
                    value={project_objectives}
                    withAsterisk
                    autosize
                    minRows={2}
                    onChange={(e) => setProjectObjectives(e.target.value)}
                />
                <Textarea
                    label="Study Objectives"
                    description="Please explain how the study you are seeking ethical approval to conduct contributes to your overall project objectives"
                    radius="md"
                    value={study_objectives}
                    withAsterisk
                    autosize
                    minRows={2}
                    onChange={(e) => setStudyObjectives(e.target.value)}
                />
                <Textarea
                    label="Data Collection Method(s) to be Used"
                    description="Please outline your proposed data collection methods – e.g., questionnaire/survey, interview, observational study, etc. Justify their use and explain how you will conduct the data collection in practice, including timeframe"
                    radius="md"
                    value={data_collection_method}
                    withAsterisk
                    autosize
                    minRows={2}
                    onChange={(e) => setDataCollectionMethod(e.target.value)}
                />
                <Textarea
                    label="Data to be Collected"
                    description="Please briefly outline the type of data to be collected"
                    radius="md"
                    value={data_collected}
                    withAsterisk
                    autosize
                    minRows={2}
                    onChange={(e) => setDataCollected(e.target.value)}
                />
                <Textarea
                    label="Participant Recruitment"
                    description="Please outline how you will recruit participants to your study"
                    radius="md"
                    value={participant_recruitment}
                    withAsterisk
                    autosize
                    minRows={2}
                    onChange={(e) => setParticipantRecruitment(e.target.value)}
                />
                <Textarea
                    label="Data Storage"
                    description="Please outline where you will store your data (ideally, on an encrypted server; USB drives are not permissible)"
                    radius="md"
                    value={data_storage}
                    withAsterisk
                    autosize
                    minRows={2}
                    onChange={(e) => setDataStorage(e.target.value)}
                />
                <Textarea
                    label="For Secondary Data/Dataset Use Only: Compliance with Terms & Conditions of Use"
                    description="If you will be in receipt of secondary data OR will be using an online, publicly available dataset, please provide evidence that you are observing any terms and conditions associated with its use and have permission to use it. Be mindful that just because data is available online does not mean that you are ethically entitled to use it for your study; this needs proven. If you are being given data by, for example, a third party, you need to be sure that the individual has permission to share the data with you."
                    radius="md"
                    value={data_evidence}
                    withAsterisk
                    autosize
                    minRows={2}
                    onChange={(e) => setDataEvidence(e.target.value)}
                />
                <Textarea
                    label="Risk"
                    description="Please outline any risks to either the participants in your study and/or yourself in the conduct of the study and what you have done to mitigate that risk"
                    radius="md"
                    value={risk}
                    withAsterisk
                    autosize
                    minRows={2}
                    onChange={(e) => setRisk(e.target.value)}
                />
                <Textarea
                    placeholder="E.g. Questionnaire link"
                    label="Additional Comments"
                    radius="md"
                    value={comments}
                    autosize
                    minRows={2}
                    onChange={(e) => setComments(e.target.value)}
                />
            </form>
        </div>
    )

}

export default viewApp