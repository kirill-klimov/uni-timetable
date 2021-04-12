import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import App from './components/App/App';
import { PersistGate } from 'redux-persist/integration/react';
import './styles.scss';

ReactDOM.render(
<Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>
</Provider>,
document.getElementById("app"));