import { createStore, applyMiddleware } from "redux"
import { createLogger } from "redux-logger"
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer from "../index"

const configureStore = () =>
  //  스토어를 생성한다
  createStore(
    // 루트 리듀서를 전달한다
    rootReducer,

    // 미들웨어 형태의 리덕스 개발 도구를 추가한다
    composeWithDevTools(applyMiddleware(createLogger()))
  )

export default configureStore