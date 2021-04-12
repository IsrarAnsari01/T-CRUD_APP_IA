import FooterPage from '../footer'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Addteachersform from '../forms/addteachersform'
import Sidemanu from '../homepage/sidemanu'
import Slider from '../homepage/slider'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
export default function Addteacher() {
    const history = useHistory();
    useEffect(() => {
        if (!localStorage.getItem("user_id")) {
            history.push("/signin", { status: false });
        }
      }, [])
    return <>
        <Container fluid>
            <Row>
                <Col lg={8} className='mt-5 ml-3'>
                    <Card>
                        <Card.Header className='bg-dark text-white'>
                            <Card.Title>
                                <h2> Give us your information </h2>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body className='mt-2 mb-2'>
                            <Addteachersform />
                        </Card.Body>
                    </Card>
                    <Slider />
                </Col>
                <Col lg={3} className='mt-5'>
                    <Sidemanu />
                </Col>
            </Row>
        </Container>
        <FooterPage />
    </>
}