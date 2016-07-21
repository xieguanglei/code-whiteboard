import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';

import AppElement from './components/app';

import './index.css';

render(
  <AppElement/>,
  document.querySelector('#container')
);