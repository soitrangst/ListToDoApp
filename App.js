import React from 'react';
import { Provider } from "react-redux";
import ContainerScreen from "./Components/containerScreen";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from "./Components/redux/store";

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <ContainerScreen />
      </Provider>

    );
  }
}


/* <PersistGate loading={null} persistor={persistor}>
<ContainerScreen />
</PersistGate> */