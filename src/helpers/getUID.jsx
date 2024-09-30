import React from 'react'
import uuid from 'react-uuid';
function getUID() {
    let id = uuid();
  return id;
}

export default getUID;