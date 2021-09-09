import './App.css'
import { useState, useEffect } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Navigation from './components/Navigation'
import UserMain from './components/User/UserMain'
import AdminMain from './components/Admin/AdminMain'

function App() {

  const [authToken, setAuthToken] = useState()

  //sets user info
  useEffect(() => {
      (async() => {
        setAuthToken(sessionStorage.getItem("authentication"))
      }    
      )()
  },[authToken])

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
