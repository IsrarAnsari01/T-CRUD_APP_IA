import { Form, Col, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import SETTINGS from '../settings'
export default function CommentForm(props) {
    let [name, setName] = useState('');
    let [comment, setComments] = useState("")
    let blogId = props.id;
    function saveNewComment(e) {
        e.preventDefault();
        fetch(`${SETTINGS.SERVER_URL_PORT}/comment/new-comment`, {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, comment, blogId })
        })
            .then(res => {
                console.log("Getting response from Server", res);
                cleanFields();
                window.location.reload();

            })
            .catch(err => {
                console.log("Getting Error from Server", err);
            })
    }

    function cleanFields() {
        setName('');
        setComments('')
    }
    return <>
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label> Name </Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Name " value={name} onChange={e => setName(e.target.value)} required />
                </Form.Group>
            </Form.Row>
            <Form.Group>
                <label htmlFor="exampleFormControlTextarea1">
                    Wirte Comment Here
                </label>
                <textarea
                    required
                    onChange={e => setComments(e.target.value)}
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="8"
                    value={comment}
                />
            </Form.Group>
            <Form.Group>
                <Button type='submit' className='btn-danger btn-block btn' onClick={saveNewComment}> Add comment </Button>
            </Form.Group>
        </Form>
    </>
}