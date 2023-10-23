import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import Card from '../components/Card'


const SearchContainer=styled.div`
    display:flex;
    flex-wrap:wrap;
    gap:10px;
`

const Search=()=>{
    const query=useLocation().search
    const [videos,setVideos]=useState([])

    useEffect(()=>{
        const fetchVideos = async()=>{
            const res=await axios.get(`/videos/search${query}`)
            setVideos(res.data)
        }
        fetchVideos()
    },[query])

     return (
         <SearchContainer>            
               {videos.map(video=>(
                <Card key={video._id} video={video}/>
               ))}
         </SearchContainer>  
     )
 }

 export default Search