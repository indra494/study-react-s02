/* eslint-disable */

import { Button, Navbar, Container, Nav } from 'react-bootstrap'
import {ProductList, ProductDetail} from './routes/Product'
import { useState } from 'react'
import styled from 'styled-components'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import './App.css';
import bg from './img/bg.png';
import data from './data.js'

let YellowBtn = styled.button`
  background : ${ props => props.bg };
  color : black;
  padding : 10px;
`
let Box = styled.div`
  background : ${ props => props.bg == 'blue' ? 'white' : 'black' };
  padding : 20px;
`
let NewBtn = styled.button(YellowBtn);


function App() {
  let [shoes] = useState(data);
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

      <Box><YellowBtn bg="blue" /></Box>
      
      <Routes>
        <Route path='/' element={<ProductList shoes={shoes} />} />        
        <Route path='/detail/:id' element={<ProductDetail shoes={shoes} />} />
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
