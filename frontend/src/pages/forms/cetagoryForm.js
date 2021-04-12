import {Form , Button} from 'react-bootstrap'
import SETTINGS from '../settings'
import {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
export default function CetagoryForm() {
const history = useHistory()
const [aName , setAName] = useState('')
const [cName , SetCName] = useState('')
function addCetagory(e) {
    e.preventDefault();
    let data = {
        aName,
        cName
    }
    axios.post(`${SETTINGS.SERVER_URL_PORT}/cetagory/add-new` , data)
    .then(success => {
        console.log("Data Added Success Fully" , success)
        cleanFields();
        history.push('/addBlog' ,{ status: true})
    })
    .catch(err => {
        console.log("Err in adding cetagory" , err)
    })
}
function cleanFields() {
    setAName('')
    SetCName('')
}
return <>
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Admin Name</Form.Label>
                <Form.Control type="text" value={aName} placeholder="Enter Admin Name " onChange={(e) => setAName(e.target.value)} />
                <Form.Text className="text-muted">
                    Enter Admin name to add Cetagory
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Cetagory Name </Form.Label>
                <Form.Control type="text" placeholder="Cetagory Name " value={cName} onChange={(e) => SetCName(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" className='btn-block' onClick={addCetagory}>
                Submit
            </Button>
        </Form>

    </>
}