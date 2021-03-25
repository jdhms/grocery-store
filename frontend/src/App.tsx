import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home, ProductPage } from "./pages";
import { Layout } from "./components";
import { UserContextProvider } from "./context";
import { AuthConfig } from "./config";
import { MsalProvider } from "@azure/msal-react";
import { Configuration, PublicClientApplication } from "@azure/msal-browser";

const msalConfig: Configuration = {
  auth: {
    clientId: AuthConfig.CLIENT_ID,
    authority: `https://login.microsoftonline.com/${AuthConfig.TENANT_ID}`,
    redirectUri: AuthConfig.REDIRECT_URI,
  },
};

const pca = new PublicClientApplication(msalConfig);

const App: React.FC = () => (
  <MsalProvider instance={pca}>
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
  </MsalProvider>
);

export default App;
