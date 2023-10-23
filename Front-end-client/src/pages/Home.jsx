import styled from 'styled-components'
import Card from '../components/Card'
import { useEffect, useState } from 'react'
import axios from 'axios'

const HomeContainer =styled.div`
  padding:30px 130px;
  display:flex;
  flex-wrap:wrap;
  gap:20px;
`

const Home = ({type}) => {
  const [videos,setVideos]=useState([])

  useEffect(()=>{
    const fetchVideos=async ()=>{
      try {
        const res=await axios.get(`/videos/${type}`)
        setVideos(res.data)
      } catch (error) {
        return error.message;
      }
    }
    fetchVideos()
  },[type])
  return (
    <HomeContainer>
      {
        videos.map(video=>(<Card key={video._id} video={video}/>))
      }
    </HomeContainer>
  )
}

export default Home
