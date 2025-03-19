import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';

const rootReducer:any = combineReducers({
    auth: authReducer,
    cart: cartReducer,
});

export default rootReducer;