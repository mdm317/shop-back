import { createAsyncAction, ActionType, createReducer } from "typesafe-actions";
import { AxiosError } from "axios";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import axios from "axios";
const dbUrl = process.env.REACT_APP_DBURL;

export interface PopupState {
  data: {
    qna: any;
    address: string;
    addQna: {
      result: boolean;
      closed: boolean;
    };
  };
  err: {
    qnaErr: AxiosError | null;
  };
}
const initialState: PopupState = {
  data: {
    qna: {},
    address: "",
    addQna: {
      result: false,
      closed: true,
    },
  },
  err: {
    qnaErr: null,
  },
};
const GET_QNA_REQUEST = "GET_QNA_REQUEST";
const GET_QNA_SUCCESS = "GET_QNA_SUCCESS";
const GET_QNA_FAILURE = "GET_QNA_FAILURE";

const SAVE_ADDRESS = "SAVE_ADDRESS";

const saveAddressAction = (address: string) => {
  return <const>{
    type: SAVE_ADDRESS,
    payload: address,
  };
};
const getQnaAction = createAsyncAction(
  GET_QNA_REQUEST,
  GET_QNA_SUCCESS,
  GET_QNA_FAILURE
)<null, any, AxiosError>();

type PopupAction =
  | ActionType<typeof getQnaAction>
  | ReturnType<typeof saveAddressAction>;

const getQnaAPI = (qnaId: string) => {
  return axios.get(dbUrl + `/qna/getquestion?qnaId=${qnaId}`, {
    withCredentials: true,
  });
};
export function getQuestion(
  qnaId: string
): ThunkAction<void, RootState, null, PopupAction> {
  return async (dispatch) => {
    const { request, success, failure } = getQnaAction;
    dispatch(request(null));
    try {
      const response = await getQnaAPI(qnaId);
      dispatch(success(response.data));
    } catch (e) {
      dispatch(failure(e));
    }
  };
}

const userReducer = createReducer<PopupState, PopupAction>(initialState, {
  GET_QNA_REQUEST: (state) => ({ ...state }),
  GET_QNA_SUCCESS: (state, action) => ({
    ...state,
    data: { ...state.data, qna: action.payload },
  }),
  GET_QNA_FAILURE: (state, action) => ({
    ...state,
    err: { ...state.err, qnaErr: action.payload },
  }),
  SAVE_ADDRESS: (state, action) => ({
    ...state,
    data: { ...state.data, address: action.payload },
  }),
});
export default userReducer;
