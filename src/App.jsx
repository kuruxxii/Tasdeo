import BaseRouter from "./routers";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from "./utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <BaseRouter />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </HistoryRouter>
  );
}
export default App;
