import { Card, Row, Col, Container } from 'react-bootstrap'
import FooterPage from './footer'
import Slider from './homepage/slider'
import Sidemanu from './homepage/sidemanu'

export default function InformUser() {

    return <>

        <Container fluid>
            <Row>
                <Col lg={8}>
                    <Card className ='mt-5'>
                        <Card.Header className='bg-dark text-center text-light'>
                            <Card.Title>
                                <h2> Thanks For Signin</h2>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <h5 className='text-center text-lead'> We Sent You Email Go and verify yourSelf</h5>
                            </Card.Text>
                            <Card.Img className='mt-5 p-2' variant="bottom" src="https://d2x3xhvgiqkx42.cloudfront.net/f58cbdc2-5232-453b-a050-9743545c0554/f201ca60-01e4-4690-9b3a-1e0b02a4c82a/2020/06/02/dfdc93ca-0829-4540-8685-5720c9da7d7f/e927c772-a34d-46f4-970c-b88867b65df3.png" />
                        </Card.Body>
                    </Card>
                    <br />
                    <br />
                    <br />
                    <Slider />
                </Col>
                <Col lg={4}>
                    <Sidemanu />
                </Col>
            </Row>
        </Container>
        <FooterPage />
    </>

}