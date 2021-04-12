import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter  className="font-small pt-4 mt-4 bg-dark text-light">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title" className='text-center'>Student Management System </h5>
            <p className='text-center'>
              Admin : Israr Ansari <br /> Operator: Syed Arfeen <br /> Manager: Md. Hassan

            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title text-center">Links</h5>
            <ul className ='text-center'>
              <li className="list-unstyled ">
                <a href="/"  className ='text-light'> Home </a>
              </li>
              <li className="list-unstyled">
                <a href="/student" className =' text-light'>Students</a>
              </li>
              <li className="list-unstyled">
                <a href="/subjects" className =' text-light'>Subjects</a>
              </li>
              <li className="list-unstyled">
                <a href="/teacher" className =' text-light'>Teachers </a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="#" className =' text-light'> IA.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;