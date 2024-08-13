import React, { Component } from 'react';
import Loading from './Loading.gif';

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img
          src={Loading}
          alt="loading"
          style={{ width: '50px', height: '50px' }} // Adjust width and height as needed
        />
      </div>
    );
  }
}
