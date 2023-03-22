import BaseRouter from './routers'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { history } from './utils'
function App() {
  return (
    <HistoryRouter history={history}>
        <div className="App">
            <BaseRouter />
        </div>
    </HistoryRouter>
  )
}
export default App
