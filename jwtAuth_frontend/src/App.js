import './App.css';
import { Route,Routes } from 'react-router-dom';
import {Login,SignUp} from './components/index';
import { Provider } from 'react-redux';
import {store,persistor} from './redux/store'
import Home from './components/Home';
import Test from './components/Test';
import { PersistGate } from 'redux-persist/lib/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/test' element={<Test/>}/>
        </Routes>
      </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
