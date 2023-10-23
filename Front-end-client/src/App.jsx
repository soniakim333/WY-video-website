import styled, { ThemeProvider }  from 'styled-components'
import { themeBlue,themeGreen } from './utils/Theme.js';
import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Menu from './components/Menu.jsx'
import Navbar from './components/Navbar.jsx'

import Home from './pages/Home.jsx'
import Video from './pages/Video.jsx'
import Signin from './pages/Signin.jsx'
import Search from './pages/Search.jsx'


const Container =styled.div`
  display:flex;
`

const MainContainer=styled.div`
  background-color:${({theme})=>theme.bgRight};
  flex:5;
`
const Wrapper=styled.div`
  margin-top:30px;
`

function App() {
  const [Blue,setBlue]=useState(true)

  return (
    <>
    <ThemeProvider theme={Blue?themeBlue:themeGreen}>
      <Container>
        <BrowserRouter>
          <Menu Blue={Blue} setBlue={setBlue}>
          </Menu>
          <MainContainer>
              <Navbar/>
              <Wrapper>
                <Routes>
                  <Route path="/">
                    <Route index element={<Home type="random"/>} />
                    <Route path='trends' element={<Home type="trend"/>} />
                    <Route path='subscriptions' element={<Home type="sub"/>} />
                    <Route path='search' element={<Search/>} />
                  
                    <Route path='signin' element={<Signin/>} />
                    <Route path="video">
                      <Route path=":id" element={<Video/>} />
                    </Route>
                  </Route>
                </Routes>
              </Wrapper>
          </MainContainer>
        </BrowserRouter>
      </Container>
      </ThemeProvider>
    </>
  )
}

export default App
