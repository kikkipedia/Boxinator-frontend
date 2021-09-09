
import './App.css'
import { useState, useEffect } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Home from './components/home/Home'
import Start from './components/start/Start'
import Navigation from './components/shared/Navigation'
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
        <Route exact path="/start" component={Start}/>
        <Route path="/user" component={UserMain}/>
        <Route path="/admin" component={AdminMain}/>
          {/* <Route path="/shipments" exact component={shipments}></Route>
          <Route path="/adminsettings" exact component={adminsettings}></Route> */}

      </Switch>
    </BrowserRouter>      
  )
}

export default App;
