import React, { Component } from 'react';
import Loading from './Loading.gif';

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img
          src={Loading}
          alt="loading"
          style={{ width: '30px', height: '30px' }} // Adjust width and height as needed
        />
      </div>
    );
  }
}
