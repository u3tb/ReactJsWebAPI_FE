import React, { Component } from 'react';     
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuTop from './components/MenuTop';
import Home from './components/Home';
import Product from './components/Product';
import Category from './components/Category';
import EditProduct from './components/EditProduct';
//#
import SelectedProduct from './components/SelectedProduct';

import { makeStyles } from "@material-ui/core/styles";

// import { Routes } from 'react-router-dom';
// import { Route } from 'react-router';

import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";


// import {
//     BrowserRouter as Router,
//   Routes,
//   Navigate
//   } from "react-router-dom";



// export default class App extends Component {
//     displayName = App.name;
//     render() {
//         return (
//             <React.Fragment>
//                 <CssBaseline />
//                 <MenuTop />
//                 <Container maxWidth="md"> {/* điều hướng Routes... */}
//                     <Route exact path='/' component={Home} />
//                     <Route path='/home' component={Home} />
//                     <Route path='/products' component={Product} />
//                     <Route path='/edit/product/:id' component={EditProduct} />
//                     <Route path='/categories' component={Category} />
//                 </Container>
//                 {/* <Router>
//                     <Routes>  không dùng được Routes
//                         <Route exact path='/' component={Home} />
//                         <Route path='/home' component={Home} />
//                         <Route path='/products' component={Product} />
//                         <Route path='/edit/product/:id' component={EditProduct} />
//                         <Route path='/categories' component={Category} />
//                     </Routes>
//                 </Router> */}
                
//             </React.Fragment>
//         );
//     }
// }


//dùng fuction vẫn ok!
function App() {    
    return (
        <React.Fragment>
        <CssBaseline />
        <MenuTop />
        <Container maxWidth="md">
            <Route exact path='/' component={Home} />
            <Route path='/home' component={Home} />
            <Route path='/products' component={Product} />
            <Route path='/edit/product/:id' component={EditProduct} />
            <Route path='/categories' component={Category} />
            <Route path='/selected-product' component={SelectedProduct} />
        </Container>
      
        {/* <Container>
            <Routes>
                <Route path="/" element={<Home/>}>
                    <Route path="/home" element={<Home/>} />
                    <Route path="/products" element={<Product />} />
                    <Route path="/edit/product/:id" element={<EditProduct />} />
                    <Route path= "/categories" element={<Category />} />
                    <Route path= "/selected-product" element={<SelectedProduct />} />
                </Route>
            </Routes>
        </Container> */}
        
        
    </React.Fragment>
    );
  }   
 export default App;


