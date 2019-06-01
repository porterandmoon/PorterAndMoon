import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import * as serviceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
