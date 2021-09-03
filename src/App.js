import './App.css'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'

function App() {

  return (
    
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
      </Switch>
    </BrowserRouter>      

  )
}

export default App;
