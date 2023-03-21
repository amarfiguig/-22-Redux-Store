import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import { Provider } from "react-redux";
import store from './utils/store';
import Success from "./pages/Success";
import OrderHistory from "./pages/OrderHistory";

const client = new ApolloClient({
  request: (operation) => {
    // Get the token from local storage
    const token = localStorage.getItem('id_token')
    // Set the authorization headers with the token
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql', // Set the URI for the GraphQL server
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Provider store={store}>
            <Nav /> {/* Render the navigation bar */}
            <Switch>
              <Route exact path="/" component={Home} /> {/* Render the home page */}
              <Route exact path="/login" component={Login} /> {/* Render the login page */}
              <Route exact path="/signup" component={Signup} /> {/* Render the signup page */}
              <Route exact path="/success" component={Success} /> {/* Render the success page */}
              <Route exact path="/orderHistory" component={OrderHistory} /> {/* Render the order history page */}
              <Route exact path="/products/:id" component={Detail} /> {/* Render the product detail page */}
              <Route component={NoMatch} /> {/* Render the 404 page */}
            </Switch>
          </Provider>
        </div>
      </Router>
    </ApolloProvider>

  );
}

export default App;
