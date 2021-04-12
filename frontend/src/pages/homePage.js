// import {Link} from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import React from 'react';
import Sidemanu from './homepage/sidemanu'
import FooterPage from './footer'
import Form from './homepage/form'
import Slider from './homepage/slider'
import Blogs from './homepage/blogs'
export default function HomePage() {
    return <>
        <Image src="https://www.higherinfogroup.com/wp-content/uploads/2017/05/LMS-StudentBackground.jpg" fluid />
        <Container fluid >
            <Row>
                <Col lg={12} className='mt-4 text-lg-center bg-dark text-light  font-weight-bold p-3'>
                    <h2> Welcome To My Student Management System </h2>
                </Col>
            </Row>
        </Container>
        <Container>
            <Row>
                <Col lg={8} className='mt-4 '>
                    <h2 className="Lead"> Learn with us  </h2>
                    <Blogs />
                    <hr />
                <Slider />
                </Col>
                <Col lg={4} className='mt-4 '>
                    <Sidemanu />
                </Col>
            </Row>
        </Container>
        <Container>
            <Row>
                <Col lg={12} className='mt-4 text-lg-center bg-dark text-light  font-weight-bold p-3'>
                    <h2> Enroll yourself right now </h2>
                </Col>
            </Row>
        </Container>
        <Container >
            <Row>
                <Col lg={5}>
                    <Form />
                </Col>
                <Col lg={7} className='mt-5' >
                    <Slider />
                </Col>
            </Row>
        </Container>
        <FooterPage />
    </>

}