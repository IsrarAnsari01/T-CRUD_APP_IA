import FooterPage from '../footer'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Sidemanu from '../homepage/sidemanu'
import BlogCard from './blogCard'
import { useEffect, useState } from 'react'
import SETTINGS from '../settings'
export default function ListBlogs() {
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        fetch(`${SETTINGS.SERVER_URL_PORT}/blog/list-all`)
            .then(res => res.json())
            .then(blogs => {
                setBlogs(blogs.data)
            })
            .catch(err => {
                console.log("Error in Fetching data " , err)
            })
    }, [])
    return <>
        <Container>
            <Row>
                <Col lg={8}>
                    <a href='/addBlog' className=' btn btn-block btn-success text-white mt-5'> Share your through with us </a>
                    <Card className='mt-4'>
                        <Card.Header className=' bg-dark text-white text-center'>
                            <Card.Title>
                                <h2> Latest Blogs  </h2>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body className='mt-4'>
                            {blogs.map((blog) => <BlogCard id = {blog._id} title={blog.title} author={blog.author} date = {blog.createdOn} content = {blog.blogBody} /> )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4} className='mt-5' >
                    <Sidemanu />
                </Col>
            </Row>
        </Container>
        <FooterPage />

    </>
}