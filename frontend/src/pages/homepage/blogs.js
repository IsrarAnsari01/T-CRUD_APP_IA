import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import parse from 'react-html-parser'
import { useEffect, useState } from 'react'
import axios from 'axios'
import SETTING from '../settings'
export default function Blogs() {
    let [latestBlog, setLatestBlog] = useState(null)
    useEffect(() => {
        axios.get(`${SETTING.SERVER_URL_PORT}/blog/latest-Blog`)
            .then(res => {
                setLatestBlog(res.data.receivedBlog[0])
            })
            .catch(err => {
                console.log("Getting err From server ", err);
            })
    }, [])
    return <>
    {!!latestBlog && 
        <Card>
            <Card.Img variant="top" src={latestBlog.blogImageUrl} />
            <Card.Body>
                <Card.Title>
                    <p className="text-muted text-small"> <b> Writer Name:  </b> <i>{latestBlog.author}</i> | Publish On : <b>{latestBlog.createdOn}</b>  </p>
                    <hr />
                    <h1 className='mt-2 text-center'> {latestBlog.title}</h1>
                    <hr />
                </Card.Title>
                {latestBlog.blogBody.length >= 100 ? <Card.Text> {parse(latestBlog.blogBody.substr(1, 700))} </Card.Text> : <Card.Text> {parse(latestBlog.blogBody)} </Card.Text>}
            </Card.Body>
            <Link to={'/view-full-blog/' + latestBlog._id} className=' btn btn-block btn-danger'>Read More  </Link>
        </Card>
    }

    </>
}