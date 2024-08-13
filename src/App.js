import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { Route, Routes } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Routes>
          {/* Define routes for different categories */}
          <Route path="/" element={<News key="general" apiKey="c8feb903a76d475993b0bc379ded400c" category="general" country="in" pageSize={6} />} />
          <Route path="/business" element={<News key="business" apiKey="c8feb903a76d475993b0bc379ded400c" category="business" country="in" pageSize={6} />} />
          <Route path="/entertainment" element={<News key="entertainment" apiKey="c8feb903a76d475993b0bc379ded400c" category="entertainment" country="in" pageSize={6} />} />
          {/* <Route path="/general" element={<News key="general" apiKey="c8feb903a76d475993b0bc379ded400c" category="general" country="in" pageSize={6} />} /> */}
          <Route path="/health" element={<News key="health" apiKey="c8feb903a76d475993b0bc379ded400c" category="health" country="in" pageSize={6} />} />
          <Route path="/science" element={<News key="science" apiKey="c8feb903a76d475993b0bc379ded400c" category="science" country="in" pageSize={6} />} />
          <Route path="/sports" element={<News key="sports" apiKey="c8feb903a76d475993b0bc379ded400c" category="sports" country="in" pageSize={6} />} />
          <Route path="/technology" element={<News key="technology" apiKey="c8feb903a76d475993b0bc379ded400c" category="technology" country="in" pageSize={6} />} />
        </Routes>
      </div>
    );
  }
}
