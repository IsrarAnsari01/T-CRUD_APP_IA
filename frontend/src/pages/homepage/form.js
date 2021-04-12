import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button, Card, Alert } from 'react-bootstrap'
import SETTINGS from '../settings'
import { useState, useEffect } from 'react';
export default function Form() {
    const number = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", " Nine ", "Ten"];
    let i = 0;
    let [name, setName] = useState('');
    let [fName, setFName] = useState('')
    let [gender, setGender] = useState('');
    let [password, setPassword] = useState('');
    let [sclass, setSclass] = useState('');
    let [subjects, setSubjects] = useState('');
    let [allSubjects, setAllSubjects] = useState([])
    // let [forAlertUser, setForAlertUser] = useState(Boolean)
    useEffect(() => {
        fetch(`${SETTINGS.SERVER_URL_PORT}/subject/list-all`)
            .then(res => res.json())
            .then(subjectsfromDB => {
                console.log("Getting data From Server ", subjectsfromDB.data);
                setAllSubjects(subjectsfromDB.data)
            })
            .catch(err => {
                console.log("Error from getting data From Server ", err);
            })
    }, [])
    function saveUserInformation(e) {
        e.preventDefault();
        fetch(`${SETTINGS.SERVER_URL_PORT}/student/add-new-student`, {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, fName, gender, password, sclass, subjects })
        })
            .then(res => res.json())
            .then(data => {
                console.log("Get Response from Server", data)
                if (data.Status) {
                    // setForAlertUser(true);
                    alert("User Added Successfully")
                }
            })
        cleanFields();
    }
    function cleanFields() {
        setName('')
        setGender('')
        setPassword('')
        setSclass('')
        setFName('')
        setSubjects([])
        // setForAlertUser('')
    }
    return <>
        <Card>
            <Card.Body>
                <Card.Title> <h2 className="mt-2 pl-3"> Submit your basic info </h2> </Card.Title>
                {/* {forAlertUser ? <Alert variant='success'>
                    <Alert.Heading> Student Added Successfully </Alert.Heading>
                </Alert> : <Alert variant='danger'> <Alert.Heading> Error in submitting form </Alert.Heading> </Alert>} */}
                <form autoComplete="off">
                    <label for="name">
                        <TextField id="name" value={name} label="Enter Your Name" name='name' className='change-form-width-height' onChange={(e) => setName(e.target.value)} />
                    </label> <br /> <br />
                    <label for="fname">
                        <TextField id="fname" value={fName} label="Enter Your Father Name" name='fname' onChange={(e) => setFName(e.target.value)} />
                    </label> <br /><br />
                    <label for="password">
                        <TextField id="password" value={password} label="Enter Your Password" type='password' name='password' onChange={(e) => setPassword(e.target.value)} />
                    </label> <br /><br />
                    <FormControl >
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                        >
                            <MenuItem value='null' selected disabled>Select any one </MenuItem>
                            <MenuItem value='male' > Male </MenuItem>
                            <MenuItem value='female' > Female </MenuItem>
                        </Select>
                        <FormHelperText>Enter Your class </FormHelperText>
                    </FormControl> <br /><br />
                    <div>
                        <FormControl >
                            <InputLabel id="demo-simple-select-label"> User Class </InputLabel>
                            <Select
                                value={sclass}
                                onChange={(e) => setSclass(e.target.value)}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                            >
                                <MenuItem value='null' selected disabled>Select any one </MenuItem>
                                {number.map(num => <MenuItem value={++i}> {num} </MenuItem>)}
                            </Select>
                            <FormHelperText>Enter Your class </FormHelperText>
                        </FormControl>
                    </div>
                    <div>
                        {sclass && allSubjects.filter(subject => subject.classForSubject == sclass).map(subject => <FormControlLabel
                            key={subject._id}
                            control={
                                <Checkbox
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
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label={subject.subjectName}
                        />)}

                    </div>
                    <Button variant="danger" type='submit' onClick={saveUserInformation}> Submit info </Button>
                </form>
            </Card.Body>
        </Card>

    </>
}