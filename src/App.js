import './App.css';
import Signup from './Pages/Auth/Signup/Signup'
import NavbarComponent from './Components/Navbar'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from './Pages/Auth/Signin/Signin'
import Main from './Pages/Main/Main'

function App() {
  return (
    <Router>
      <div id="Content">
      <NavbarComponent/>
        <Switch>
        <Route path={["/signup","/"]}  exact component={Signup}/>
        <Route path="/signin" exact component={Signin}/>
        <Route path="/main" exact component={Main}/>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
