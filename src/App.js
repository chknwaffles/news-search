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

  // useEffect(() => {
    // fetch('http://localhost:3000/articles')
    // .then(r => r.json())
    // .then(data => {
    //   setArticles(data)
    // })
  // }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetch("http://localhost:3000/auto_login", {
        headers: {
          "Authorization": token
        }
      })
      .then(res => res.json())
      .then(response => {
        if (response.errors){
          localStorage.removeItem("user_id")
          alert(response.errors)
        } else {
          setCurrentUser(response)
          console.log(response)
        }
      })
    }
  }, [])
  
  const setCurrentUser = (user) => setUser(user)

  const logout = () => {
    setUser(null)
    localStorage.removeItem("token")
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

  const handleLiked = (article) => {
    fetch(`http://localhost:3000/like/${currentUser.id}/article/${article.id}`)
    .then(r => r.json())
    .then(data => {
        //re render user stuff
        let updatedUser = currentUser
        updatedUser.articles.push(article)
        setCurrentUser(updatedUser)
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
          <Route exact path="/profile" render={(routerProps) => <UserPage currentUser={currentUser} {...routerProps}/>} />
          <Route exact path="/login" render={(routerProps) => <Form signup={false} setCurrentUser={setCurrentUser} {...routerProps}/>} />
          <Route exact path="/signup" render={(routerProps) => <Form signup={true} setCurrentUser={setCurrentUser} {...routerProps}/>} />
          <Route path='/' render={routerProps => <MainContainer handleLiked={handleLiked} searchTerm={searchTerm} currentUser={currentUser} articles={articles} {...routerProps} />} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}
