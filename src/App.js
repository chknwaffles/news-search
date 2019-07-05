import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import MainContainer from './containers/MainContainer';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <MainContainer />
      <Footer />
    </div>
  );
}
