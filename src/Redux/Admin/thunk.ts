import { RootState } from '../index';
import { AdminAction, getAllQuestionAction } from './reducer';
import { ThunkAction } from 'redux-thunk';
import { dbUrl } from '../../db';
import axios from 'axios';
const getAllQuestionAPI = ()=>{
  return axios.get(dbUrl+'/qna/all',{withCredentials:true});
}
export function getAllQuestion():ThunkAction<void,RootState, null, AdminAction>{
  return async (dispatch) => {
    const { request, success, failure } = getAllQuestionAction;
    dispatch(request(null)); 
    try {
      const response = await getAllQuestionAPI();
      dispatch(success(response.data));
    } catch (e) {
      dispatch(failure(e));
    }
  };
}