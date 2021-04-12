import { Table, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import SETTINGS from '../settings'
import { useHistory } from 'react-router-dom'
export default function SubjectsTable() {
    const history = useHistory()
    let [allSubjects, setAllSubjects] = useState([])
    let i = 0;
    useEffect(() => {
        fetch(`${SETTINGS.SERVER_URL_PORT}/subject/list-all`)
            .then(res => res.json())
            .then(subjectsfromDB => {
                console.log("Getting data From Server ", subjectsfromDB.data);
                setAllSubjects(subjectsfromDB.data)
            })
            .catch(err => {
                console.log("Error from getting data From Server ", err);
            })
    }, [])
    function deleteThisSubject(id) {
        if (!localStorage.getItem("user_id")) {
            history.push("/signin", { status: false });
            return;
        }
        fetch(`${SETTINGS.SERVER_URL_PORT}/subject/del-this-subject`, {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })
            .then(success => {
                console.log("Positive response From server ", success)
                if (success.status) {
                    fetch(`${SETTINGS.SERVER_URL_PORT}/subject/list-all`)
                        .then(res => res.json())
                        .then(updatedData => {
                            console.log(updatedData.data)
                            setAllSubjects(updatedData.data)
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
                    <th>Subject  Name</th>
                    <th>Class For that Subject</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {allSubjects.map(subject => <tr> <td> {++i} </td> <td> {subject.subjectName}</td> <td> {subject.classForSubject}</td> <td> <Button className=' btn btn-success'> Edit </Button> </td> <td> <Button className=' btn btn-danger' onClick={() => { deleteThisSubject(subject._id) }}> Delete </Button> </td> </tr>)}
            </tbody>
        </Table>




    </>
}