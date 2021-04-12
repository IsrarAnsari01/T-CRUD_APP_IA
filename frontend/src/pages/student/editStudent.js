import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '../homepage/slider'
import Sidemanu from '../homepage/sidemanu'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import FooterPage from '../footer'
import SETTINGS from '../settings'
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(4),
        minWidth: 300,
    },
}));
export default function EditStudent() {
    const history = useHistory();
    const classes = useStyles();
    const classNames = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", " Nine ", "Ten"];
    let i = 0;
    const { id } = useParams();
    const [allSubjects, setAllSubjects] = useState([])
    const [name, setName] = useState('');
    const [fName, setFName] = useState('');
    const [passwrod, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [subjects, setSubjects] = useState('');

    function getAllSubjectsFormDb() {
        fetch(`${SETTINGS.SERVER_URL_PORT}/subject/list-all`)
            .then(res => res.json())
            .then(subjectsfromDB => {
                console.log("Getting data From Server ", subjectsfromDB.data);
                setAllSubjects(subjectsfromDB.data)
            })
            .catch(err => {
                console.log("Error from getting data From Server ", err);
            })
    }
    
    useEffect(() => {
        if (!localStorage.getItem("user_id")) {
            history.push("/signin", { status: false });
        }
        fetch(`${SETTINGS.SERVER_URL_PORT}/student/specfic-student/${id}`)
            .then(res => res.json())
            .then(user => {
                console.log("User Found ", user.data);
                getAllSubjectsFormDb();
                setSelectedUserDetails(user.data)
            })
            .catch(err => {
                console.log("Error in finding user ", err);
            })
    }, [])
    function setSelectedUserDetails(data) {
        setName(data.name);
        setFName(data.fName);
        setPassword(data.password);
        setGender(data.gender);
        setStudentClass(data.studentClass);
        setSubjects(data.subjects);
        i = 0;
    }
    function updateUser(e) {
        e.preventDefault();
        fetch(`${SETTINGS.SERVER_URL_PORT}/student/update-student/${id}`, {
            method: 'put',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data: { name, fName, passwrod, gender, studentClass, subjects },
                id: id
            })
        })
            .then(success => {
                if (success.status) {
                    cleanFields();
                    alert("User Update Success Fully");
                    history.push('/student', { status: true })
                }
            })
            .catch(err => {
                console.log("SomeThing Went Wrong")
            })
    }

    function cleanFields() {
        setName('');
        setFName('');
        setPassword('');
        setGender('');
        setStudentClass('');
        setSubjects('');
    }
    console.log("Student Class ", studentClass)
    return <>

        <Container fluid>
            <Row>
                <Col lg={9}>
                    <Card>
                        <Card.Body>
                            <Card.Title> <h2 className="mt-2 pl-3"> Update your Information {name} </h2> </Card.Title>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Your Name</Form.Label>
                                        <Form.Control type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Father Name</Form.Label>
                                        <Form.Control type="text" placeholder="Last Name" value={fName} onChange={(e) => setFName(e.target.value)} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group controlId="formGridEmail">
                                    <Form.Label>Your Password </Form.Label>
                                    <Form.Control type='text' placeholder='Your Password' value={passwrod} onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control as="select" defaultValue="Choose..." value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option value="null" selected disabled> Select your gender  </option>
                                        <option value="male" > Male </option>
                                        <option value="female"> Female</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState">
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label"> Student Class </InputLabel>
                                        <Select
                                            value={studentClass}
                                            onChange={(e) => setStudentClass(e.target.value)}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                        >
                                            <MenuItem value='null' selected disabled>Select any one </MenuItem>
                                            {classNames.map(cls => <MenuItem value={++i} > {cls} </MenuItem>)}
                                        </Select>
                                        <FormHelperText>Enter Your class </FormHelperText>
                                    </FormControl>
                                </Form.Group>
                                <Form.Row>
                                </Form.Row>
                                <Form.Group id="formGridCheckbox">
                                    {studentClass && allSubjects.filter(subject => subject.classForSubject == studentClass).map(subject => <FormControlLabel
                                        key={subject._id}
                                        control={
                                            <Checkbox
                                                value={subjects}
                                                checked={subjects.includes(subject.subjectName)}
                                                onChange={(e) => {
                                                    let previosState = [...subjects];
                                                    if (e.target.checked) {
                                                        previosState.push(subject.subjectName);
                                                    } else {
                                                        let indexNo = previosState.indexOf(subject.subjectName);
                                                        previosState.splice(indexNo, 1);
                                                    }
                                                    console.log(previosState)
                                                    setSubjects(previosState);

                                                }}
                                                value={subjects}
                                                name="Check Box"
                                                color="primary"
                                            />
                                        }
                                        label={subject.subjectName}
                                    />)}
                                </Form.Group>
                                <Button variant="danger" type="submit" className='btn-block' onClick={updateUser}>
                                    Update Your Info
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <Card className='mt-2'>
                        <Slider />
                    </Card>
                </Col>
                <Col lg={3}>
                    <Sidemanu />
                </Col>
            </Row>
        </Container>
        <FooterPage />
    </>
}