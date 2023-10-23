import styled from 'styled-components'
import Comment from './Comment'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
const CommentsContainer =styled.div`
  margin-top:30px;
`

const NewContainer =styled.div`
  display:flex;
  gap:15px;
`

const Avatar=styled.img`
    width:25px;
    height:25px;
    border-radius:50%;
    border:none;
`

const Input=styled.input`
   background:transparent;
   border:none;
   width:100%;
   outline:none;
   border-bottom:1px solid ${({theme})=>theme.titlecolor}
`


const Comments = ({videoId}) => {
  const {currentUser}=useSelector((state)=>state.user)
  const [comments,setComments]=useState([])

  useEffect(()=>{
    const fetchComments=async()=>{
      try {
        const res=await axios.get(`/comments/${videoId}`)
        setComments(res.data)
      } catch (error) {
      }
    }
    fetchComments()
  },[videoId])
  

  return (
    <CommentsContainer>
        <NewContainer>
            <Avatar src={currentUser.img}/>
            <Input placeholder='Please write a warm comment for this exerllent video!'></Input>
        </NewContainer>

        {comments.map(comment=>(
          <Comment key={comment._id} comment={comment}/>
        ))}
    </CommentsContainer>
    
  )
}

export default Comments
