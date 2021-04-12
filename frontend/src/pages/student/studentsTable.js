import { Table, Button, Card } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SETTINGS from '../settings'
import { useHistory } from 'react-router-dom'
export default function StudentsTable() {
    let [students, setstudents] = useState([])
    let i = 1;
    let j = 0;
    const history = useHistory();
    function fetchUsers() {
        fetch(`${SETTINGS.SERVER_URL_PORT}/student/all-student`)
            .then(res => res.json())
            .then(studentsfromDB => {
                console.log("Getting data From Server ", studentsfromDB.data);
                setstudents(studentsfromDB.data)
            })
            .catch(err => {
                console.log("Error from getting data From Server ", err);
            })
    }
    useEffect(() => {
        fetchUsers();
    }, [])
    function deletethisUser(id) {
        if (!localStorage.getItem("user_id")) {
            history.push("/signin", { status: false });
            return;
        }
        fetch(`${SETTINGS.SERVER_URL_PORT}/student/del-this-user`, {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })
            .then(success => {
                console.log("Positive response From server ", success)
                if (success.status) {
                    fetchUsers();
                }
            })
            .catch(err => {
                console.log("Getting Error From server ", err)
            })

    }
    return <>
        <Card>
            <Card.Header>
                <Card.Title>
                    <h2> Total Number of Enrolled Students is {students.length}</h2>
                </Card.Title>
                <Card.Body>
                    <Table striped bordered hover variant="dark">
                        <thead className='text-center'>
                            <tr>
                                <th>SN0</th>
                                <th> Name </th>
                                <th> Father Name </th>
                                <th> Gender </th>
                                <th> Student Class </th>
                                <th> Selected Subjects </th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => <tr key={++j}>
                                <td> {i++} </td>
                                <td> {student.name}</td>
                                <td> {student.fName}</td>
                                <td> {student.gender}</td>
                                <td> {student.studentClass}</td>
                                <td> {student.subjects.join(' , ')}</td>
                                <td> <Link className=' btn btn-success' to={'/editStudent/' + student._id}> Edit </Link></td>
                                <td> <Button className=' btn btn-danger' onClick={() => { deletethisUser(student._id) }}> Delete </Button></td>
                            </tr>)}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card.Header>
        </Card>
    </>
}