import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './routes/home/home.component';
import NavBar from './routes/navigation/navigation.component';
import NotFound from './routes/not-found/not-found.component';
import Shop from './routes/shop/shop.component';
import Authenticate from './routes/authenticate/authenticate.component';
import { useAuthContext } from './hooks/useAuthContext';
import Checkout from './routes/checkout/checkout.component';

const App = () => {
  const { user, isReady } = useAuthContext();

  //console.log("App render");
    
  return (
    <>
      {!isReady && <div>Checking user status...</div>}
      {isReady && (<Routes>
        <Route path='/' element={<NavBar/>}>
          <Route index element={ user ? <Home/> : <Navigate to="/auth" />} />
          <Route path='shop' element={ user ? <Shop/> : <Navigate to="/auth" />} />
          <Route path='checkout' element={ user ? <Checkout/> : <Navigate to="/auth" />} />
          <Route path='auth' element={ !user ? <Authenticate/> : <Navigate to="/" /> } />
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes> )}           
    </>
  );
}

export default App;
