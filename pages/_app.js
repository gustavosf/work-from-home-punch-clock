import DateFnsUtils from "@date-io/date-fns";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import withRedux from "next-redux-wrapper";
import Head from "next/head";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as ACTIONS from "../redux/actions";
import { persistor, store } from "../redux/store";
import { StoreContext } from "../utils/contexts";
import theme from "../utils/theme";

export const getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  return { pageProps };
};

const App = ({ Component, pageProps, store }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const action = (type, payload = {}) => store.dispatch({ type, payload });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>Ponto</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <StoreContext.Provider value={{ store, action }}>
              <Component {...pageProps} />
            </StoreContext.Provider>
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </PersistGate>
    </Provider>
  );
};

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = {
  actions: Object.keys(ACTIONS).reduce(
    (prev, action, i) => ({
      ...prev,
      [action]: (payload) => ({ type: action, payload }),
    }),
    {}
  ),
};

export default withRedux(() => store)(App);
