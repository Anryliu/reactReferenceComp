import React from 'react';
import ReactDOM from 'react-dom';
import 'tinper-bee/assets/tinper-bee.css';
import './assets/index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
