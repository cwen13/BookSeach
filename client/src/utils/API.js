import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SavedBooks from "./pages/SavedBooks";
import SeachBooks from "./pages/SearchBooks"; 

import LoginForm from "./components/LoginForm";
import Navbar from "./componentes/Navbar";
import SignupForm from "./components/SignupForm";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
              <Route 
                path="/me" 
                element={<User />} 
              />
              <Route 
                path="" 
                element={<User />} 
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;





//// route to get logged in user's info (needs the token)
//export const getMe = (token) => {
//  return fetch('/api/users/me', {
//    headers: {
//      'Content-Type': 'application/json',
//      authorization: `Bearer ${token}`,
//    },
//  });
//};
//
//export const createUser = (userData) => {
//  return fetch('/api/users', {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json',
//    },
//    body: JSON.stringify(userData),
//  });
//};
//
//export const loginUser = (userData) => {
//  return fetch('/api/users/login', {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json',
//    },
//    body: JSON.stringify(userData),
//  });
//};
//
//// save book data for a logged in user
//export const saveBook = (bookData, token) => {
//  return fetch('/api/users', {
//    method: 'PUT',
//    headers: {
//      'Content-Type': 'application/json',
//      authorization: `Bearer ${token}`,
//    },
//    body: JSON.stringify(bookData),
//  });
//};
//
//// remove saved book data for a logged in user
//export const deleteBook = (bookId, token) => {
//  return fetch(`/api/users/books/${bookId}`, {
//    method: 'DELETE',
//    headers: {
//      authorization: `Bearer ${token}`,
//    },
//  });
//};
//
//// make a search to google books api
//// https://www.googleapis.com/books/v1/volumes?q=harry+potter


export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
