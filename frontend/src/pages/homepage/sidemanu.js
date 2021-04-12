import { Card } from 'react-bootstrap'
import SETTINGS from '../settings'
import parse from 'react-html-parser'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default function Sidemanu() {
    const [students, setstudents] = useState([])
    const [subjects, setsubjects] = useState([])
    const [teachers, setteachers] = useState([])
    const [latestBlog, setLatestBlog] = useState(null)
    async function fetchingLatestBlog() {
        const response = await fetch(`${SETTINGS.SERVER_URL_PORT}/blog/latest-Blog`)
        const json = await response.json()
        setLatestBlog(json.receivedBlog[0])
    }
    async function fetchinStudent() {
        const response = await fetch(`${SETTINGS.SERVER_URL_PORT}/student/all-student`)
        const students = await response.json()
        setstudents(students.data)
    }
    async function fetchingSubjects() {
        const response = await fetch(`${SETTINGS.SERVER_URL_PORT}/subject/list-all`)
        const subjects = await response.json()
        setsubjects(subjects.data)
    }
    async function fethcingTeachers() {
        const response = await fetch(`${SETTINGS.SERVER_URL_PORT}/teacher/all-teacher`)
        const teachers = await response.json()
        setteachers(teachers.data)
    }
    useEffect(() => {
        fetchinStudent();
        fetchingSubjects();
        fethcingTeachers();
        fetchingLatestBlog();
    }, [])
    return <>
        <Card className='mt-2'>
            <Card.Img variant="top" src="https://img.etimg.com/thumb/msid-75757932,width-650,imgsize-571225,,resizemode-4,quality-100/not-just-scientists-students-are-also-fighting-covid-19-.jpg" className='p-2' />
            <Card.Body>
                <Card.Title className=' text-white p-2 text-decoration-none'>
                    <a href='/student'>  <h5> Total Number to active Studens </h5> </a>
                </Card.Title>
                <Card.Text>
                    <h2 className='lead'> Currently we have <b> {students.length} </b>  Students</h2>
                </Card.Text>
            </Card.Body>
        </Card>
        <Card className=' mt-2'>
            <Card.Img variant="top" src="https://www.chalk.com/wp-content/uploads/2019/12/Screen-Shot-2020-01-14-at-12.12.01-AM-1024x485.png.webp" className='p-2' />
            <Card.Body>
                <Card.Title className=' text-light p-2 '>
                    <a href='/teacher'>  <h5> Total Number to active Teacher </h5> </a>
                </Card.Title>
                <Card.Text>
                    <h2 className='lead'> Currently we have <b> {teachers.length} </b>  Teacher</h2>
                </Card.Text>
            </Card.Body>
        </Card>
        <Card className='mt-2'>
            <Card.Img variant="top" src="https://images.theconversation.com/files/49135/original/22qc7r28-1400667334.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&h=539&fit=crop&dpr=1" className='p-2' />
            <Card.Body>
                <Card.Title className=' text-light p-2 '>
                    <a href='/subjects'>  <h5> Number of Subjects </h5> </a>
                </Card.Title>
                <Card.Text>
                    <h2 className='lead'> Currently we have <b> {subjects.length} </b>  Subjects</h2>
                </Card.Text>
            </Card.Body>
        </Card>
        {!!latestBlog &&
        <Card className='mt-2'>
        <Card.Img variant="top" src={latestBlog.blogImageUrl} className='p-2' />
        <Card.Body>
            <Card.Title className=' text-light p-2 '>
                <a href='/blogs'>  <h5> Latest Blog </h5> </a>
                <h5 className='text-center mt-5 text-dark'> {latestBlog.title} </h5>
            </Card.Title>
            <Card.Text>
                <p className='text-muted'> Author <b> {latestBlog.author}</b> & Publish On <b> {latestBlog.createdOn}</b> </p>
                <p className='text-small pt-2'> {latestBlog.blogBody.length >= 100 ? parse(latestBlog.blogBody.substr(1, 50)) : parse(latestBlog.blogBody)} </p>
                <Link to = {'/view-full-blog/'+latestBlog._id} className='btn btn-block btn-danger text-white'> Click and Read Complete Blog </Link>
            </Card.Text>
        </Card.Body>
    </Card>
        }
        
    </>
}