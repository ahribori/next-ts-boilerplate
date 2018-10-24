import update from 'immutability-helper';
import { createAction, handleActions } from 'redux-actions';
import {
    createFailureState,
    createInitialState,
    createPendingState,
    createRequestThunk,
    createRequestThunkTypes,
    createSuccessState, Payload,
    ThunkState,
} from '../lib/helpers/requestThunkHelper';

// ACTION TYPES
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';
const FETCH = createRequestThunkTypes('example/FETCH');


// ACTIONS
export const incrementCount = () => createAction(INCREMENT)();

export const decrementCount = () => createAction(DECREMENT)();

export const resetCount = () => createAction(RESET)();

export const fetch = (/* Arguments passed from react component */) => {
    return createRequestThunk(FETCH.DEFAULT, {
        url: 'https://jsonplaceholder.typicode.com/posts/1',
        method: 'GET',
        headers: {
            authorization: '',
        },
    });
};

export type ExampleState = {
    count: number;
    fetch: ThunkState;
}

// INITIAL STATE
const initialState: ExampleState = {
    count: 0,
    fetch: createInitialState(),
};

// REDUCERS
export default handleActions<ExampleState, Payload>({

    [INCREMENT]: (state) => update(state, {
        count: { $set: state.count + 1 },
    }),
    [DECREMENT]: (state) => update(state, {
        count: { $set: state.count - 1 },
    }),
    [RESET]: (state) => update(state, {
        count: { $set: initialState.count },
    }),

    [FETCH.PENDING]: (state) => update(state, {
        fetch: { $set: createPendingState() },
    }),
    [FETCH.SUCCESS]: (state, action) => update(state, {
        fetch: { $set: createSuccessState(action.payload && action.payload.data) },
    }),
    [FETCH.FAILURE]: (state, action) => update(state, {
        fetch: { $set: createFailureState(action.payload) },
    }),

}, initialState);
