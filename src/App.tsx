import { Route, Routes } from 'react-router-dom';
import Home from './routes/home/home.component';
import NavBar from './routes/navigation/navigation.component';
import NotFound from './routes/not-found/not-found.component';
import Shop from './routes/shop/shop.component';
import Authenticate from './routes/authenticate/authenticate.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<NavBar/>}>
        <Route index element={<Home/>} />
        <Route path='shop' element={<Shop/>} />
        <Route path='auth' element={<Authenticate/>} />
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>            
  );
}

export default App;
