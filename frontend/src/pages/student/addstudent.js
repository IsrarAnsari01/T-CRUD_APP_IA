import FooterPage from '../footer'
import { Row, Col, Container } from 'react-bootstrap'
import Slider from '../homepage/slider'
import Form from '../homepage/form'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
export default function Addstudent() {
    const history = useHistory();
    useEffect(() => {
        if (!localStorage.getItem("user_id")) {
            history.push("/signin", { status: false });
        }
      }, [])
return <>
        <Container fluid>
            <Row>
                <Col lg={6} >
                    <Form />
                </Col>
                <Col lg={6} className=' mt-5' >
                    <Slider />
                </Col>
            </Row>
        </Container>
        <FooterPage />
    </>
}