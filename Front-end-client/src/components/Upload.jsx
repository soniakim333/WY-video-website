import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import app from '../firebase'
import axios from 'axios'
import { getStorage, ref,getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from 'react-router-dom';


const UploadContainer=styled.div`
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    background-color:#343a40;
    display:flex;
    align-items:center;
    justify-content:center;
`

const Wrapper=styled.div`
    width:650px;
    height:650px;
    background-color:${({theme})=>theme.bgRight};
    color:${({theme})=>theme.titlecolor};
    padding:20px;
    display:flex;
    flex-direction:column;
    gap:20px;
    position:relative;
`
const Label=styled.label`
    font-size:14px;
`

const Close=styled.div`
    position:absolute;
    top:15px;
    right:15px;
    cursor:pointer;
`

const Title=styled.h1`
    text-align:center;
`

const Input=styled.input`
    border:1px solid ${({theme})=>theme.buttonright};
    color:${({theme})=>theme.titlecolor};
    border-radius:5px;
    padding:10px;
    background-color:transparent;
`
const Desc=styled.textarea`
    border:1px solid ${({theme})=>theme.buttonright};
    color:${({theme})=>theme.titlecolor};
    border-radius:5px;
    padding:10px;
    background-color:transparent;
`
const Button=styled.button`
    margin-top:10px;
    padding:8px 6px;
    background:transparent;
    font-size:16px;
    border: 0.5px solid ${({theme})=>theme.buttonright};
    color:${({theme})=>theme.text};
    font-weight:bold;
    cursor:pointer;
`

const Upload = ({setOpen}) => {
    const [img,setImg]=useState(undefined)
    const [video,setVideo]=useState(undefined)

    const [imgPercent,setImgPercent]=useState(0)
    const [videoPercent,setVideoPercent]=useState(0)

    const [inputs,setInputs]=useState({})
    const [tags,setTags]=useState([])

    const navigate=useNavigate()

    const handleChange=(event)=>{
        setInputs(prev=>{
            return {...prev,[event.target.name]:event.target.value}
        })
    }

    const handleTags=(event)=>{
        setTags(event.target.value.split(","))
    }

    const uploadFile=(file,urlType)=>{
        const storage = getStorage(app);
        const fileName=new Date().getTime()+file.name
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                urlType==="imgUrl" ? setImgPercent(Math.round(progress)) : setVideoPercent(Math.round(progress))

                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                        default:
                            break;
                }
            }, 
            (error) => {},
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs(prev=>{
                        return {...prev,[urlType]:downloadURL}
                    })
                });
              }
            )
    }

    useEffect(()=>{
        video && uploadFile(video,"videoUrl")
    },[video])

    useEffect(()=>{
        img && uploadFile(img,"imgUrl")
    },[img])

    const handleUpload=async (e)=>{
        e.preventDefault()
        const res=await axios.post("/videos",{
            ...inputs,tags
        })
        setOpen(false)
        res.status===200 && navigate(`/video/${res.data._id}`)
    }

  return (
    <UploadContainer>
        <Wrapper>
            <Close onClick={()=>setOpen(false)}>X</Close>
            <Title>Upload a New Video</Title>

            <Label>Video</Label>
            {videoPercent > 0 ? ("Uploading: "+ videoPercent + "%"):(<Input 
                type='file' 
                accept='video/*' 
                onChange={event=>setVideo(event.target.files[0])}/>)}

            <Input type='text' 
                    placeholder='Title' 
                    name='title'
                    onChange={handleChange}/>

            <Desc placeholder='Description' 
                rows={8} 
                name='desc'
                onChange={handleChange}/>

            <Input type='text' 
                    placeholder='Seperate the tages with comma.' 
                    onChange={handleTags}/>

            <Label>Image</Label>
                    {imgPercent > 0 ? ("Uploading: "+ imgPercent + "%"):(<Input type='file' 
                    accept='image/*' 
                    onChange={event=>setImg(event.target.files[0])}/>)}

            <Button onClick={handleUpload}>Upload</Button>
        </Wrapper>
    </UploadContainer>
  )
}

export default Upload
