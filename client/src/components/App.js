import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Posts from './Posts';
import CreatePost from './CreatePost';
import FullPost from './FullPost';
import store from '../store';
import {
    Navbar,
    NavbarBrand,
    Container,
    Row,
    Col
} from 'reactstrap';


const App = () => 
    <Provider store={store}>
        <Router>
           <div className="app">
               <header>
                   <Navbar className="bg-dark">
                        <Container fluid> 

                            <NavbarBrand href="/">
                                Blog
                            </NavbarBrand>

                        </Container>
                   </Navbar>
               </header>

               <Container fluid>
                   <Row>
                       <Col xs={12}>
                           <Route exact path="/">
                               <Posts />
                               <CreatePost />
                           </Route>
                           <Route path="/post/:id">
                               <FullPost />
                           </Route>
                       </Col>
                   </Row>
               </Container>
           </div>
        </Router>
    </Provider>


export default hot(module)(App);
