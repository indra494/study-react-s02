import { Button, Navbar, Container, Nav } from 'react-bootstrap'
import {ProductList, ProductDetail} from './routes/Product'
import './App.css';
import bg from './img/bg.png';

import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'

function App() {

  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home"><Link to="/">Home</Link></Nav.Link>
            <Nav.Link href="#features" onClick={()=> { navigate('/detail') }} >Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg" style={{ backgroundImage : 'URL(' + bg + ')' }}></div>

      <Routes>
        <Route path='/' element={<ProductList />} />        
        <Route path='/detail' element={<ProductDetail />} />
        <Route path="/about" element={<About />} >
          { /* nasted routes ex) /about/member, /about/location */}
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치정보</div>} />          
        </Route>
        <Route path="*" element={<div>404페이지입니다</div>} />
      </Routes>

    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보입니다</h4>
      <Outlet></Outlet>
    </div>
  )
}


export default App;
