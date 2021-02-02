import {combineReducers} from 'redux';
import homeReducer from '../components/home/reducer';

export default combineReducers({
    home: homeReducer
});