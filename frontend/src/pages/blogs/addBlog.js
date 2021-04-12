import { Container, Row, Col, Card } from 'react-bootstrap'
import AddBlogForm from '../forms/addBlogForm'
import Sidemanu from '../homepage/sidemanu'
import FooterPage from '../footer'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
export default function AddBlogs() {
    const history = useHistory();
    useEffect(() => {
        if (!localStorage.getItem("user_id")) {
            history.push("/signin", { status: false });
        }
    }, [])
    return <>
        <Container fluid>
            <Row>
                <Col lg={9}>
                    <Card className='mt-3'>
                        <Card.Header className='bg-dark'>
                            <Card.Text>
                                <h2 className=' text-center text-white'> Add Blog</h2>
                            </Card.Text>
                        </Card.Header>
                        <Card.Body>
                            <AddBlogForm />
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={3}>
                    <Sidemanu />
                </Col>
            </Row>
        </Container>
        <FooterPage />
    </>
}