import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";
import UpdateUser from "./pages/UpdateUser";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/create" exact component={CreateUser} />
        <Route path="/update/:id" exact component={UpdateUser} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
