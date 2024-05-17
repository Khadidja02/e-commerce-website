// actions/cartActions.js

import { cartStart, cartSuccess, cartFail } from './cartSlice';
import { authAxios , orderSummaryURL} from '../../Utils';


export const fetchCart = () => async (dispatch) => {
  try {
    dispatch(cartStart());
    const response = await authAxios.get(orderSummaryURL);
    dispatch(cartSuccess(response.data));
  } catch (error) {
    dispatch(cartFail(error));
  }
};
