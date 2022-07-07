import {BrowserRouter, Route} from 'react-router-dom';
import {Routes} from 'react-router-dom';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route exact path= '/home' component= {Home}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
