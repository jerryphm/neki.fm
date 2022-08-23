import MainLayout from './layouts/mainLayout/MainLayout';
import Connect from './layouts/connectLayout/Connect';
import { useSelector } from 'react-redux';
import { authSelector } from './store/authSlice';

function App() {
   const { isAuthorized } = useSelector(authSelector);
   return isAuthorized ? <MainLayout /> : <Connect />
}
export default App;