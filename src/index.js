import ReactDOM from 'react-dom/client';
import RouteCmp from './RouteManager';
import { Provider } from 'react-redux';
import store from './store';
import { GlobalStyles } from './styles/GlobalStyles';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
      <GlobalStyles />
      <RouteCmp />
   </Provider>
);
