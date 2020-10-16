import { AxiosError } from "axios";
import { Qna } from '../../Model/db';
import { createAsyncAction, createReducer, ActionType } from 'typesafe-actions';

export const GET_ALL_QUESTIONS_REQUEST = 'GET_ALL_QUESTIONS_REQUEST';
export const GET_ALL_QUESTIONS_SUCCESS = 'GET_ALL_QUESTIONS_SUCCESS';
export const GET_ALL_QUESTIONS_FAILURE = 'GET_ALL_QUESTIONS_FAILURE';

export interface AdminState{
    qna:Qna[],
    err:{
        qnaErr:AxiosError|null
    }
}
const initialState: AdminState = {
    qna:[],
    err:{
        qnaErr:null
    }
};

export const getAllQuestionAction = createAsyncAction(
    GET_ALL_QUESTIONS_REQUEST, 
    GET_ALL_QUESTIONS_SUCCESS, 
    GET_ALL_QUESTIONS_FAILURE
)<null, Qna[],AxiosError>();

export type AdminAction = 
    ActionType<typeof getAllQuestionAction>
// type adminAction = typeof addReviewAction;
const adminReducer = createReducer<AdminState,AdminAction>(initialState,{
    GET_ALL_QUESTIONS_REQUEST:(state)=>({...state, err:{...state.err, qnaErr:null}}),
    GET_ALL_QUESTIONS_SUCCESS:(state,action)=>({...state, qna:action.payload}),
    GET_ALL_QUESTIONS_FAILURE:(state,action)=>({...state, err:{...state.err, qnaErr:action.payload}}),
});
export default adminReducer;