import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className='main-container'>
        <Container className='py-3'>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/product/:productId' component={ProductScreen} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
