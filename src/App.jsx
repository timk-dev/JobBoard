import React, { useState, useEffect } from "react";

import { Route, Routes } from "react-router-dom";
 
import reactLazyWithRetry from '@fatso83/retry-dynamic-import/react-lazy';

const LazyHome = reactLazyWithRetry(() => import("./Components/home"));
const LazySalaries = reactLazyWithRetry(() => import("./Components/salaries"));

function App() {
  const [isLoading, setLoading] = useState(true);

  function someRequest() { //Simulates a request; makes a "promise" that'll run for 2.5 seconds
    return new Promise(resolve => setTimeout(() => resolve(), 2500));
  }

  useEffect(() => {
    window.history.scrollRestoration = "manual";

    someRequest().then(() => {
      const loaderElement = document.querySelector(".loader-container");
      if (loaderElement) {
        loaderElement.remove();
        setLoading(!isLoading);
      }
    });
  }, [])

  if (isLoading) {
    return null;
  }

  return (
    <>

      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
      <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="prefetch stylesheet"/>
      
      <main>
        <Routes>
          <Route path="/" exact="true" element={<LazyHome />} />
          <Route path="/salaries" exact="true" element={<LazySalaries />} />
        </Routes>
      </main>
    </>
  );
}

export default App