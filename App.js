import React  from "react";
import Routes from './src/routes'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import { StatusBar, View } from "react-native";
import styles from './src/pages/properties/styles'

export default function App() {

  return (
    <>
      <View style={styles.statusBar}></View>
      <StatusBar barStyle="light-content" backgroundColor="#48397B" />
      <Routes />
    </>
  );
}

