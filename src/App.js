import React, { useState, useEffect } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import NavBar from './components/NavBar';
import MainContainer from './containers/MainContainer';
import Footer from './components/Footer';
import Form from './components/Form'
import UserPage from './components/UserPage';
import ArrowUpward from '@material-ui/icons/ArrowUpward'

export default function App(props) {
  const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  }

  const [currentUser, setUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [articles, setArticles] = useState([])
  const [result, setResult] = useState(false)

  useEffect(() => {
    
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetch('http://localhost:3000/auto_login', {
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
          setUser(response)
          console.log(response)
        }
      })
    }

    fetch('http://localhost:3000/articles/most_liked')
    .then(r => r.json())
    .then(data => {
      setArticles(data)
    })
  }, [])
  
  const setCurrentUser = (user) => setUser(user)

  const logout = () => {
    setUser(null)
    localStorage.removeItem("token")
  }

  const handleSearchInput = (e) => setSearchTerm(e.target.value)
  const handleSearchSubmit = () => {
    fetch(`http://localhost:3000/articles/search/${searchTerm}`)
    .then(r => r.json())
    .then(allArticles => {
      setArticles(allArticles)
      setSearchTerm('')
      setResult(true)
    })
  }

  const handleFavorite = (article) => {
    fetch(`http://localhost:3000/like/${currentUser.id}/article/${article.id}`)
    .then(r => r.json())
    .then(() => {
        //re render user stuff
        let updatedUser = currentUser
        let targetArticle = updatedUser.articles.find(a => a.id === article.id)

        if (updatedUser.articles.includes(targetArticle)) {
          updatedUser.articles.forEach((a, i) => {
            if (a.id === targetArticle.id) updatedUser.articles.splice(i, 1)
          })
        } else {
          updatedUser.articles.push(article)
        }
        setCurrentUser(updatedUser)
    })
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  return (
    <div className="App">
      <NavBar
        currentUser={currentUser}
        logout={logout}
        searchTerm={searchTerm}
        handleSearchInput={handleSearchInput}
        handleSearchSubmit={handleSearchSubmit}
        {...props}
      />
      
      <Switch>
        <Route exact path="/profile" render={(routerProps) => (currentUser) ? <UserPage handleFavorite={handleFavorite} currentUser={currentUser} {...routerProps}/> : <Redirect to='/' />} />
        <Route exact path="/login" render={(routerProps) => <Form signup={false} setCurrentUser={setCurrentUser} {...routerProps}/>} />
        <Route exact path="/signup" render={(routerProps) => <Form signup={true} setCurrentUser={setCurrentUser} {...routerProps}/>} />
        <Route path='/' render={routerProps => <MainContainer handleFavorite={handleFavorite} searchTerm={searchTerm} currentUser={currentUser} articles={articles} {...routerProps} />} />
      </Switch>

      <Fab onClick={() => scrollToTop()} style={fabStyle}> 
        <ArrowUpward />
      </Fab>
    </div>
  );
}
