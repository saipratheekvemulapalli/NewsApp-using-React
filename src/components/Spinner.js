import React from 'react';
import Loading from './Loading.gif';

const Spinner=()=> {

    return (
      <div className="text-center">
        <img
          src={Loading}
          alt="loading"
          style={{ width: '30px', height: '30px' }} 
        />
      </div>
    );
  
}
export default Spinner
