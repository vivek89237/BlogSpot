import React from 'react';
import "./index.scss";
import { Input} from 'antd';
import { RxCrossCircled } from "react-icons/rx";

function SearchUsers({setSearch, input, setInput}) {
  return (
    <div className='search-container'>
        <Input 
            className='search-input'
            name="search"
            placeholder="Search..." 
            onChange={(e) => setInput(e.target.value) } 
            value = {input}
        />
        <div className='cross-btn' >
          <RxCrossCircled size={20} color='#EEEEEE' onClick={()=>{
            setSearch(false);
            setInput("");
          }} />
        </div>
    </div>
  )
}

export default SearchUsers;