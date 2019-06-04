import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';
import App from './components/App/App';
import * as serviceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
