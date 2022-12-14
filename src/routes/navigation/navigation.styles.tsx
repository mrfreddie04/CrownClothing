import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Navigation = styled.nav`
  height: 4.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 2.5rem;
  margin-bottom: 1.5rem;
  position: fixed;
  z-index: 10;
  background-color: white;
`

export const Logo = styled(Link)`
  height: 100%;
  width: 4.5rem;
  padding: 1rem; 
  display: flex;
  justify-content: center;
`
export const NavLinks = styled.div`
  width: 50%;
  height: 100%;    
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
export const NavLink= styled(Link)`
  padding: 0.5rem 1rem;
  cursor: pointer;
`
export const MainContent= styled.div`
  padding: 6rem 2.5rem 0 2.5rem;
`

// .navigation {

//   & .logo-container {
    // height: 100%;
    // width: 4.5rem;
    // padding: 1rem; 
    // display: flex;
    // justify-content: center;
//   }
  
//   & .nav-links-container {
    // width: 50%;
    // height: 100%;    
    // display: flex;
    // align-items: center;
    // justify-content: flex-end;

//     & .nav-link {
      // padding: 0.5rem 1rem;
      // cursor: pointer;
//     }  
//   }
// }

// .main-content {
//   padding: 6rem 2.5rem 0 2.5rem;
// }