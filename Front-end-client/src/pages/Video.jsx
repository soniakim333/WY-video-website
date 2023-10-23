import styled from 'styled-components'
import {GoShareAndroid,GoCopilot,GoHeartFill,GoHubot,GoDownload,GoThumbsdown} from 'react-icons/go'
import Comments from '../components/Comments'
import Recommend from '../components/Recommend';

import { useSelector,useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { dislike, fetchSuccess, like } from '../redux/videoSlice';
import Moment from 'react-moment';
import { subscription } from '../redux/userSlice';


const VideoContainer =styled.div`
  padding:20px 50px;
  display:flex;
  gap:35px;
`
const VideoTape=styled.div`
  flex:4;
`
const Videos=styled.div`
  max-height:700px;
  width:100%;
  object-fit:cover;
`
const Title=styled.h2`
  color:${({theme})=>theme.titlecolor};
  margin-bottom:10px;
`
const Details=styled.div`
  display:flex;
  align-items:end;
  justify-content:space-between;
  font-size:13px;
  color:${({theme})=>theme.titlecolor}
`
const Desc=styled.h5`
  font-size:14px;
  font-weight:600;
  color:${({theme})=>theme.titlecolor};
  margin:12px 50px;
`
const DetailsLeft=styled.div`
  display:flex;
  align-items:start;
`
const Infos=styled.span`
  
`
const Icon=styled.img`
  height:30px;
  width:30px;
  border:none;
  border-radius:50%;
  margin-top:20px;
  margin-right:20px; 
`
const TitleHost=styled.h3`
  font-size:16px;
  color:${({theme})=>theme.titlecolor};
  margin-bottom:7px;
`
const Subscribe=styled.button`
  margin-left:30px;
  padding:5px 15px;
  border-radius:10px;
  border:none;
  background-color:${({theme})=>theme.titlecolor};
  color:white;
  margin-top:20px;
`
const Br=styled.br``

const Buttons=styled.div`
  align-items:center;
  display:flex;
  gap:10px;
`
const Button=styled.div`
  align-items:center;
  display:flex;
  gap:3px;
  cursor:pointer;
`
const Hr=styled.hr`
    margin:15px 0;
    border:0.1px solid ${({theme})=>theme.hr};
`


const Video = () => {
  const {currentUser}=useSelector((state)=>state.user)
  const currentVideo=useSelector((state)=>state.video.currentVideo)

  const dispatch=useDispatch()

  const path=useLocation().pathname.split('/')[2]

  const [channel,setChannel]=useState({})
  
  useEffect(()=>{
    const fetchData=async()=>{
      try {
        const videoRes=await axios.get(`/videos/find/${path}`)
        const channelRes=await axios.get(`/users/find/${videoRes.data.userId}`)

        setChannel(channelRes.data)
        dispatch(fetchSuccess(videoRes.data))
      } catch (error) {
      }
    }
    fetchData()
  },[path,dispatch])

  const handleLike=async()=>{
    await axios.put(`/users/like/${currentVideo._id}`)
    dispatch(like(currentUser._id))
  }

  const handleDislike=async()=>{
    await axios.put(`/users/dislike/${currentVideo._id}`)
    dispatch(dislike(currentUser._id))
  }

  const handleSubscribe=async()=>{
    currentUser.subscribedUsers.includes(channel._id)?
    await axios.put(`/users/unsub/${channel._id}`):
    await axios.put(`/users/sub/${channel._id}`)
    dispatch(subscription(channel._id))
  }

  return (
    <VideoContainer>
      <VideoTape>
        <Videos src={currentVideo.videoUrl} controls/>
        <Title>{currentVideo.title}</Title>
        <Details>
          <DetailsLeft>
            <Icon src={channel.img}/>
            <Infos>
              <TitleHost>{channel.name}</TitleHost>
              {currentVideo.views} views - <Moment format="MM.DD.YYYY">
               {currentVideo.createdAt}
            </Moment>
              <Br/>
              {channel.subscribers} Followers
            </Infos>
            <Subscribe onClick={handleSubscribe}>{currentVideo.subscribedUsers?.includes(channel._id)?"SUBSCRIBED":"SUBSCRIBE"}</Subscribe>
          </DetailsLeft>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.likes?.includes(currentUser._id)?(<GoHeartFill/>):(<GoCopilot/>)} {currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo.dislikes?.includes(currentUser._id)?(<GoThumbsdown/>):(<GoHubot/>)} Dislike
            </Button>
            <Button><GoShareAndroid/> Share</Button>
            <Button><GoDownload/>Save</Button>
          </Buttons>
        </Details>
        <Desc>
          Description:<Br/>{currentVideo.desc}</Desc>
        <Hr/>
        <Comments videoId={currentVideo._id}/>
      </VideoTape>
      <Recommend tags={currentVideo.tags}/>
    </VideoContainer>
  )
}

export default Video
