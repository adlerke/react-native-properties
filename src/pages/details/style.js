import { StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";
import { Dimensions } from 'react-native'
let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  statusBar:{
    width: "100%",
    height: Platform.OS === 'ios' ? Constants.statusBarHeight : 0,
    backgroundColor: "#48397B"
  },
  header: {
    backgroundColor: "#48397B",
    height: '8%',
    alignItems: "center",
    justifyContent: "space-between",
  },
  appTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  logo: {
    width: deviceWidth,
  },
  logoAl: {
    marginRight: 8,
    width: 40,
    height: 40,
  },
  pics: {
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#f5f5f5",
    height: 300,
    borderBottomRightRadius: 50,
  },
  content: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",

  },
  icons: {
    backgroundColor:'white',
    marginLeft:'5%',
    backgroundColor:'transparent',
    width:40,
  },
  property: {
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: "#f5f5f5",
    borderColor:"#f5f5f5",

    width: deviceWidth - 30,
    paddingHorizontal: 10

  },
  price:{
    color:'#715',
    marginLeft:'5%',
    fontWeight:'bold',
    fontSize:25
  },
  caracs:{
    marginTop:10,
    color:'#555',
    fontWeight:'bold',
    fontSize:20
  },
  info:{
    fontSize:18,
    fontWeight:'500',
    color:'#715'
  },
  tagsText:{
    fontSize: 18,
    fontWeight:'400'
  },
  mapStyle: {
    width: '100%',
    height: 300

  },
  footer :{
    height: "13%",
    backgroundColor: '#f5f5f5',
    borderStyle : 'solid',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems:'center',
    alignContent:'center',
    flexDirection: 'row',
    justifyContent:'space-around'
  },
});