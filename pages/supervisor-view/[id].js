import { Textarea, TextInput, Text, Checkbox, Title, Paper, Grid } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../client'

const supervisorView = () => {
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
    const [supervisor_name, setSupervisorName] = useState('')
    const [supervisor_email, setSupervisorEmail] = useState('')
    const [human_participants, setHumanParticipants] = useState(false)
    const [testing_apparatus, setTestingApparatus] = useState(false)
    const [lone_working, setLoneWorking] = useState(false)
    const [travel_risk, setTravelRisk] = useState(false)
    const [emotional_risk, setEmotionalRisk] = useState(false)
    const [other_risk, setOtherRisk] = useState('')
    const [other_personal_risk, setOtherPersonalRisk] = useState('')
    const [environment_risk, setEnvironmentRisk] = useState(false)
    const [conflict_interest, setConflictInterest] = useState(false)
    const [controversial_work, setControverisalWork] = useState(false)
    const [data_risk, setDataRisk] = useState(false)
    const [student_signature, setStudentSignature] = useState('')
    const [supervisor_signature, setSupervisorSignature] = useState('')
    const [documents, setDocuments] = useState([])
    const CDNURL = "https://zanqrgclfkvzbsbmkpdt.supabase.co/storage/v1/object/public/documents/";

    // fetching application data
    useEffect(() => {
        const fetchApplication = async () => {
            const { data, error } = await supabase
                .from('applications')
                .select()
                .eq('id', id)
                .single()

            if (error) {
                // router.push('/applications')
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
                setOtherPersonalRisk(data.other_personal_risk)
                setEnvironmentRisk(data.environment_risk)
                setConflictInterest(data.conflict_interest)
                setControverisalWork(data.controversial_work)
                setDataRisk(data.data_risk)
                setStudentSignature(data.student_signature)
                setSupervisorSignature(data.supervisor_signature)
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

    return (
        <div className="application">
            <Grid gutter="lg" justify="center">
                <Grid.Col span={8}>
                    <Paper shadow="xl" p="xl" withBorder>
                        <Title order={3} align="center">Application Title: {applicationTitle}</Title>
                        <Title order={4} align="center">Application ID: {id}</Title>
                        <Text>Attachments</Text>
                        <Text>{documents.map((document) => {
                            return (
                                <div className='attachment'>
                                    <Link href={CDNURL + id + "/" + document.name} download> {document?.name} <br></br> </Link>
                                </div>
                            )
                        })}</Text>
                        <br></br>
                        <TextInput
                            label="Student Name"
                            radius="md"
                            withAsterisk
                            value={student_name}
                        />
                        <TextInput
                            label="Student Email"
                            radius="md"
                            withAsterisk
                            value={student_email}
                        />
                        <TextInput
                            label="Student Number"
                            description="Enter 9-digit Student number"
                            radius="md"
                            withAsterisk
                            value={student_number}
                        />
                        <TextInput
                            label="Supervisor Full Name"
                            radius="md"
                            withAsterisk
                            value={supervisor_name}
                        />
                        <TextInput
                            label="Supervisor Email"
                            radius="md"
                            withAsterisk
                            value={supervisor_email}
                        />
                        <br></br>
                        <br></br>
                        <Title order={3}>Section 0: Ethics Declaration Questions</Title>
                        <br></br>
                        <Text fw="700">The following are Not Permitted:</Text>
                        <Text fz="sm">
                            • The NHS – either patients selected via the NHS or clinical staff working for the NHS
                        </Text>
                        <Text fz="sm">
                            • Participants under the age of 18
                        </Text>
                        <Text fz="sm">
                            • Vulnerable groups – individuals with physical disabilities, mental health disabilities/ill health, individuals with learning difficulties, prisoners/detained persons, people over 65 years of age, and/or pregnant women
                        </Text>
                        <Text fz="sm">
                            • Any of the following: i) clinical procedures or ii) physical intervention or iii) penetration of the participant's body or iv) prescription of compounds additional to normal diet or other dietary manipulation/supplementation or v) collection of bodily secretions or vi) involve human tissue which comes within the Human Tissue Act (e.g., surgical operations; taking body samples including blood and DNA; exposure to ionizing or other radiation; exposure to sound light or radio waves; psychophysiological procedures such as fMRI, MEG, TMS, EEG, ECG, exercise and stress procedures; administration of any chemical substances)
                        </Text>
                        <Text fz="sm">
                            • Delving into topics that might be sensitive, embarrassing or upsetting or where it is possible that criminal or other disclosures requiring action could take place (e.g., during interviews) – including but not limited to projects focusing on mental health
                        </Text>
                        <br></br>
                        <Text fz="sm">
                            We would, for the purposes of your FYP, strongly advocate that you do not propose or insist on a project that would fall into these categories. If this is unavoidable, please submit a question to discuss or add details in 'Any other ethical considerations'; any and all such projects would require College level ethical approval which can take anything upwards of a month or two to acquire and, even then, approval is unlikely due to the risks associated with such studies.
                        </Text>
                        <br></br>
                        <br></br>
                        <Title order={4}>Please tick the following boxes if your project will involve any of the following:</Title>
                        <br></br>
                        <Checkbox label="Human Participants" checked={human_participants} description="(including all types of interviews, questionnaires, focus groups, records relating to humans, use of online datasets or other secondary data, observations, usability testing, etc.)" />
                        <Checkbox label="Testing Apparatus" checked={testing_apparatus} description="(including where you have developed new apparatus and are testing it for accuracy, including on yourself)" />
                        <br></br>
                        <Title order={4}>Risk to you, including:</Title>
                        <Checkbox label="Lone working during data collection" checked={lone_working} />
                        <Checkbox label="Travel to areas where you may be at risk" checked={travel_risk} />
                        <Checkbox label="Risk of emotional distress" checked={emotional_risk} />
                        <Textarea label="Other: please outline" value={other_personal_risk} radius="md" autosize minRows={2} />
                        <br></br>
                        <br></br>
                        <Checkbox label="Any risk to the environment" checked={environment_risk} />
                        <Checkbox label="Any conflict of interest" checked={conflict_interest} />
                        <Checkbox label="Work/research that could be considered controversial or be of reputational risk to Aston University" checked={controversial_work} />
                        <Checkbox label="Social media data and/or data from internet sources that could be regarded as private" checked={data_risk} />
                        <Textarea label="Any other ethical considerations" description="(please state here or contact the Research Ethics Officer via your College Ethics inbox if there are any substantial ethical considerations you are aware of and would like to flag for the REC.)" radius="md" value={other_risk} autosize minRows={2} />
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
                        />
                        <Textarea
                            label="Study Objectives"
                            description="Please explain how the study you are seeking ethical approval to conduct contributes to your overall project objectives"
                            radius="md"
                            value={study_objectives}
                            withAsterisk
                            autosize
                            minRows={2}
                        />
                        <Textarea
                            label="Data Collection Method(s) to be Used"
                            description="Please outline your proposed data collection methods – e.g., questionnaire/survey, interview, observational study, etc. Justify their use and explain how you will conduct the data collection in practice, including timeframe"
                            radius="md"
                            value={data_collection_method}
                            withAsterisk
                            autosize
                            minRows={2}
                        />
                        <Textarea
                            label="Data to be Collected"
                            description="Please briefly outline the type of data to be collected"
                            radius="md"
                            value={data_collected}
                            withAsterisk
                            autosize
                            minRows={2}
                        />
                        <Textarea
                            label="Participant Recruitment"
                            description="Please outline how you will recruit participants to your study"
                            radius="md"
                            value={participant_recruitment}
                            withAsterisk
                            autosize
                            minRows={2}
                        />
                        <Textarea
                            label="Data Storage"
                            description="Please outline where you will store your data (ideally, on an encrypted server; USB drives are not permissible)"
                            radius="md"
                            value={data_storage}
                            withAsterisk
                            autosize
                            minRows={2}
                        />
                        <Textarea
                            label="For Secondary Data/Dataset Use Only: Compliance with Terms & Conditions of Use"
                            description="If you will be in receipt of secondary data OR will be using an online, publicly available dataset, please provide evidence that you are observing any terms and conditions associated with its use and have permission to use it. Be mindful that just because data is available online does not mean that you are ethically entitled to use it for your study; this needs proven. If you are being given data by, for example, a third party, you need to be sure that the individual has permission to share the data with you."
                            radius="md"
                            value={data_evidence}
                            withAsterisk
                            autosize
                            minRows={2}
                        />
                        <Textarea
                            label="Risk"
                            description="Please outline any risks to either the participants in your study and/or yourself in the conduct of the study and what you have done to mitigate that risk"
                            radius="md"
                            value={risk}
                            withAsterisk
                            autosize
                            minRows={2}
                        />
                        <Textarea
                            placeholder="E.g. Questionnaire link"
                            label="Additional Comments"
                            radius="md"
                            value={comments}
                            autosize
                            minRows={2}
                        />
                        <br></br>
                        <br></br>
                        <Title order={3}>Declaration</Title>
                        <Text fw="700">Student:</Text>
                        <Text fz="sm">I confirm the following:</Text>
                        <Text fz="sm">• The above is an accurate representation of my study activities;</Text>
                        <Text fz="sm">• That I shall not commence participant recruitment and/or data collection without ethical approval to do so (where applicable);</Text>
                        <Text fz="sm">• That I shall seek further ethical approval should I need to make any changes to my study after ethical approval has been granted (where applicable);</Text>
                        <Text fz="sm">• That I shall conduct my study with integrity and in accordance with the ethical approval granted (where applicable);</Text>
                        <Text fz="sm">• That, where necessary, I shall use existing or secondary data in accordance with terms and conditions of use or ethical approval, as applicable;</Text>
                        <Text fz="sm">• That I understand that if I breach the terms of the approval granted I may not be able to use the data collected in my project report and may face disciplinary procedures; and</Text>
                        <Text fz="sm">• That I shall respect my participants (where applicable) and the data I have collected and am using.</Text>
                        <br></br>
                        <TextInput label="Student Signature" placeholder="Print Name" withAsterisk radius="md" value={student_signature} />
                        <br></br>
                        <Text fw="700">Supervisor:</Text>
                        <Text fz="sm">I confirm the following:</Text>
                        <Text fz="sm">• That I have reviewed the content of this form and all associated paperwork and am happy with its standard and accuracy;</Text>
                        <Text fz="sm">• That I shall monitor the student’s conduct of the study in accordance with the ethical approval granted (where applicable); and</Text>
                        <Text fz="sm">• That I shall report to the person(s) granting ethical approval any breaches of approval and ensure that no data is included in the student’s work that has been collected in breach of approval.</Text>
                        <br></br>
                        <TextInput label="Supervisor Signature" placeholder="Print Name" withAsterisk radius="md" value={supervisor_signature} />
                    </Paper>
                </Grid.Col>
            </Grid>
        </div>
    )
}

export default supervisorView