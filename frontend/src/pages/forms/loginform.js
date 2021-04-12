import { useState } from 'react'
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import SETTINGS from '../settings'
export default function Loginform() {
    const [userEmail, setEmail] = useState('')
    const [userPassword, setPassword] = useState('')
    const history = useHistory();
    function loginThisUser(e) {
        e.preventDefault();
        fetch(`${SETTINGS.SERVER_URL_PORT}/users/find-user`, {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userEmail, userPassword })
        })
            .then(res => res.json())
            .then(success => {
                if (success.Status) {
                    history.push(`/blogs/${success.data[0]._id}`, { Status: true })
                    localStorage.setItem("user_id" , success.data[0]._id )
                }
            })
            .catch(err => {
                alert(err);
            })
        cleanFields();
    }
    function cleanFields() {
        setEmail('')
        setPassword('')
    }
    return <>
        <Container>
            <Row>
                <Col lg={12}>
                    <Card>
                        <Card.Title className='bg-dark text-light p-2 mt-2'>
                            <h2> Lets! Login </h2>
                        </Card.Title>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" value={userEmail} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                                    <Form.Text className="text-muted">
                                        Enter Email to login.
                            </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" value={userPassword} onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>
                                <Button variant="primary" type="submit" className='btn-block' onClick={loginThisUser}>
                                    Submit
                        </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

    </>
}