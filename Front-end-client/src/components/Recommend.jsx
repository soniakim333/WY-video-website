import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'

const RecommendContainer=styled.div`
  flex:1;
`
const Recommend = ({tags}) => {
    const [videos,setVideos]=useState([])
  
  useEffect(()=>{
    const fetchInterview=async()=>{
      try {
        const res=await axios.get(`/videos/tags ? tags=${tags}`)
        setVideos(res.data)
      } catch (error) {
      }
    }
    fetchInterview()
  },[tags])


  return (
    <RecommendContainer>
      {videos.map(video=>(
        <Card type='sm' key={video._id} video={video}/>
      ))}
    </RecommendContainer>
  )
}

export default Recommend
