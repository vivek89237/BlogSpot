import React, {useEffect, useState} from 'react'
import { getUserImage } from '../../../api/FireStoreAPI';
import "./index.scss";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';


const items = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];


function Notif({userId}) {
    const [imgURL, setImage] = useState("");
    useEffect(()=>{
        getUserImage(userId, setImage);
    }, [userId])
  return (
    <div className='notif-container'>
        
    </div>
  )
}

export default Notif;