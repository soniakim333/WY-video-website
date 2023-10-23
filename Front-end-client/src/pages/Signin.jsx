import { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { signinStart,signinSuccess,signinFail } from '../redux/userSlice.js'
import {auth,provider} from '../firebase.js'
import {signInWithPopup} from 'firebase/auth'


const SigninContainer =styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    height:650px;
    color:${({theme})=>theme.titlecolor}
`
const SigninWrapper =styled.div`
    padding:20px 30px;
    display:flex;
    align-items:center;
    flex-direction:column;
    background-color:${({theme})=>theme.wrapperRight};
    gap:10px;
    border-radius:30px;
`
const Title=styled.h1`
    font-size:20px;
    color:${({theme})=>theme.titlecolor};
    margin-bottom:-10px;
`
const TitleSM=styled.h3`
    font-size:16px;
    color:${({theme})=>theme.titlecolor};
`
const Input=styled.input`
    font-size:13px;
    padding:7px 12px;
    border:none;
    border-radius:15px;
    outline:none;
    color:${({theme})=>theme.titlecolor};
`
const Button=styled.button`
    margin-top:10px;
    font-size:14px;
    padding:7px 12px;
    border:none;
    font-weight:700;
    color:${({theme})=>theme.titlecolor};
    background-color:${({theme})=>theme.bgRight};
    cursor:pointer;
`
const More =styled.div`
    margin-top:5px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:15px;
    font-size:12px;
    color:${({theme})=>theme.titlecolor};
`
const Links =styled.div`
    
`
const Link =styled.span`
    margin-right:5px;
`

const Signin = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const dispatch = useDispatch()

    const handleLogin=async(event)=>{
        event.preventDefault()
        
        dispatch(signinStart())

        try {
            const res=await axios.post(`/auth/signin`,{name,password})
            dispatch(signinSuccess(res.data))
        } catch (error) {
           dispatch(signinFail())
        }
    }

    const signinwithGoogle=async ()=>{
        dispatch(signinStart())
        
        signInWithPopup(auth,provider).then((result) => {
            const {displayName,email,photoURL}=result.user
            axios.post('/auth/google',{
                name:displayName,
                email,
                img:photoURL
            }).then((res)=>{
                dispatch(signinSuccess(res.data))
            })
          }).catch((error) => {
            dispatch(signinFail())
          });
        
    }

  return (
   <SigninContainer>
     <SigninWrapper>
        <Title>Sign in</Title>
        <TitleSM>Continue journey on Yun Interview!</TitleSM>

        <Input placeholder='Username' onChange={event=>setName(event.target.value)}></Input>

        <Input type='password' placeholder='Password' onChange={event=>setPassword(event.target.value)}></Input>

        <Input placeholder='Email' onChange={event=>setEmail(event.target.value)}></Input>

        <Button >Sign Up</Button>
        <Button onClick={signinwithGoogle}>Sign in with Google</Button>

        <TitleSM>Already friend of Yun Interview?</TitleSM>
        <Input placeholder='Username' onChange={event=>setName(event.target.value)}></Input>
        <Input type='password' placeholder='Password' onChange={event=>setPassword(event.target.value)}></Input>
        <Button onClick={handleLogin}>Sign in</Button>

     </SigninWrapper>

     <More>
        English(UK)
        <Links>
            <Link>Help</Link>
            <Link>Privasy</Link>
            <Link>Terms</Link>
        </Links>
     </More>
   </SigninContainer>
  )
}

export default Signin
