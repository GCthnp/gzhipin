import {Switch, Route} from 'react-router-dom'

import Login from "./containers/Login"
import Register from "./containers/Register"
import Main from "./containers/Main"
require("./assets/main.css")

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route component={Main} />
      </Switch>
    </div>
  );
}

export default App;
