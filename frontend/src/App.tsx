import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, ProductPage } from "./pages";
import { Layout } from "./components";
import { UserContextProvider } from "./context";

const App: React.FC = () => (
  <UserContextProvider>
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/category/:category" component={Home} />
          <Route exact path="/product/:productId" component={ProductPage} />
        </Switch>
      </Layout>
    </Router>
  </UserContextProvider>
);

export default App;
