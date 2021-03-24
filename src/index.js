import React from 'react';
import ReactDOM from 'react-dom';
import App from "./Components/App"
import {createStore} from "redux"
import allReducers from "./Redux/Reducers/combine"
import {Provider} from "react-redux"

const store = createStore(allReducers,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

ReactDOM.render(
  <Provider store = {store}>
  <App/>
  </Provider>
  ,
  document.getElementById('root')
);


