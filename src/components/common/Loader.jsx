import { Space , Spin } from "antd";

function Loader() {
  return (
    <div className='loader'>
        <p>Loading...</p>
        <Space size="middle">
            <Spin size='large' />
        </Space>
    </div>
  )
}

export default Loader;
