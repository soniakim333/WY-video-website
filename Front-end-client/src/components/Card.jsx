import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import Moment from 'react-moment';

const CardContainer =styled.div`
    background-color:${({theme})=>theme.wrapperRight};
    margin-bottom:${(props)=>props.type === "recommend" ? "10px" :"25px"};
    cursor:pointer;
    border-radius:12px;
    width:300px;
    display:${(props)=>props.type === "recommend" && "flex"}
`
const Image =styled.img`
  padding:8px;
  width:${(props)=>props.type === "recommend" ? "150px" :"95%"};
  
`
const Details =styled.div`
    display:flex;
    align-items:start;
    margin:8px 10px;
    gap:15px;  
`
const IconImage =styled.img`
  flex:1;
  width:32px;
  height:32px; 
  border-radius:50%;
  display:${(props)=>props.type === "recommend" && "none"}
`
const Texts =styled.div`
  flex:7
`
const Title =styled.h1`
  font-size:18px;
  line-height:18px;
  font-bold:500;
  color:${({theme})=>theme.buttonright}
`
const Publishername=styled.div`
  font-size:14px;
  font-bold:500;
  color:${({theme})=>theme.buttonright};
  margin-bottom:5px;
`
const Desc=styled.div`
  font-size:14px;
  color:${({theme})=>theme.buttonright};
  margin-bottom:10px;
  display:${(props)=>props.type === "recommend" && "none"}
`
const TimeStamp=styled.div`
  font-size:12px;
  color:${({theme})=>theme.buttonright};
  margin-bottom:5px;
`

const Card = ({type,video}) => {
  const [channel, setChannel]=useState({})
  
  useEffect(()=>{
    const fetchChannel=async()=>{
      const res=await axios.get(`/users/find/${video.userId}`)
      setChannel(res.data)
    }
    fetchChannel()
  },[video.userId])
  
  return (
    <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
    <CardContainer type={type}>
      <Image type={type} src={video.imgUrl}/>
      <Details>
        <IconImage type={type} src={channel.img}></IconImage>
        <Texts>
          <Title>{video.title}</Title>
          <Publishername>{channel.name}</Publishername>
          <Desc type={type}>{video.desc}</Desc>
          <TimeStamp>{video.views} views - <Moment format="MM.DD.YYYY">
               {video.createdAt}
            </Moment>
          </TimeStamp>
        </Texts>
      </Details>
    </CardContainer>
    </Link>
  )
}

export default Card
