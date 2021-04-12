import { useState, useEffect } from 'react'
import { Container, Row, Col, Card} from 'react-bootstrap'
import TeachersTable from './teachersTable'
import FooterPage from '../footer'
export default function Teacher() {
    return <>
        <Container>
            <Row>
                <Col lg={12}>
                    <Card className=' mt-5'>
                        <Card.Header className="bg-success text-white">
                            <Card.Title>
                                <h2> Active Teachers </h2>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <TeachersTable />
                        </Card.Body>
                        <Card.Footer>
                            <a href='/addteacher' className=' btn btn-block btn-success'> Want to join us lets Sign in </a>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
        <FooterPage />
    </>
} 