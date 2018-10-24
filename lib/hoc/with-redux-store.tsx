import * as React from 'react';
import { initializeStore, RootState } from '../../store';
import { NextComponentClass } from 'next';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

declare global {
    interface Window {
        __NEXT_REDUX_STORE__: any;
    }
}

function getOrCreateStore(initialState?: RootState) {
    // Always make a new store if server, otherwise state is shared between requests
    if (isServer) {
        return initializeStore(initialState);
    }

    // Store in global variable if client
    if (!window[__NEXT_REDUX_STORE__]) {
        window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
    }
    return window[__NEXT_REDUX_STORE__];
}


export interface ReduxWrappedCompoent {
    reduxStore?: RootState;
}

export default (App: NextComponentClass<ReduxWrappedCompoent>) => {
    return class WithRedux extends React.Component {
        reduxStore?: RootState;

        static async getInitialProps(appContext: any) {
            const reduxStore = getOrCreateStore();

            // Provide the store to getInitialProps of pages
            appContext.ctx.reduxStore = reduxStore;

            let appProps = {};
            if (App.getInitialProps) {
                appProps = await App.getInitialProps(appContext);
            }

            return {
                ...appProps,
                initialReduxState: reduxStore.getState(),
            };
        }

        constructor(props: any) {
            super(props);
            this.reduxStore = getOrCreateStore(props.initialReduxState);
        }

        render() {
            return <App {...this.props} reduxStore={this.reduxStore}/>;
        }
    };
}
