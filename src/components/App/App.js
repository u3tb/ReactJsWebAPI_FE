//import logo from './logo.svg';
//import './App.css';

//function App() {
//  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.js</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//      </header>
//    </div>
//  );
//}

//export default App;


import React, { Component } from 'react';
import { Route } from 'react-router';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuTop from './components/MenuTop';
import Home from './components/Home';
import Product from './components/Product';
import Category from './components/Category';
import EditProduct from './components/EditProduct';
// export default class App extends Component {
//     displayName = App.name;
//     render() {
//         return (
//             <React.Fragment>
//                 <CssBaseline />
//                 <MenuTop />
//                 <Container maxWidth="md">
//                     <Route exact path='/' component={Home} />
//                     <Route path='/home' component={Home} />
//                     <Route path='/products' component={Product} />
//                     <Route path='/edit/product/:id' component={EditProduct} />
//                     <Route path='/categories' component={Category} />
//                 </Container>
//             </React.Fragment>
//         );
//     }
// }
/////
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
        </Container>
    </React.Fragment>
    );
  }
   
  export default App;


