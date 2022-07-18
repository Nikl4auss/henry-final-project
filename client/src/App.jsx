import {BrowserRouter, Route} from 'react-router-dom';
import {Routes} from 'react-router-dom';
import Home from './components/Home/Home';
import Landing from './components/LandingPage/Landing';
import NavBar from './components/NavBar/NavBar';
import ProductDetail from './components/ProductDetail/ProductDetail';
import NewProduct from './components/Admin/NewProduct';
import Success from './components/Payment/Success';
import Pending from './components/Payment/Pending';
import Failure from './components/Payment/Failure';
// import { ShopingCart } from './components/ShopCart/ShopingCart';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>

        <Route exact path= '/' element= {<Landing />}/>
        <Route path='/' element={<NavBar/>}>
          <Route exact path= '/home' element= {<Home />}/>
          <Route exact path ='/nuevoproducto' element= {<NewProduct />}/>
          {/* <Route exact path = "/carrito" element = {<ShopingCart />} /> */}
          <Route path = '/pago/success' element= {<Success/>}/>
          <Route path = '/pago/failure' element= {<Failure/>}/>
          <Route path = '/pago/pending' element= {<Pending/>}/>
          <Route path='/product'>
            <Route path=':id' element= {<ProductDetail />}/>
    
          </Route>
        </Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
