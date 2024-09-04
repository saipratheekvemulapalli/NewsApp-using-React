import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {


  state={
    progress:0
  }
  setProgress(progress){
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
          {/* Define routes for different categories */}
          <Route
            path="/"
            element={
              <News setProgress={this.setProgress}
                key="general"
                apiKey="c8feb903a76d475993b0bc379ded400c"
                category="general"
                country="in"
                pageSize={6}
              />
            }
          />
          <Route
            path="/business"
            element={
              <News setProgress={this.setProgress}
                key="business"
                apiKey="c8feb903a76d475993b0bc379ded400c"
                category="business"
                country="in"
                pageSize={6}
              />
            }
          />
          <Route
            path="/entertainment"
            element={
              <News setProgress={this.setProgress}
                key="entertainment"
                apiKey="c8feb903a76d475993b0bc379ded400c"
                category="entertainment"
                country="in"
                pageSize={6}
              />
            }
          />
          {/* <Route path="/general" element={<News setProgress={setProgress} key="general" apiKey="c8feb903a76d475993b0bc379ded400c" category="general" country="in" pageSize={6} />} /> */}
          <Route
            path="/health"
            element={
              <News setProgress={this.setProgress}
                key="health"
                apiKey="c8feb903a76d475993b0bc379ded400c"
                category="health"
                country="in"
                pageSize={6}
              />
            }
          />
          <Route
            path="/science"
            element={
              <News setProgress={this.setProgress}
                key="science"
                apiKey="c8feb903a76d475993b0bc379ded400c"
                category="science"
                country="in"
                pageSize={6}
              />
            }
          />
          <Route
            path="/sports"
            element={
              <News setProgress={this.setProgress}
                key="sports"
                apiKey="c8feb903a76d475993b0bc379ded400c"
                category="sports"
                country="in"
                pageSize={6}
              />
            }
          />
          <Route
            path="/technology"
            element={
              <News setProgress={this.setProgress}
                key="technology"
                apiKey="c8feb903a76d475993b0bc379ded400c"
                category="technology"
                country="in"
                pageSize={6}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}
