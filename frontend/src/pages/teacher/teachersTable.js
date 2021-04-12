import { Table, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import SETTINGS from '../settings'
import {useHistory} from 'react-router-dom'
export default function TeachersTable() {
    let [teachers, setteachers] = useState([])
    const history = useHistory()
    let i = 0;
    useEffect(() => {
        fetch(`${SETTINGS.SERVER_URL_PORT}/teacher/all-teacher`)
            .then(res => res.json())
            .then(teachersfromDB => {
                console.log("Getting data From Server ", teachersfromDB.data);
                setteachers(teachersfromDB.data)
            })
            .catch(err => {
                console.log("Error from getting data From Server ", err);
            })
    }, [])
    function deleteThisTeacher(id) {
        if (!localStorage.getItem("user_id")) {
            history.push("/signin", { status: false });
            return;
        }
        fetch(`${SETTINGS.SERVER_URL_PORT}/teacher/del-this-teacher`, {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })
            .then(success => {
                console.log("Positive response From server ", success)
                if (success.status) {
                    fetch(`${SETTINGS.SERVER_URL_PORT}/teacher/all-teacher`)
                        .then(res => res.json())
                        .then(updatedData => {
                            console.log(updatedData.data)
                            setteachers(updatedData.data)
                        })
                        .catch(err => {
                            console.log("Error In Deleting Data ", err)
                        })
                }
            })
            .catch(err => {
                console.log("Getting Error From server ", err)
            })

    }
    return <>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>SN0</th>
                    <th> First Name </th>
                    <th> Last Name </th>
                    <th> Email </th>
                    <th> Education </th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {teachers.map(teacher => <tr> <td> {++i} </td> <td> {teacher.fName}</td> <td> {teacher.lName}</td> <td> {teacher.email}</td><td> {teacher.education}</td> <td> <Button className=' btn btn-success'> Edit </Button> </td> <td> <Button className=' btn btn-danger' onClick = {() => {deleteThisTeacher(teacher._id)}}> Delete </Button> </td> </tr>)}
            </tbody>
        </Table>




    </>
}