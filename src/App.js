
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Landing from "./components/landing/Landing";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <switch>
          <Route path="/" exact component={Landing}></Route>
          {/* <Route path="/shipments" exact component={shipments}></Route>
          <Route path="/adminsettings" exact component={adminsettings}></Route> */}

        </switch>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
