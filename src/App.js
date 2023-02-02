// require('dotenv').config()
// import 'dotenv'
import "./App.css";
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
export default   function App(){
  const pageSize = 15;
  const country = "in";
  const apiKey = `1d29df2bdaf844409d81049b9945ac5a`;
  // apiKey='0838bb93647145338dfa7913f0b0437a'
  const [progress, setProgress] = useState(0)
    return (
      <div>
        <Router>
          <LoadingBar
            height={2}
            color="#f11946"
            progress={progress}
          />
          <NavBar />
          <div>
            <Routes>
              <Route
                exact
                path="/TheNewsG"
                element={
                  <News
                    setProgress={setProgress}
                    apiKey={apiKey}
                    key="general"
                    pageSize={pageSize}
                    country={country}
                    category="general"
                  />
                }
              />
              <Route
                exact
                path="/"
                element={
                  <News
                    setProgress={setProgress}
                    apiKey={apiKey}
                    key="general"
                    pageSize={pageSize}
                    country={country}
                    category="general"
                  />
                }
              />
              <Route
                exact
                path="/business"
                element={
                  <News
                    setProgress={setProgress}
                    apiKey={apiKey}
                    key="business"
                    pageSize={pageSize}
                    country={country}
                    category="business"
                  />
                }
              />
              <Route
                exact
                path="/entertainment"
                element={
                  <News
                    setProgress={setProgress}
                    apiKey={apiKey}
                    key="entertainment"
                    pageSize={pageSize}
                    country={country}
                    category="entertainment"
                  />
                }
              />
              <Route
                exact
                path="/health"
                element={
                  <News
                    setProgress={setProgress}
                    apiKey={apiKey}
                    key="health"
                    pageSize={pageSize}
                    country={country}
                    category="health"
                  />
                }
              />
              <Route
                exact
                path="/science"
                element={
                  <News
                    setProgress={setProgress}
                    apiKey={apiKey}
                    key="science"
                    pageSize={pageSize}
                    country={country}
                    category="science"
                  />
                }
              />
              <Route
                exact
                path="/sports"
                element={
                  <News
                    setProgress={setProgress}
                    apiKey={apiKey}
                    key="sports"
                    pageSize={pageSize}
                    country={country}
                    category="sports"
                  />
                }
              />
              <Route
                exact
                path="/technology"
                element={
                  <News
                    setProgress={setProgress}
                    apiKey={apiKey}
                    key="technology"
                    pageSize={pageSize}
                    country={country}
                    category="technology"
                  />
                }
              />
            </Routes>
          </div>
        </Router>
      </div>
    );
}
