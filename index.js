/**
 * @format
 */

import { AppRegistry, View } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { PersistGate } from "redux-persist/integration/react";
import { ActivityIndicator, PaperProvider } from "react-native-paper";
import { persistor, store } from "./src/redux";
import { Provider } from "react-redux";
import { Image } from "react-native-svg";

const RNRedux = () => (
  <Provider store={store}>
    <PersistGate
      loading={
        <View>
          <Image
            source={require("./src/assets/loginLogo.png")}
            // style={styles.logo}
          />
          <ActivityIndicator style={{ alignSelf: "center" }} size="large" />
        </View>
      }
      persistor={persistor}
    >
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
