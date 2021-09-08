import './App.css'
import { useState, useEffect } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Home from './components/home/Home'
import Start from './components/start/Start'
import Navigation from './components/shared/Navigation'
import UserMain from './components/user/UserMain'
import AdminMain from './components/admin/AdminMain'

function App() {

  const [authToken, setAuthToken] = useState()

  //sets user info
  useEffect(() => {
      (async() => {
        setAuthToken(sessionStorage.getItem("authentication"))
      }    
      )()
      //console.log(authToken + " IN APP.JS")
  },[authToken])

  return (    
    <BrowserRouter>
      <Navigation/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/start" component={Start}/>
        <Route path="/user" component={UserMain}/>
        <Route path="/admin" component={AdminMain}/>

      </Switch>
    </BrowserRouter>      
  )
}

export default App;
