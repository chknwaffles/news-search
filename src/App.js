import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import MainContainer from './containers/MainContainer';
import Footer from './components/Footer';

const SEARCH_URL = 'http://localhost:3000/articles/search'

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [articles, setArticles] = useState([])

  const handleSearchInput = (e) => setSearchTerm(e.target.value)

  const handleSearchSubmit = () => {
    fetch(`${SEARCH_URL}/${searchTerm}`)
    .then(r => r.json())
    .then(allArticles => {
      setArticles(allArticles)
    })
  }

  return (
    <div className="App">
      <NavBar searchTerm={searchTerm} handleSearchInput={handleSearchInput} handleSearchSubmit={handleSearchSubmit}/>
      <MainContainer searchTerm={searchTerm} articles={articles}/>
      <Footer />
    </div>
  );
}
