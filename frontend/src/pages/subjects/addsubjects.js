import { Card } from 'react-bootstrap'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import { useState, useEffect } from 'react'
import Settings from "../settings"
import { useHistory } from 'react-router-dom'
export default function Addsubjects() {
    const history = useHistory();
    useEffect(() => {
        if (!localStorage.getItem("user_id")) {
            history.push("/signin", { status: false });
        }
      }, [])
    const number = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", " Nine ", "Ten"];
    let i = 0;
    const [subject, setSubject] = useState('');
    const [classForSubject, setclassForSubject] = useState('');
    function saveInfo(e) {
        e.preventDefault();
        fetch(`${Settings.SERVER_URL_PORT}/subject/add-new`, {
            headers: { "Content-Type": "application/json" },
            method: 'post',
            body: JSON.stringify({ subject, subForCls: classForSubject })
        })
            .then(data => {
            })
            .catch(err => {
                console.log("Getting error from Server ", err)
            })
        console.log(subject);
        console.log(classForSubject)
        cleanFields()
    }
    function cleanFields() {
        setSubject('');
        setclassForSubject('')
    }
    return <>
        <Card>
            <Card.Header>
                <Card.Title>
                    <h1 className="lead"> Add new Subjects </h1>
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <form noValidate autoComplete="off" className='m-5 pl-5'>
                    <TextField id="standard-basic" label="Subject name" value={subject} type='text' onChange={(e) => setSubject(e.target.value)} /> <br /> <br />
                    <FormControl >
                        <InputLabel id="demo-simple-select-label"> For Class </InputLabel>
                        <Select
                            onChange={(e) => setclassForSubject(e.target.value)}
                            value={classForSubject}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                        >
                            <MenuItem value='null' selected disabled> Select any one </MenuItem>
                            {number.map(num => <MenuItem value={++i}> {num} </MenuItem>)}
                        </Select>
                        <FormHelperText>Enter Your class </FormHelperText>
                    </FormControl> <br /> <br />
                    <Button variant="contained" color="primary" className='btn btn-block' onClick={saveInfo}>
                        Save Info
                                </Button>
                </form>
            </Card.Body>
        </Card>


    </>
} 