import './App.css';
import { Route,Routes } from 'react-router-dom';
import {Login,SignUp} from './components/index';
import { Provider } from 'react-redux';
import store from './redux/store'
import Home from './components/Home';

function App() {
  return (
    <Provider store={store}>
      <div className="App bg-red-600">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
