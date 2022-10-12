import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Home from './routes/home/home.component';
import NavBar from './routes/navigation/navigation.component';
import NotFound from './routes/not-found/not-found.component';
import Shop from './routes/shop/shop.component';
import Authenticate from './routes/authenticate/authenticate.component';
import Checkout from './routes/checkout/checkout.component';
import { checkUserSession } from './store/user/user.action';
import { useAppSelector } from './hooks/useAppSelector';
import { selectUser } from './store/user/user.selector';

const App = () => {
  const dispatch = useDispatch();
  const { isReady, user }  = useAppSelector(selectUser);

  useEffect(() => {
    // const unsub = onAuthUserStateChanged((user) =>{
    //   dispatch(setCurrentUser(user));
    // });
    // return unsub;

    dispatch(checkUserSession());
  // eslint-disable-next-line    
  },[]); 
    
  return (
    <>
      {!isReady && <div>Checking user status...</div>}
      {isReady && (
        <Routes>
          <Route path='/' element={<NavBar/>}>
            <Route index element={ user ? <Home/> : <Navigate to="/auth" />} />
            <Route path='shop/*' element={ user ? <Shop/> : <Navigate to="/auth" />} />
            <Route path='checkout' element={ user ? <Checkout/> : <Navigate to="/auth" />} />
            <Route path='auth' element={ !user ? <Authenticate/> : <Navigate to="/" /> } />
            <Route path="*" element={<NotFound/>}/>
          </Route>
        </Routes>
      )}           
    </>
  );
}

export default App;
