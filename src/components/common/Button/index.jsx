import React from 'react';
import './index.scss';


function Button({title, onClick}) {
  return (
    <button className='common-btn' onClick={onClick}>{title}</button>
  )
}

export default Button;