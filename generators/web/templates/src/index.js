import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './js/serviceWorker';

import { configure } from 'mobx';

import { FocusStyleManager } from "@blueprintjs/core";

import App from './js/components/app';
import { getLogger } from './js/utils/logger';

import 'tachyons';
import './css/app.scss';

const _logger = getLogger('[index]');

_logger.trace('Configuring global settings');
configure({ enforceActions: 'observed' });
FocusStyleManager.onlyShowFocusOnTabs();

_logger.trace('Launching application');
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
