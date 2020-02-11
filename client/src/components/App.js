import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import '../styles/App';
import '../styles/Navbar';
import CustomNavbar from './CustomNavbar';
import Posts from './Posts';
import FullPost from './FullPost';
import store from '../store';
import {
    Container,
    Row,
    Col
} from 'reactstrap';


const App = () => 
    <Provider store={store}>
        <Router>
           <div className="app">
               <CustomNavbar />
               <Container fluid>
                   <hr />
                   <Row>
                       <Col xs={12}>
                           <Route exact path="/">
                               <Posts />
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
