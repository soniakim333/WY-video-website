import styled from 'styled-components'
import Yun from '../img/logo.png'
import { GoHome,GoCodescan,GoRepoPush,GoArchive,GoChecklist,GoGlobe,GoBook,GoEye,GoPulse,GoPeople,GoFlame,GoGear,GoInfinity, GoThumbsdown,GoHeart,GoSun} from "react-icons/go";
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { logout} from '../redux/userSlice'


const MenuContainer =styled.div`
  flex:1;
  background-color:${({theme})=>theme.bgLeft};
  color:${({theme})=>theme.text};
  height:100vh;
  position:sticky;
  top:0;
`
const Wrapper=styled.div`
  padding:20px 30px;
`
const Weblogo=styled.img`
    height:25px;
    margin-bottom:25px;
`
const Selection=styled.div`
    font-size:16px;
    display:flex;
    align-items:center;
    gap:15px;
    cursor:pointer;
    padding:8px 0;

    &:hover{
      background-color:${({theme})=>theme.bghover};
    }
`
const Icon=styled.div`
    color:${({theme})=>theme.icon};
`
const Hr=styled.hr`
    margin:15px 0;
    border:0.1px solid ${({theme})=>theme.hr};
`
const Login=styled.div`
    font-size:14px;
`
const Loginbutton=styled.button`
    margin-top:10px;
    padding:8px 6px;
    background:transparent;
    font-size:16px;
    border: 0.5px solid ${({theme})=>theme.buttonleft};
    color:${({theme})=>theme.text};
    font-weight:bold;
    cursor:pointer;
`

const Menu = ({Blue,setBlue}) => {
  const {currentUser}=useSelector(state=>state.user) 
  const dispatch = useDispatch()

  const handleLougout=(event)=>{
    event.preventDefault()
        try {
            dispatch(logout())
        } catch (error) {

        }
  }
 
  return (
    <MenuContainer>
      <Wrapper>
      <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
          <Weblogo src={Yun}/></Link>
          <Selection>
            <Icon>
                <GoHome />
            </Icon>
                Home
          </Selection>

          <Link to="trends" style={{textDecoration:"none",color:"inherit"}}>
            <Selection>
              <Icon>
                  <GoCodescan />
              </Icon>
                  Explore
            </Selection>
          </Link>

          <Link to="subscriptions" style={{textDecoration:"none",color:"inherit"}}>
            <Selection>
              <Icon>
                  <GoRepoPush />
              </Icon>
                  Subscription
            </Selection>
          </Link>
          <Hr/>


          <Selection>
            <Icon>
                <GoChecklist />
            </Icon>
                Library
          </Selection>

          <Selection>
            <Icon>
                <GoArchive />
            </Icon>
                History
          </Selection>
          <Hr/>

          <Selection>
            <Icon>
                <GoGlobe />
            </Icon>
                Culture
          </Selection>
          <Selection>
            <Icon>
                <GoBook />
            </Icon>
                Study
          </Selection>
          <Selection>
            <Icon>
                <GoEye />
            </Icon>
                Policy
          </Selection>
          <Selection>
            <Icon>
                <GoPulse />
            </Icon>
                Economy
          </Selection>
          <Selection>
            <Icon>
                <GoPeople />
            </Icon>
                Friend
          </Selection>
          <Selection>
            <Icon>
                <GoFlame />
            </Icon>
                Sport
          </Selection>
          <Selection>
            <Icon>
                <GoInfinity />
            </Icon>
                Music
          </Selection>
          <Hr/>


          <Selection>
            <Icon>
                <GoGear />
            </Icon>
                Settings
          </Selection>
          <Selection>
            <Icon>
                <GoThumbsdown />
            </Icon>
                Report
          </Selection>
          <Selection>
            <Icon>
                <GoHeart />
            </Icon>
                Help
          </Selection>
          <Selection onClick={()=>setBlue(!Blue)}>
            <Icon>
                <GoSun />
            </Icon>
                {Blue?"Green Mode":"Blue Mode"}
          </Selection>
            <Hr/>

          {!currentUser&&
          <><Login>
            Sign in to view the interesting interviews.
          </Login>
            <Link to="signin" style={{textDecoration:"none"}}>
              <Loginbutton>
                Sign In
              </Loginbutton>
            </Link></>}

          {currentUser&&
          <>
            <Link to="signin" style={{textDecoration:"none"}}>
              <Loginbutton onClick={handleLougout}>
                Log out
              </Loginbutton>
            </Link></>}
          
      </Wrapper>
    </MenuContainer>
  )
}

export default Menu
