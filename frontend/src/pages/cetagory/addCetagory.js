import FooterPage from '../footer'
import Slider from '../homepage/slider'
import { Container, Row, Col, Card } from 'react-bootstrap'
import CetagoryForm from '../forms/cetagoryForm'
// import { Card } from '@material-ui/core'
export default function AddCetagory() {
    return <>
        <Container>
            <Row>
                <Col lg={6}>
                    <Card className="mt-5 pt-5 pb-5">
                        <Card.Header className='bg-secondary text-white text-center'>
                            <Card.Title>
                                <h2 > Add Cetagory </h2>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <CetagoryForm />
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6} className="mt-5 pt-5 pb-5">
                    <Slider />
                </Col>
            </Row>
        </Container>
        <FooterPage />






    </>
}