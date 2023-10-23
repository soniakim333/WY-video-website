import axios from 'axios'
import { useEffect, useState } from 'react'
import { GoCopilot, GoHubot, GoShareAndroid } from 'react-icons/go'
import styled from 'styled-components'

const CommentContainer =styled.div`
  display:flex;
  flex-direction:column;
  margin:10px 0;
`
const CommentContents =styled.div`
  display:flex;
`
const Avatar=styled.img`
    width:25px;
    height:25px;
    border-radius:50%;
    border:none;
`
const Details=styled.div`
    display:flex;
    flex-direction:column;
    font-size:13px;
    color:${({theme})=>theme.titlecolor}
`
const Name=styled.div`
    margin-left:15px;
    font-weight:bold;
`
const Date=styled.span`
    font-size:12px;
    margin-left:5px;
    font-weight:500;

`
const Desc=styled.h5`
    margin-top:10px;
    margin-left:15px;
`
const Buttons=styled.div`
    margin-top:-10px;
  margin-left:45px;
  align-items:center;
  font-size:12px;
  display:flex;
  gap:20px;
`
const Button=styled.div`
  align-items:center;
  display:flex;
  gap:3px;
  cursor:pointer;
`

const Comment = ({comment}) => {
  const [channel,setChannel]=useState({})

  useEffect(()=>{
    const fetchComment=async ()=>{
      const res=await axios.get(`/users/find/${comment.userId}`)
      setChannel(res.data)
    }
    fetchComment()
  },[comment.userId])
  

  return (
    <CommentContainer>
        <CommentContents>
            <Avatar src={channel.img}/>
                <Details>
                    <Name>{channel.name} <Date>11.09.2023</Date></Name>
                    <Desc>{comment.desc}</Desc>
            </Details>
       </CommentContents>
       <Buttons>
            <Button><GoCopilot/> Like</Button>
            <Button><GoHubot/> DisLike</Button>
            <Button><GoShareAndroid/> Share</Button>
       </Buttons>
    </CommentContainer>
  )
}

export default Comment