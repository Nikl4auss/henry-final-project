import {BrowserRouter, Route} from 'react-router-dom';
import {Routes} from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route exact path= '/home' element= {<Home />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
