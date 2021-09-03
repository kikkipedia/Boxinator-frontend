import './App.css'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Navigation from './components/Navigation'

function App() {

  return (

    
    <BrowserRouter>
      <Navigation/>
      <Switch>
        <Route exact path="/" component={Home}/>
      </Switch>
    </BrowserRouter>      

  )
}

export default App;
