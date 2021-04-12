import { Form, Button, Col} from 'react-bootstrap'
import { useState,} from 'react'
import SETTINGS from '../settings'
export default function Addteachersform() {
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [education, setEducation] = useState('')
    function submitInfo(e) {
        e.preventDefault();
        fetch(`${SETTINGS.SERVER_URL_PORT}/teacher/add-new-teacher`, {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fName, lName, email, password, education })
        })
            .then(data => {
                console.log("Successfully teacher Added", data)
                if (data.status) {
                    alert("Teacher Added Successfully")
                }
            })
            .catch(err => {
                console.log("Error in submission")
            })
        cleanFields();
    }
    function cleanFields() {
        setFName('')
        setLName('')
        setEmail('')
        setPassword('')
        setEducation('')
    }
    return <>
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" value={fName} onChange={(e) => setFName(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" value={lName} onChange={(e) => setLName(e.target.value)} />
                </Form.Group>
            </Form.Row>
            <Form.Group controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control placeholder="1234 Main St" type='email' placeholder=' Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control placeholder="Enter your password" type='password' placeholder=' Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Education</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..." value={education} onChange={(e) => setEducation(e.target.value)}>
                        <option>Choose...</option>
                        <option>Matriculation</option>
                        <option>Intermediate</option>
                        <option>Bechelor </option>
                        <option>Master </option>
                        <option>PHD </option>
                    </Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Group id="formGridCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="danger" type="submit" className='btn-block' onClick={submitInfo}>
                Submit
            </Button>
        </Form>

    </>
}