import { Row, Col, Container, Card } from 'react-bootstrap'
import FooterPage from '../footer'
import Addsubjects from './addsubjects'
import Slider from '../homepage/slider'
import SubjectsTable from './subjectsTable'
export default function Subjects() {
    return <>
        <Container>
            <Row>
                <Col lg={6} className="mt-5 pt-5" >
                    <Addsubjects />
                </Col>
                <Col lg={6} className="mt-5 pt-5">
                    <Slider />
                </Col>
            </Row>
        </Container>
        <Container>
            <Row>
                <Col lg={12} className='mt-5'>
                    <Card>
                        <Card.Header>
                            <Card.Title>
                                <h1 className='lead'> Registered Subjects</h1>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                           <SubjectsTable />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        <FooterPage />
    </>
} 