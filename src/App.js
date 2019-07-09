import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import MainContainer from './containers/MainContainer';
import Footer from './components/Footer';
import Form from './components/Form'
import UserPage from './components/UserPage';

export default function App(props) {
  const [currentUser, setUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [articles, setArticles] = useState([])

  useEffect(() => {
    // fetch('http://localhost:3000/articles')
    // .then(r => r.json())
    // .then(data => {
    //   setArticles(data)
    // })
  }, [])
  
  const setCurrentUser = (user) => setUser(user)

  const logout = () => {
    setUser(null)
  }

  const handleSearchInput = (e) => setSearchTerm(e.target.value)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/articles/search/${searchTerm}`)
    .then(r => r.json())
    .then(allArticles => {
      setArticles(allArticles)
    })
  }

  return (
    <Router>
      <div className="App">
        <NavBar
          currentUser={currentUser}
          logout={logout}
          searchTerm={searchTerm}
          handleSearchInput={handleSearchInput}
          handleSearchSubmit={handleSearchSubmit}
        />
        
        <Switch>
          <Route exact path="/users/:id" component={UserPage} />
          <Route exact path="/login" render={(routerProps) => <Form signup={false} setCurrentUser={setCurrentUser} {...routerProps}/>} />
          <Route exact path="/signup" render={(routerProps) => <Form signup={true} setCurrentUser={setCurrentUser} {...routerProps}/>} />
          <Route path='/' render={routerProps => <MainContainer searchTerm={searchTerm} articles={articles} {...routerProps} />} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}
