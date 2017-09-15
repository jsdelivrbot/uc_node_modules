/// <reference types="react" />
import * as React from 'react';
import * as PropTypes from 'prop-types';
export declare class WithStylesContextProps {
    onInsertCss: Function;
}
export declare class WithStylesContext extends React.Component<WithStylesContextProps, any> {
    static childContextTypes: {
        insertCss: PropTypes.Validator<any>;
    };
    getChildContext(): {
        insertCss: Function;
    };
    render(): React.ReactElement<any>;
}
