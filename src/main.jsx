import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConfigProvider } from "antd";
import { UseInkProvider } from "useink";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/index";

import { AlephTestnet, PhalaTestnet } from "useink/chains";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UseInkProvider
    config={{
      dappName: "Flipper",
      chains: [AlephTestnet, PhalaTestnet],
    }}
  >
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimaryHover: "",
            colorPrimary: "",
            colorPrimaryTextHover: "red",
          },
          Input: {
            colorText: "white",
            fontSize: "18px",
            colorBgContainer: "transparent",
          },
          DatePicker: {
            colorBgContainer: "transparent",
            colorTextPlaceholder: "white",
          },
          Select: {
            colorBgContainer: "transparent",
            colorText: "white",
            colorBgElevated: "rgba(14, 33, 160, 0.6)",
            colorTextPlaceholder: "#DFA878", //
          },
        },
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </UseInkProvider>
);
/*  */
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
