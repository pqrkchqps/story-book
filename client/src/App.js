import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Stories from "./components/Stories";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Stories} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
