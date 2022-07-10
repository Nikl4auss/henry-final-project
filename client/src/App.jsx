import {BrowserRouter, Route} from 'react-router-dom';
import {Routes} from 'react-router-dom';
import Home from './components/Home/Home';
import ProductDetail from './components/ProductDetail/ProductDetail';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route exact path= '/home' element= {<Home />}/>
      <Route path='/product'>
        <Route path=':id' element= {<ProductDetail />}/>
      </Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
