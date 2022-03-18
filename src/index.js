import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bulma/css/bulma.min.css';
import { BrowserRouter as Router } from "react-router-dom"
import { WhoHasWhat } from "./components/WhoHasWhat.js"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <WhoHasWhat />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

