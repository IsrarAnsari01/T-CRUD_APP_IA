import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap';
import Login from "./pages/login";
import Signin from "./pages/signin";
import Subjects from "./pages/subjects/subjects"
import Student from "./pages/student/student"
import Teacher from './pages/teacher/teacher';
import HomePage from './pages/homePage'
import Addstudent from './pages/student/addstudent'
import Addteacher from './pages/teacher/addteacher'
import EditStudent from './pages/student/editStudent'
import ListBlogs from './pages/blogs/listBlogs'
import AddBlogs from './pages/blogs/addBlog'
import FullBlog from './pages/blogs/fullBlog'
import InformUser from './pages/informUser'
import AddCetagory from './pages/cetagory/addCetagory'
import { useHistory } from 'react-router-dom'
function App() {
  const history = useHistory();

  function removeLocalStorageValue() {
    localStorage.removeItem("user_id")
    history.push("/signin", { status: false })
  }

  return <>
    <BrowserRouter >
      <Navbar bg="dark" variant="dark" expand="lg" className='p-3 '>
        <Navbar.Brand href="/">SMS & YAMBA </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/student">Students</Nav.Link>
            <Nav.Link href="/subjects">Subjects</Nav.Link>
            <Nav.Link href="/teacher">Teachers</Nav.Link>
            <Nav.Link href="/blogs">Blogs</Nav.Link>
            {localStorage.getItem("user_id") ? <></> : <Nav.Link href="/signin"> Sign In </Nav.Link>}
          </Nav>
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          </Form> */}
          {localStorage.getItem("user_id") ? <Button variant="danger" className="mr-sm-2" onClick={removeLocalStorageValue} >Logout</Button> : <></>}
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/login/:verify?">
          <Login />
        </Route>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/subjects">
          <Subjects />
        </Route>
        <Route path="/student">
          <Student />
        </Route>
        <Route path="/teacher">
          <Teacher />
        </Route>
        <Route path="/addstudent/">
          <Addstudent />
        </Route>
        <Route path="/addteacher">
          <Addteacher />
        </Route>
        <Route path="/editStudent/:id" >
          <EditStudent />
        </Route>
        <Route path="/blogs/:id?" >
          <ListBlogs />
        </Route>
        <Route path="/addBlog" >
          <AddBlogs />
        </Route>
        <Route path="/view-full-blog/:id" >
          <FullBlog />
        </Route>
        <Route path="/add-cetagory" >
          <AddCetagory />
        </Route>
        <Route path="/informUser" >
          <InformUser />
        </Route>
      </Switch>
    </BrowserRouter>

  </>
}

export default App;
