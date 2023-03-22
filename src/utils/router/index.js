import { createBrowserHistory } from 'history'
import { useSearchParams, useParams } from 'react-router-dom'

const history = createBrowserHistory()

// 获取query参数
const getSearchParams = function (key) {
  const [params] = useSearchParams()
  return params.get(key)
}
// 获取Params参数
const getParams = function (key) {
  const params = useParams()
  return params[key]
}
export { history, getSearchParams, getParams }
