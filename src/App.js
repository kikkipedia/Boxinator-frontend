import './App.css'
import { useEffect, useReducer, useState } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Navigation from './components/Navigation'
import UserMain from './components/User/UserMain'
import AdminMain from './components/Admin/AdminMain'

function App() {


  const [authToken, setAuthToken] = useState(sessionStorage.getItem("authentication"))
  const [userInfo, setUserInfo] = useState()

  //sets user info
  useEffect(() => {
    setUserInfo({
      userName : parseJwt(authToken).preferred_username,
      mail: parseJwt(authToken).email
    })
  },[authToken])

  //parse token
  const parseJwt = (token) => {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
  }

  return (    
    <BrowserRouter>
      <Navigation/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/user" component={UserMain}/>
        <Route path="/admin" component={AdminMain}/>
      </Switch>
    </BrowserRouter>      
  )
}

export default App;
