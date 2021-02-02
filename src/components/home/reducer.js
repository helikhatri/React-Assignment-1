import {GET_BLOG} from './actions';

const initialState = {
    blog: [],
};

export default function reducer (
    state = initialState,
    { type, payload}
 ) {
    switch (type) {
        case GET_BLOG:
            return {
                ...state,
                blog: payload,
            };
            default:
                return state;
    }
}