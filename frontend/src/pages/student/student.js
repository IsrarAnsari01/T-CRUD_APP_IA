import { Col, Row , Container , Card  } from 'react-bootstrap'
import FooterPage from '../footer'
import StudentsTable from './studentsTable'
import Sidemanu from '../homepage/sidemanu'
export default function Student() {

    return <>
        <Container>
            <Row>
                <Col lg={12} className='mt-5 mb-2 text-center'>
                    <a href='/addstudent' className='btn btn-info '> Go and Enroll yourself right now </a>
                </Col>
            </Row>
        </Container>
        <Container fluid> 
            <Row>
                <Col lg={9}>
                    <StudentsTable />
                </Col>
                <Col lg = {3}>
                    <Sidemanu />
                </Col> 
            </Row>
        </Container>
        <FooterPage />
    </>
} 