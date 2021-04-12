import { Form, Button, Col, Alert } from 'react-bootstrap'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SETTINGS from '../settings'
import './addBlogForm.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
export default function AddBlogForm() {
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [cetagory, setCetagory] = useState("")
    const [blogBody, setBlogBody] = useState("");
    const [blogPicture, setBlogPicture] = useState();
    const [cetagories, setCetagories] = useState([])
    const [forAlert, setForAlert] = useState(false)
    useEffect(() => {
        axios.get(`${SETTINGS.SERVER_URL_PORT}/cetagory/list-all`)
            .then(dataFormDB => {
                setCetagories(dataFormDB.data.data)
            })
            .catch(err => {
                console.log("Error in Getting data", err)
            })
    }, [])
    // formData.append()
    function saveNewBlog(e) {
        e.preventDefault()
        let formData = new FormData();
        formData.append("blogDetails", JSON.stringify({ title, author, cetagory, blogBody }))
        formData.append("blogPicture", blogPicture)
        axios.post(`${SETTINGS.SERVER_URL_PORT}/blog/save-new`, formData, { "Content-Type": "multipart/form-data" })
            .then(success => {
                console.log("SuccessFully upload New Blog", success);
                setForAlert(!forAlert)
                history.push("/blogs", { Status: true })
                cleanFields();
            })
            .catch(err => {
                console.log("Error in Posting New Blog", err)
                alert("ERROR");
            })
    }

    function cleanFields() {
        setTitle("")
        setAuthor("")
        setCetagory("")
        setBlogBody("")
    }
    function handleOnChange(e, editor) {
        const data = editor.getData();
        setBlogBody(data);
    }

    return <>
        {forAlert ? <Alert variant="success">
            <Alert.Heading> Blog Added SuccessFully </Alert.Heading>
        </Alert> : ""}
        <Form autoComplete='OFF'>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" autoComplete='off' placeholder="Title Of the Blog" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Author </Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Name " value={author} onChange={(e) => setAuthor(e.target.value)} />
                </Form.Group>
            </Form.Row>
            <Form.Group>
                <Form.File type='file' id="exampleFormControlFile1" name ='blogPicture' label="Select Sutable Image for Blog" onChange={(e) => setBlogPicture(e.target.files[0])} />
            </Form.Group>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Cetagory</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..." value={cetagory} onChange={(e) => setCetagory(e.target.value)}>
                        <option>Choose...</option>
                        {cetagories.map(cetagoryfromDB => <option key={cetagoryfromDB._id}> {cetagoryfromDB.cName} </option>)}
                    </Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Group>
                <CKEditor
                    onChange={handleOnChange}
                    editor={ClassicEditor}
                />
            </Form.Group>
            <Button variant="danger" type="submit" className='btn-block' onClick={saveNewBlog} >
                Submit
            </Button>
        </Form>

    </>
}