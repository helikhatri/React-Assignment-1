import axios from 'axios';

export const GET_BLOG = 'home:GET_BLOG';

export const getBlog = () =>
async dispatch => {
    try{
        const res = await axios.get('/blog');
        dispatch({
            type: GET_BLOG,
            payload: res?.data,
        });
    } catch (error){
        
    }
}