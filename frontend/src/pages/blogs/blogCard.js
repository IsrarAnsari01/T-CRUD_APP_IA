import { Card, Button, Collapse } from 'react-bootstrap'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import parse from 'html-react-parser'
import './bodyCard.css'
export default function BlogCard(props) {
    const [open, setOpen] = useState(false);
    return <>
        <Card className='mt-3'>
            <Card.Header>
                <Card.Title className='text-Dark text-center'>
                    <h1 className='h1 lead mb-2'> {props.title} <span className='ml-5 pl-5'> <Button onClick={() => setOpen(!open)} aria-expanded={open}> <ArrowDropDownCircleIcon fontSize='medium' /> </Button></span> </h1>
                </Card.Title>
                </Card.Header>
            <Collapse in={open}>
                <Card.Body>
                    <div classNmae='mainDiv'>
                        <div>
                            <p className='lead'>Author Name : <b> {props.author} </b> & Publish Date <b> {props.date} </b> <span className='small ml-5 pl-2'> <VisibilitySharpIcon fontSize='small' /> <b> 20 </b></span></p>
                        </div>
                        <div ClassName='pl-5 text-justify'>
                            <p ClassName='small'> {props.content.length >= 100 ? parse(props.content.substr(1, 130)) : parse(props.content)}</p>
                            <Link to = {"/view-full-blog/" + props.id}   className='btn btn-block btn-danger mt-3'> Read More..!</Link>
                        </div>
                    </div>
                </Card.Body>
            </Collapse>
        </Card>
    </>
}