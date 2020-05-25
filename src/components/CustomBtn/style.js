import { StyleSheet, Platform } from "react-native";
export default StyleSheet.create({

btnAction :{
    marginBottom:10,
    height: 60,
    width: '40%',
    alignItems:'center',
    justifyContent:'center',
    alignContent:'center',
    borderColor:'#222',
    flexDirection:'row',
    borderWidth:0.6,
    borderRadius:6,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.25,
shadowRadius: 3.9,

elevation: 5,
  },
  textAction:{
    color:'#715',
    fontWeight:'400',
    fontSize:15
  }
});