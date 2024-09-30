import React, {useState} from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

function UserCard({user, openUserProfile}){
    const [hover, setHover] = useState(false);
    return(
        <>
            <BasicCard user={user} hover={hover} setHover={setHover} openUserProfile={openUserProfile}  />
        </>
    )
}

const { Meta } = Card;
const BasicCard = ({user, hover, setHover, openUserProfile}) => (
    
  <Card
    style={{
      width: 300,
      background: hover ? "#EEEEEE": "white",
      cursor: "pointer"
    }}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    onClick={()=> {
      console.log("Searchspace");
      openUserProfile(user);
      }
    }
    // cover={
    //   <img
    //     alt="example"
    //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    //   />
    // }
    // actions={[
    // <SettingOutlined key="setting" />,
    //   <EditOutlined key="edit" />,
    //   <EllipsisOutlined key="ellipsis" />,
    // ]}
  >
    <Meta
      avatar={<Avatar src={user.imgURL} />}
      title={user.name}
      description={user.headline}
    />
  </Card>
);

export default UserCard;