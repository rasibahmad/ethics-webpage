import { Textarea, Group, Button, TextInput, Text, Checkbox, FileInput, Title, Paper, Grid } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../client'

const viewApp = () => {
    const router = useRouter()
    const { id } = router.query
    const [applicationTitle, setApplicationTitle] = useState('')
    const [applicationError, setApplicationError] = useState(null)
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
    const [supervisor_name, setSupervisorName] = useState('')
    const [supervisor_email, setSupervisorEmail] = useState('')
    const [checked, setChecked] = useState(false)
    const [human_participants, setHumanParticipants] = useState(false)
    const [isHumanParticipantsChecked, setIsHumanParticipantsChecked] = useState(false)
    const [testing_apparatus, setTestingApparatus] = useState(false)
    const [isTestingApparatusChecked, setIsTestingApparatusChecked] = useState(false)
    const [lone_working, setLoneWorking] = useState(false)
    const [isLoneWorkingChecked, setIsLoneWorkingChecked] = useState(false)
    const [travel_risk, setTravelRisk] = useState(false)
    const [isTravelRiskChecked, setIsTravelRiskChecked] = useState(false)
    const [emotional_risk, setEmotionalRisk] = useState(false)
    const [isEmotionalRiskChecked, setIsEmotionalRiskChecked] = useState(false)
    const [other_risk, setOtherRisk] = useState('')
    const [environment_risk, setEnvironmentRisk] = useState(false)
    const [isEnvironmentRiskChecked, setIsEnvironmentRiskChecked] = useState(false)
    const [conflict_interest, setConflictInterest] = useState(false)
    const [isConflictInterestChecked, setIsConflictInterestChecked] = useState(false)
    const [controversial_work, setControverisalWork] = useState(false)
    const [isControversialChecked, setIsControversialChecked] = useState(false)
    const [data_risk, setDataRisk] = useState(false)
    const [isDataRiskChecked, setIsDataRiskChecked] = useState(false)
    const [student_signature, setStudentSignature] = useState('')
    const [supervisor_signature, setSupervisorSignature] = useState('')
    const [documents, setDocuments] = useState([])
    const CDNURL = "https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/documents/";

    // submitting form
    const applicationForm = async (e) => {
        e.preventDefault()

        if (!student_email || !student_name || !student_number || !supervisor_name || !supervisor_email || !project_objectives || !study_objectives || !data_collection_method || !data_collected || !participant_recruitment || !data_storage || !data_evidence || !risk || !student_signature || !supervisor_signature) {
            setApplicationError('Please complete the application form')
            return
        }

        const { data, error } = await supabase
            .from('applications')
            .update({ student_email, student_number, student_name, supervisor_name, supervisor_email, other_risk, project_objectives, study_objectives, data_collection_method, data_collected, participant_recruitment, data_storage, data_evidence, risk, comments, status: "Supervisor Approved", student_signature, supervisor_signature })
            .eq('id', id)
            .select()

        if (error) {
            setApplicationError('Please complete the application form')
        }

        if (data) {
            setApplicationError(null)
            router.push('/supervisors/applications')
        }
    }

    // uploading files function
    async function uploadFile(files) {
        const [file] = files

        const { data, error } = await supabase
            .storage
            .from('documents')
            .upload(id + "/" + file?.name, file);

        if (error) {
            console.log(error)
        }

        if (data) {
            console.log(data)
        }
    }

    // fetching application data
    useEffect(() => {
        const fetchApplication = async () => {
            const { data, error } = await supabase
                .from('applications')
                .select()
                .eq('id', id)
                .single()

            if (error) {
                // router.push('/supervisors/applications')
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
                setSupervisorName(data.supervisor_name)
                setSupervisorEmail(data.supervisor_email)
                setHumanParticipants(data.human_participants)
                setTestingApparatus(data.testing_apparatus)
                setLoneWorking(data.lone_working)
                setTravelRisk(data.travel_risk)
                setEmotionalRisk(data.emotional_risk)
                setOtherRisk(data.other_risk)
                setEnvironmentRisk(data.environment_risk)
                setConflictInterest(data.conflict_interest)
                setControverisalWork(data.controversial_work)
                setDataRisk(data.data_risk)
                setStudentSignature(data.student_signature)
            }
        }
        fetchApplication()
    }, [id])

    // fetching application files
    useEffect(() => {
        const retrieveFile = async () => {
            const { data, error } = await supabase
                .storage
                .from('documents')
                .list(id)

            if (error) {
                console.log(error.message)
            }
            if (data) {
                // console.log(data)
                setDocuments(data)
            }
        }
        retrieveFile()
    }, [id])

    {/* async function deleteFile(files) {
        const [file] = files
        console.log(file)
        console.log(files)

        const { data, error } = await supabase
            .storage
            .from('documents')
            .remove([id + '/' + file?.name])
    } */}

    return (
        <div className="application">
            <Grid gutter="lg" justify="center">
                <Grid.Col span={8}>
                    <Paper shadow="xl" p="xl" withBorder>
                        <Title order={3} align="center">Application Title: {applicationTitle}</Title>
                        <Title order={4} align="center">Application ID: {id}</Title>
                        <form onSubmit={applicationForm}>
                            <Text>Attachments</Text>
                            <Text>{documents.map((document) => {
                                return (
                                    <div>
                                        <Link href={CDNURL + id + "/" + document.name} download> {document?.name} <br></br> </Link>
                                        {/* <Button color="red" onClick={deleteFile(document)}>Delete {document?.name}</Button> */}
                                    </div>
                                )
                            })}</Text>
                            <br></br>
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
                            <TextInput
                                label="Supervisor Full Name"
                                radius="md"
                                withAsterisk
                                value={supervisor_name}
                                onChange={(e) => setSupervisorName(e.target.value)}
                            />
                            <TextInput
                                label="Supervisor Email"
                                radius="md"
                                withAsterisk
                                value={supervisor_email}
                                onChange={(e) => setSupervisorEmail(e.target.value)}
                            />
                            <br></br>
                            <br></br>
                            <Title order={3}>Section 0: Ethics Declaration Questions</Title>
                            <Title order={4}>Please tick the following boxes if your project will involve any of the following:</Title>
                            <br></br>
                            <Checkbox label="Human Participants" checked={human_participants} description="(including all types of interviews, questionnaires, focus groups, records relating to humans, use of online datasets or other secondary data, observations, usability testing, etc.)" onChange={(e) => setIsHumanParticipantsChecked(e.currentTarget.checked)} />
                            <Checkbox label="Testing Apparatus" checked={testing_apparatus} description="(including where you have developed new apparatus and are testing it for accuracy, including on yourself)" onChange={(e) => setIsTestingApparatusChecked(e.currentTarget.checked)} />
                            <br></br>
                            <Title order={4}>Risk to you, including:</Title>
                            <br></br>
                            <Checkbox label="Lone working during data collection" checked={lone_working} onChange={(e) => setIsLoneWorkingChecked(e.currentTarget.checked)} />
                            <Checkbox label="Travel to areas where you may be at risk" checked={travel_risk} onChange={(e) => setIsTravelRiskChecked(e.currentTarget.checked)} />
                            <Checkbox label="Risk of emotional distress" checked={emotional_risk} onChange={(e) => setIsEmotionalRiskChecked(e.currentTarget.checked)} />
                            <Checkbox label="Any risk to the environment" checked={environment_risk} onChange={(e) => setIsEnvironmentRiskChecked(e.currentTarget.checked)} />
                            <Checkbox label="Any conflict of interest" checked={conflict_interest} onChange={(e) => setIsConflictInterestChecked(e.currentTarget.checked)} />
                            <Checkbox label="Work/research that could be considered controversial or be of reputational risk to Aston University" checked={controversial_work} onChange={(e) => setIsControversialChecked(e.currentTarget.checked)} />
                            <Checkbox label="Social media data and/or data from internet sources that could be regarded as private" checked={data_risk} onChange={(e) => setIsDataRiskChecked(e.currentTarget.checked)} />
                            <Textarea label="Other: Please outline" radius="md" autosize minRows={2} value={other_risk} onChange={(e) => setOtherRisk(e.target.value)} />
                            <br></br>
                            <br></br>
                            <Title order={3}>Section 1: Study Details</Title>
                            <Title order={4}>Please provide the following information about your study. Be as detailed as possible. Where a question is not relevant, please indicate ‘Not Applicable’ but also explain why you believe that to be so.</Title>
                            <br></br>
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
                            <FileInput
                                placeholder="Select File"
                                label="Attachments"
                                description="Upload all documents for intended study (.docx)"
                                radius="md"
                                multiple
                                accept='.docx'
                                onChange={(e) => uploadFile(e)}
                            />
                            <FileInput
                                placeholder="Select File"
                                radius="md"
                                multiple
                                accept='.docx'
                                onChange={(e) => uploadFile(e)}
                            />
                            <FileInput
                                placeholder="Select File"
                                radius="md"
                                multiple
                                accept='.docx'
                                onChange={(e) => uploadFile(e)}
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
                            <br></br>
                            <br></br>
                            <Title order={3}>Declaration</Title>
                            <TextInput label="Student Signature" placeholder="Print Name" withAsterisk radius="md" value={student_signature} onChange={(e) => setStudentSignature(e.target.value)} />
                            <p>Supervisor:</p>
                            <p>I confirm the following:</p>
                            <p>• That I have reviewed the content of this form and all associated paperwork and am happy with its standard and accuracy;</p>
                            <p>• That I shall monitor the student’s conduct of the study in accordance with the ethical approval granted (where applicable); and</p>
                            <p>• That I shall report to the person(s) granting ethical approval any breaches of approval and ensure that no data is included in the student’s work that has been collected in breach of approval.</p>
                            <TextInput label="Supervisor Signature" placeholder="Print Name" withAsterisk radius="md" value={supervisor_signature} onChange={(e) => setSupervisorSignature(e.target.value)} />
                            <Group position="right" mt="md">
                                <Button type="submit">Submit</Button>
                            </Group>
                            {applicationError && <p className='error' style={{ color: "red" }}>{applicationError}</p>}
                        </form>
                    </Paper>
                </Grid.Col>
            </Grid>
        </div>
    )
}

export default viewApp