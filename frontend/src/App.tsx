import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages";
import { Layout } from "./components";
import { UserContextProvider } from "./context";

const App: React.FC = () => (
  <UserContextProvider>
    <Layout>
      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Layout>
  </UserContextProvider>
);

export default App;
