import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import './App.css';
import CartScreen from './screens/CartScreen';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className='main-container'>
        <Container className='py-3'>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/product/:productId' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
