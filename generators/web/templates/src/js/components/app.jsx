import React, { Component } from 'react';

import { observer } from 'mobx-react';

import { getLogger } from '../utils/logger';

const _logger = getLogger('AppComponent');

/**
 * Root component for the web application.
 */
class App extends Component {
    /**
     * @override
     */
    constructor(props) {
        _logger.silly('ctor()');

        super(props);
    }

    /**
     * @override
     */
    render() {
        _logger.silly('render()');

        return (
            <div className="text-primary bg-primary pa3">
                hello, world!
            </div>
        );
    }
}
export default observer(App);
