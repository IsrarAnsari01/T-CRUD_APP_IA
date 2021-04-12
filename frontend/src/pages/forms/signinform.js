import { Container, Row, Col } from 'react-bootstrap'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import Sidemanu from '../homepage/sidemanu'
import Slider from '../homepage/slider'
import { useState } from 'react';
import {useHistory} from 'react-router-dom'
import SETTINGS from '../settings'
export default function Signinform() {

    const [userName, setName] = useState('')
    const [userEmail, setEmail] = useState('')
    const [userPassword, setPassword] = useState('')
    const history = useHistory();
    function saveThisUser(e) {
        e.preventDefault();
        fetch(`${SETTINGS.SERVER_URL_PORT}/users/add-new-user`, {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userName, userEmail , userPassword})
        })
            .then(success => {
                history.push('/informUser' , {Status: true})
            })
            .catch(err => {
                console.log("Getting Error From Server", err)
            })
        cleanFields();
    }

    function cleanFields() {
        setName('')
        setEmail('')
        setPassword('')
    }


    return <>
        <Container>
            <Row>
                <Col lg={8}>
                    <Card variant="outlined" className='m-5'>
                        <CardContent>
                            <Typography variant="h4" component="h2" className='pl-5'>
                                Welcome to SMS By IA lets! Sign in
                            </Typography>
                            <form noValidate autoComplete="off" className='m-5 pl-5'>
                                <TextField id="standard-basic"  value = {userName} label="Your name" type='text' onChange = {(e) => setName(e.target.value) } /> <br /> <br />
                                <TextField id="standard-basic" value = {userEmail} label="Your Email" type='email' onChange = {(e) => setEmail(e.target.value) } /> <br /> <br />
                                <TextField id="standard-basic" value = {userPassword} label="Password" type='password' onChange = {(e) => setPassword(e.target.value) }/> <br /> <br />
                                <Button variant="contained" color="secondary" onClick={saveThisUser}>
                                    Save Info
                                </Button>
                            </form>
                        </CardContent>
                        <CardActions className='ml-5'>
                            <Link to='/login' > If you already have an account lets!  Log in </Link>
                        </CardActions>
                    </Card>
                    <Slider />
                </Col>
                <Col lg={4} >
                    <Sidemanu />
                </Col>
            </Row>
        </Container>
    </>
}