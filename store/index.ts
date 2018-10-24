import thunkMiddleware from 'redux-thunk';
import { Action, applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import example, { ExampleState } from './Example';

export interface RootState {
    example: ExampleState
}

const appReducer = combineReducers({
    example,
});

const rootReducer = (state: RootState, action: Action) => {
    if (action.type === 'auth/LOGOUT') {
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};

export function initializeStore(initialState?: RootState) {
    return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}
