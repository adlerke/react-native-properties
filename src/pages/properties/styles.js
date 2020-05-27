import { StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  statusBar: {
    width: "100%",
    height: Platform.OS === "ios" ? Constants.statusBarHeight : 0,
    backgroundColor: "#48397B",
  },
  header: {
    backgroundColor: "#48397B",
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
  },
  appTitle: {
    marginLeft: 11,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  logo: {
    marginTop: '2%',
    width: 70,
    height: 70,
  },
  cardPropertyList: {
    paddingHorizontal: 15,
  },
  property: {
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
    marginTop: 5
  },
  tagCard: {
    marginTop: 10,
    width: 150,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
  },
  tagText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  titleText: {
    paddingHorizontal: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginTop: 10,
  },
  caracs: {
    marginTop: 10,
    color: "#222",
  },
  texts: {
    fontWeight: "bold",
  },
  bxs: {
    shadowColor: "#444",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.32,
    shadowRadius: 3.46,

    elevation: 9,
  },
  imageTag: {
    width: 150,
    height: 70,
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  rowDisplay: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    backgroundColor: "#90CAF9",
    width: 100,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
  },
  badgeText: {
    color: "#000",
    fontWeight: "600",
  },
});