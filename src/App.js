import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import MainContainer from './containers/MainContainer';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import UserPage from './components/UserPage';

// class App extends React.Component {

//   componentDidMount(){
//     const token = localStorage.getItem("token")
//     if(token){
//       fetch("http://localhost:3000/auto_login", {
// 				headers: {
// 					"Authorization": token
// 				}
// 			})
// 			.then(response => response.json())
// 			.then(data => {
// 				if (data.errors){
// 					localStorage.removeItem("user_id")
// 					alert(data.errors)
// 				} else {
// 					this.setState({
// 						currentUser: data
// 					})
// 				}
// 			})
//     }
//   }

export default function App(props) {
  const [currentUser, setUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [articles, setArticles] = useState([])

  // useEffect(() => {
  //   const token = localStorage.getItem("token")
  //   if (token) {
  //     fetch("http://localhost:3000/auto_login", {
	// 			headers: {
	// 				"Authorization": token
	// 			}
	// 		})
	// 		.then(response => response.json())
	// 		.then(data => {
	// 			if (data.errors) {
	// 				localStorage.removeItem("user_id")
	// 				alert(data.errors)
	// 			} else {
  //         setUser(data)
	// 			}
	// 		})
  //   }
  // })
  
  const setCurrentUser = (user) => setUser(user)
  const logout = () => {
    setUser(null)
    props.history.push("/login")
    //need to re-render after
  }
    
  const handleSearchInput = (e) => setSearchTerm(e.target.value)
  const handleSearchSubmit = () => {
    fetch(`$http://localhost:3000/articles/search/${searchTerm}`)
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
          <Route exact path="/login" render={(routerProps) => <LoginForm setCurrentUser={setCurrentUser} {...routerProps}/>} />
          <Route exact path="/signup" render={(routerProps) => <SignUpForm setCurrentUser={setCurrentUser} {...routerProps}/>} />
          <Route path='/' render={routerProps => <MainContainer searchTerm={searchTerm} articles={articles} {...routerProps} />} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}
