import styled from 'styled-components'
import saying from '../img/saying.png'
import { GoSmiley,GoVideo} from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
import { useState } from 'react';
import Upload from './Upload';

const NavbarContainer=styled.div`
    position:sticky;
    height:160px;
    top:0px;
`
const NavbarWrapper=styled.div`
    display:flex;
    justify-content:flex-end;
    position:relative;
    background-color:${({theme})=>theme.wrapperRight};
    height:100%;
    padding:10px 10px;
    margin:10px 10px;
    border: none;
    border-radius: 15px;
    
`
const Saying=styled.img`
    height:100px;
`
const Search=styled.div`
    position:absolute;
    display:flex;
    align-items:center;
    justify-content:space-between;
    width:40%;
    top:130px;
    left:35px;
    right:400px;
    margin:auto;
    padding:1px;
    border:0.1px solid ${({theme})=>theme.buttonright};
    border-radius:10px;
`
const User=styled.div`
    border: 0.5px solid ${({theme})=>theme.buttonright};
    margin-top:120px;
    margin-right:30px;
    display:flex;
    align-items:center;
    gap:8px;
    font-weight:bold;
    font-size:16px;
    cursor:pointer;
    padding:8px 10px;
    color:${({theme})=>theme.titlecolor}
`
const Avatar=styled.img`
    width:20px;
    height:20px;
    /* background-color:${({theme})=>theme.titlecolor}; */
    border-radius:50%;
`
const Input=styled.input`
    border:none;
    background-color:transparent;
    padding:0 8px;
    height:20px;
    outline:none;
    font-size:14px;
    color:${({theme})=>theme.buttonright}
`
const Navbarbutton=styled.button`
    padding:8px 6px;
    background:transparent;
    font-size:16px;
    border: none;
    color:${({theme})=>theme.buttonright};
    font-weight:bold;
    cursor:pointer;
    border-radius:10px;
`
const Loginbutton=styled.button`
    display:flex;
    gap:5px;
    align-items:center;
    margin-top:120px;
    margin-right:30px;
    padding:8px 6px;
    background:transparent;
    font-size:16px;
    border: 0.5px solid ${({theme})=>theme.buttonright};
    color:${({theme})=>theme.buttonright};
    font-weight:bold;
    cursor:pointer;
`
const Icon=styled.div`
    color:${({theme})=>theme.icon};
`

const Navbar=()=>{
   const {currentUser}=useSelector(state=>state.user) 
  
   const [open,setOpen]=useState(false)
   const [query,setQuery] =useState("")

   const navigate=useNavigate()
    return (
        <>
        <NavbarContainer>            
            <NavbarWrapper>
                <Saying src={saying}></Saying>
                <Search>
                    <Input placeholder="Search the videos" 
                           onChange={e=>setQuery(e.target.value)}>
                    </Input>
                    
                    <Navbarbutton onClick={()=>navigate(`/search?query=${query}`)}>Search</Navbarbutton>
                </Search>

                {currentUser?
                    (<User>
                            <GoVideo onClick={()=>setOpen(true)}/>
                            <Avatar src={currentUser.img}/>
                            {currentUser.name}
                    </User>)
                :(<Link to="signin" style={{textDecoration:"none"}}>
                    <Loginbutton> 
                        <Icon>
                        <GoSmiley />
                        </Icon>
                    Sign in</Loginbutton>
                </Link>)}
            </NavbarWrapper>   
        </NavbarContainer>
        {open&&<Upload setOpen={setOpen}/>}
        </>
    )
}

export default Navbar