import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Navbar />
      <LoadingBar height={3} color='#f11946' progress={progress} />
      <Routes>
        <Route
          path="/"
          element={
            <News
              setProgress={setProgress}
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
            <News
              setProgress={setProgress}
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
            <News
              setProgress={setProgress}
              key="entertainment"
              apiKey="c8feb903a76d475993b0bc379ded400c"
              category="entertainment"
              country="in"
              pageSize={6}
            />
          }
        />
        <Route
          path="/health"
          element={
            <News
              setProgress={setProgress}
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
            <News
              setProgress={setProgress}
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
            <News
              setProgress={setProgress}
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
            <News
              setProgress={setProgress}
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
};

export default App;
