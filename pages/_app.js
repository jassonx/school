import "antd/dist/antd.css";
import "../styles/globals.css";
import { Provider } from "react-redux";
// import { langMessages } from "../lang/messages";
// import { IntlProvider } from "react-intl";
import generateStore from "../redux/store";

const store = generateStore();
function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
