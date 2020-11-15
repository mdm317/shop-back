import * as types from "./types";
import { Product } from "../../Model/db";
import GetProductsAction from "./action";
import { AxiosError } from "axios";
import { GET_PRODUCT_DETAIL_FAILURE } from "./types";
import {
  GET_PRODUCT_DETAIL_REQUEST,
  GET_PRODUCT_DETAIL_SUCCESS,
} from "./types";

interface ErrorReason {
  get: AxiosError | null;
  addProduct: AxiosError | null;
  willDelete: AxiosError | null;
  deleteProduct: AxiosError | null;
  addReview: AxiosError | null;
  addQuestion: AxiosError | null;
  addAnswer: AxiosError | null;
  getPrdQuestions: AxiosError | null;
  addImageErr: AxiosError | null;
  editProductErr: AxiosError | null;
  getProductDetail: AxiosError | null;
}
export interface ProductState {
  products: Product[];
  error: ErrorReason;
  productDetail: Product | null;
  imagesPath: { url: string; idx: string }[];
}

const initialState: ProductState = {
  products: [],
  imagesPath: [],
  productDetail: null,
  error: {
    get: null,
    addProduct: null,
    willDelete: null,
    deleteProduct: null,
    addReview: null,
    addQuestion: null,
    addAnswer: null,
    getPrdQuestions: null,
    addImageErr: null,
    editProductErr: null,
    getProductDetail: null,
  },
};

const productReducer = (
  state = initialState,
  action: GetProductsAction
): ProductState => {
  switch (action.type) {
    case types.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        error: {
          ...state.error,
          get: null,
        },
      };
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
    case types.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        error: {
          ...state.error,
          get: action.payload,
        },
      };
    case types.ADD_PRODUCT_REQUEST:
      return {
        ...state,
        error: {
          ...state.error,
          addProduct: null,
        },
      };
    case types.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [action.payload, ...state.products],
        imagesPath: [],
      };
    case types.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        error: {
          ...state.error,
          addProduct: action.payload,
        },
        imagesPath: [],
      };
    case types.WILL_DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        error: {
          ...state.error,
          willDelete: null,
        },
      };
    case types.WILL_DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
      };
    case types.WILL_DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        error: {
          ...state.error,
          willDelete: action.payload,
        },
      };
    case types.DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        error: {
          ...state.error,
          deleteProduct: null,
        },
      };
    case types.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
      };
    case types.DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        error: {
          ...state.error,
          deleteProduct: action.payload,
        },
      };
    case types.ADD_REVIEW_REQUEST:
      return {
        ...state,
        error: {
          ...state.error,
          addReview: null,
        },
      };
    case types.ADD_REVIEW_SUCCESS:
      return {
        ...state,
      };
    case types.ADD_REVIEW_FAILURE:
      return {
        ...state,
        error: {
          ...state.error,
          addReview: action.payload,
        },
      };
    case types.ADD_QUESTION_REQUEST:
      return {
        ...state,
        error: {
          ...state.error,
          addQuestion: null,
        },
      };
    case types.ADD_QUESTION_SUCCESS: {
      const qna = action.payload;
      const pid = qna.product?.id;
      const curProducts = state.products;
      const newProducts = curProducts.map((pro) => {
        if (pro.id === pid) {
          pro.qnas = [action.payload, ...pro.qnas];
        }
        return pro;
      });
      return {
        ...state,
        products: newProducts,
      };
    }
    case types.ADD_QUESTION_FAILURE:
      return {
        ...state,
        error: {
          ...state.error,
          addQuestion: action.payload,
        },
      };
    case types.ADD_ANSWER_REQUEST:
      return {
        ...state,
        error: {
          ...state.error,
          addAnswer: null,
        },
      };
    case types.ADD_ANSWER_SUCCESS: {
      const answer = action.payload;
      const proId = answer.product?.id;
      const preProducts = state.products;
      const newproducts = preProducts.map((pro) => {
        if (pro.id === proId) {
          let qnaIdx = 0;
          pro.qnas.forEach((qna, i) => {
            if (qna.id === answer.question?.id) {
              qnaIdx = i;
            }
          });
          pro.qnas.splice(qnaIdx + 1, 0, answer);
        }
        return pro;
      });
      return {
        ...state,
        products: newproducts,
      };
    }

    case types.ADD_ANSWER_FAILURE:
      return {
        ...state,
        error: {
          ...state.error,
          addAnswer: action.payload,
        },
      };
    case types.GET_PRD_QUESTIONS_REQUEST:
      return {
        ...state,
        error: {
          ...state.error,
          getPrdQuestions: null,
        },
      };
    case types.GET_PRD_QUESTIONS_SUCCESS: {
      const questionList = action.payload.qnaList;

      const productId = action.payload.productId;
      const newProductList = state.products.map((product) => {
        if (product.id === productId) {
          product.qnas = questionList;
          return product;
        }
        return product;
      });
      return {
        ...state,
        products: newProductList,
      };
    }
    case types.GET_PRD_QUESTIONS_FAILURE:
      return {
        ...state,
        error: {
          ...state.error,
          getPrdQuestions: action.payload,
        },
      };
    case types.ADD_IMAGE_REQUEST:
      return {
        ...state,
        error: {
          ...state.error,
          addImageErr: null,
        },
      };
    case types.ADD_IMAGE_SUCCESS:
      return {
        ...state,
        imagesPath: action.payload,
      };
    case types.ADD_IMAGE_FAILURE:
      return {
        ...state,
        error: {
          ...state.error,
          addImageErr: action.payload,
        },
      };
    case types.EDIT_PRODUCT_REQUEST:
      return {
        ...state,
        error: {
          ...state.error,
          editProductErr: null,
        },
      };
    case types.EDIT_PRODUCT_SUCCESS: {
      const returnProduct = action.payload;
      const editProductList = state.products.map((pro) => {
        if (pro.id === returnProduct.id) {
          return returnProduct;
        }
        return pro;
      });
      return {
        ...state,
        products: editProductList,
      };
    }
    case types.EDIT_PRODUCT_FAILURE:
      return {
        ...state,
        error: {
          ...state.error,
          editProductErr: action.payload,
        },
      };
    case types.GET_PRODUCT_DETAIL_REQUEST:
      return {
        ...state,
        error: {
          ...state.error,
          getProductDetail: null,
        },
      };
    case types.GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        productDetail: action.payload,
      };
    case types.GET_PRODUCT_DETAIL_FAILURE:
      return {
        ...state,
        error: {
          ...state.error,
          getProductDetail: action.payload,
        },
      };
    default:
      return state;
  }
};

export default productReducer;
