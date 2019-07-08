import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import MainContainer from './containers/MainContainer';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'

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


//   setCurrentUser = (user) => {
//     this.setState({
//       currentUser: user
//     })
//   }

//   logout = () => {
//     this.setState({
//       currentUser: null
//     })
//     this.props.history.push("/login")
//   }

//   render(){  
//     return (
//       <div className="App">
//         <NavBar currentUser={this.state.currentUser} logout={this.logout}/>
//         <BrowserRouter>
//           <Switch>
//             <Route path="/users/:id" component={MainContainer} />
//             <Route path="/login" render={(routerProps) => {
//               return <LoginForm setCurrentUser={this.setCurrentUser} {...routerProps}/>
//             }} />
//             <Route path="/signup" render={(routerProps) => {
// 							return <SignUpForm setCurrentUser={this.setCurrentUser} {...routerProps}/>
// 						}} />
//           </Switch>
//         </BrowserRouter>

//         <Footer />
//       </div>
//     );
//   }

const SEARCH_URL = 'http://localhost:3000/articles/search'

export default function App() {
  const [currentUser, setUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token")
     if (token) {
      fetch("http://localhost:3000/auto_login", {
				headers: {
					"Authorization": token
				}
			})
			.then(response => response.json())
			.then(data => {
				if (data.errors){
					localStorage.removeItem("user_id")
					alert(data.errors)
				} else {
          setUser(data)
				}
			})
    }
  })
  
  const setCurrentUser = (user) => setUser(user)
  const logout = () => {
    setUser(null)
    this.props.history.push("/login")
  }
    
  const handleSearchInput = (e) => setSearchTerm(e.target.value)
  const handleSearchSubmit = () => {
    fetch(`${SEARCH_URL}/${searchTerm}`)
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
            <Route exact path="/users/:id" component={MainContainer} />
            <Route exact path="/login" render={(routerProps) => {
              return <LoginForm setCurrentUser={setCurrentUser} {...routerProps}/>
            }} />
            <Route exact path="/signup" render={(routerProps) => {
              return <SignUpForm setCurrentUser={setCurrentUser} {...routerProps}/>
            }} />
            <Route exact path='/' render={routerProps => <MainContainer searchTerm={searchTerm} articles={articles} {...routerProps} />} />
          </Switch>
        
        
        <Footer />
      </div>
    </Router>
  );
}
