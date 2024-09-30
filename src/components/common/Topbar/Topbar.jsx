import './topbar.scss';
import '../../../index.scss';
import linkedLogo from '../../../assets/linkedLogo.png';
import {useState, useEffect} from "react";
import { 
  AiOutlineHome, 
  AiOutlineUserSwitch,
  AiOutlineBell
 } from "react-icons/ai";
import { BsBriefcase } from 'react-icons/bs';
import { FaSearch, FaRegUser } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import {useNavigate} from 'react-router-dom';
import Profile from "../ProfilePopup/Index.jsx";
import SearchUsers from '../Search/index.jsx';
import { getAllUsers } from '../../../api/FireStoreAPI.jsx';
import UserCard from "../../UserCardComponent.jsx";
import {Badge} from 'antd';
import { Dropdown, Space } from 'antd';
import { getNotif } from '../../../api/FireStoreAPI.jsx';
import getUID from "../../../helpers/getUID.jsx"

function Topbar({currentUser}) {
  const [show, setShow] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [input, setInput] = useState("");
  const [users, setAllUsers] = useState([]);
  const [searchResults, setResults ] = useState([]);
  const [notif, setNotif] = useState([]);

  let navigate = useNavigate();
  const goToRoute = (route) =>{
    navigate(route);
  }

  const items = notif.map((item)=>{
    return {label:item?.likedUserName +" "+ item?.type, key:getUID()}
  })
  //console.log(items);
  const handleSearch=()=>{
    if(input!==""){
      let res = users.filter((user)=>{
        return Object.values(user).join('').toLowerCase().includes(input.toLowerCase())
      })
      setResults(res);
    }else{
      setResults(users);
    }
   
  }

  const openUserProfile = (user) =>{
    navigate('/profile', 
     {state:
      {
      id: user.userID,
      email: user.email
     },
    }
    )
  }

  useEffect(()=>{
    let debounced = setTimeout(()=>{
      handleSearch()
    }, 1000)
    return ()=> clearTimeout(debounced);
  }, [input]);

  useEffect(()=>{
    getAllUsers(setAllUsers);
  }, []);

  useEffect(()=>{
    getNotif(currentUser.userID, setNotif);
  }, [currentUser])
  //console.log(notif)
  return (
    <>
    <div className='topbar-main'>
      <img className='linkedlogo' src={linkedLogo} alt="linkedinlogo" />
      <div className='topbar-items'>
        {!isSearch ? <FaSearch size = {30} className='react-icons' onClick={()=>setSearch(!isSearch)} /> : <SearchUsers setSearch={setSearch} input={input} setInput={setInput} />}
        {!isSearch && 
        <>
          <AiOutlineHome size= {30} className='react-icons' onClick ={() => goToRoute('/')} />
          <AiOutlineUserSwitch size = {30} className='react-icons' onClick ={() => goToRoute('/connections')}/>
          <BsBriefcase size = {30} className='react-icons'  />
          <MdOutlineMessage size = {30} className='react-icons' />
          <Badge count={items.length} overflowCount={10}>
              <Dropdown
                menu={{
                  items,
                }}
                trigger={['click']}
              >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <AiOutlineBell size = {30} className='react-icons'  />
                    </Space>
                  </a>
                </Dropdown>
            </Badge>
        </>}
      </div>
      {show && <Profile show={show} setShow={setShow} />}
        <img className='user-logo' src={currentUser?.imgURL} alt="user-pfrofile-logo" onClick={() => setShow(!show)} />
    </div>
    {input.length>0 && <div className='user-search'>
      {searchResults.length==0 ? <><div className='nouser'>No User Found !</div></> : 
        searchResults.map((user)=>{
          return (
              <UserCard key={user.id} user={user} openUserProfile={openUserProfile} />
          )
        })}
    </div>}
    </>
  )
}

export default Topbar;