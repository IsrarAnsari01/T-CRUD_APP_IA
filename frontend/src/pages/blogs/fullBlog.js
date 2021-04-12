import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import parse from 'react-html-parser'
import FooterPage from '../footer'
import Sidemanu from '../homepage/sidemanu'
import { Container, Row, Col, Card } from 'react-bootstrap'
import SETTINGS from '../settings'
import CommentForm from '../forms/commentForm'
import axios from 'axios'
import CommentsCardBody from './commentsCardBody'
export default function FullBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState({});
    const [commentsOnThisBlog, setCommentsOnThisBlog] = useState(null)
    function fetchingSpecficBlog() {
        fetch(`${SETTINGS.SERVER_URL_PORT}/blog/get-specfic-Blog/${id}`)
            .then(res => res.json())
            .then(success => {
                setBlog(success.data)
            })
            .catch(err => {
                console.log("Error in Fetching data ", err)
            })
    }
    function listComments() {
        axios.get(`${SETTINGS.SERVER_URL_PORT}/comment/list-comments/${id}`)
            .then(commentSet => {
                console.log("Getting data from DB", commentSet.data.data);
                setCommentsOnThisBlog(commentSet.data.data)
            })
            .catch(err => {
                console.log("Something went wrong to getting Comments ")
            })
            
    }
    useEffect(() => {
        fetchingSpecficBlog();
        listComments();
    }, [])

    return <>
        <Container fluid>
            <Row>
                <Col lg={9}>
                    <Card className=" mt-5">
                        <Card.Header>
                            <Card.Img variant="top" src={blog.blogImageUrl} className='p-2 imgCss' />
                        </Card.Header>
                        <Card.Body>
                            <Card.Title className=' mt-2 text-center bg-dark text-white p-5'>
                                <h1> {blog.title} </h1>
                            </Card.Title>
                            <Card.Text>
                                <p className='text-muted'> Written by <b>{blog.author}</b></p>
                                <p className='text-muted text-small'> Publish Date {blog.createdOn}</p>
                                <p className='text-muted text-small'> Cetagory: <b> {blog.cetagory} </b> </p>
                                <hr />
                                <p> {parse(blog.blogBody)}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className='mt-5'>
                        <Card.Header className='bg-success text-white'>
                            <Card.Title>
                                <p> Comments </p>
                            </Card.Title>
                        </Card.Header>
                        {commentsOnThisBlog && commentsOnThisBlog.length ? commentsOnThisBlog.map(comment => <CommentsCardBody name={comment.name} CreatedOn={comment.CreatedOn} comment={comment.comment} />) : <Card.Body>
                            <Card.Text>
                                <h6> Currently Zero Comments in this Blog </h6>
                            </Card.Text>
                        </Card.Body>}
                    </Card>
                    <Card className='mt-5'>
                        <Card.Header className='text-danger text-white'>
                            <Card.Title className='bg-danger text-white p-3'>
                                <h2> Leave your comments Below </h2>
                            </Card.Title>
                            <Card.Body>
                                <CommentForm id={id} />
                            </Card.Body>
                        </Card.Header>
                    </Card>
                </Col>
                <Col lg={3}>
                    <div className='mt-5' >
                        <Sidemanu />
                    </div>
                </Col>
            </Row>
        </Container>
        <FooterPage />
    </>
}