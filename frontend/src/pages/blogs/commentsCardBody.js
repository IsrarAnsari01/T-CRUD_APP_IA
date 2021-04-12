import { Card } from 'react-bootstrap'

function CommentsCardBody(props) {
    return <>
        <Card.Body>
            <Card.Text>
                <h6><b> {props.name} </b> <span className='ml-5 pl-5 text-muted'> | {props.CreatedOn}</span></h6>
                <hr />
                <p className=' text-muted ml-5'> {props.comment} </p>
                <hr />
            </Card.Text>
        </Card.Body>

    </>
}

export default CommentsCardBody = CommentsCardBody;