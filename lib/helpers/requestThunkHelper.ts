import request, { AxiosRequestConfig } from 'axios';
import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';

export interface Payload {
    success: boolean;
    data: any;
    status?: number;
    message?: string;
}

export const createRequestThunk = (actionType: string, axiosOptions: AxiosRequestConfig = {}) => (dispatch: Dispatch) => {
    if (process.env.NODE_ENV === 'development') {
        if (!axiosOptions.headers) {
            axiosOptions.headers = {};
        }
        axiosOptions.headers.accessToken = localStorage.getItem('access_token');
    }
    const pendingAction = createAction(`${actionType}_PENDING`);
    const successAction = createAction(`${actionType}_SUCCESS`);
    const failureAction = createAction(`${actionType}_FAILURE`);
    dispatch(pendingAction());
    return request(axiosOptions)
        .then(response => {
            const payload: Payload = {
                success: true,
                data: response.data,
            };
            dispatch(successAction(payload));
            return payload;
        })
        .catch(error => {
            const { response } = error;
            const payload: Payload = {
                success: false,
                status: response ? error.response.status : null,
                data: response ? error.response.data : null,
                message: error.message,
            };
            dispatch(failureAction(payload));
            return payload;
        });
};

export type ThunkActionTypes = {
    DEFAULT: string;
    PENDING: string;
    SUCCESS: string;
    FAILURE: string;
}

export const createRequestThunkTypes = (actionType: string): ThunkActionTypes => {
    return {
        DEFAULT: `${actionType}`,
        PENDING: `${actionType}_PENDING`,
        SUCCESS: `${actionType}_SUCCESS`,
        FAILURE: `${actionType}_FAILURE`,
    };
};

export interface ThunkState {
    pending: boolean;
    success: boolean;
    error: any;
    data: any;
}

export const createInitialState = (): ThunkState => {
    return {
        pending: false,
        success: false,
        error: null,
        data: null,
    };
};

export const createPendingState = (): ThunkState => {
    return {
        pending: true,
        success: false,
        error: null,
        data: null,
    };
};

export const createSuccessState = (data: any): ThunkState => {
    return {
        pending: false,
        success: true,
        error: null,
        data,
    };
};

export const createFailureState = (error: any): ThunkState => {
    return {
        pending: false,
        success: false,
        error,
        data: null,
    };
};
