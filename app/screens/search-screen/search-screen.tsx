import React,{useState} from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle ,ActivityIndicator,TouchableOpacity,TextInput,StyleSheet,Alert,View} from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation, useRoute } from "@react-navigation/native"
 import { useStores } from "../../models"
import { color,spacing,typography } from "../../theme"


export const SearchScreen = observer(function SearchScreen() {
  // Pull in one of our MST stores
   const { astroidStore } = useStores()
   const [isValid,setIsValid] = useState(false);
   const [loading,setLoading] = useState(false);
   const [astroidId,setAstroidId] = useState<string>('');
   const navigation = useNavigation();
  // OR
  // const rootStore = useStores()
  async function handleSearch (astroidId)  {
   
    if(isValid){
   
      
     await astroidStore.getAstroidDetails(astroidId);
    
  
     if(astroidStore.astroid.id === astroidId)
     {
      navigation.push('details');

     }
     else{
      Alert.alert('No data found');
     }
   }
   else
   {
     Alert.alert('Please enter the astroid Id');
   }
 }

 async function randomAstroid()  {
    setLoading(true);
   await astroidStore.getRandomAstroid();
   setAstroidId(astroidStore.random.id);
   setIsValid(true);
   setLoading(false);
    //navigation.push('details');

}

  const textInputChange = (val) => {
   if( val.trim().length > 0 ) {
      setAstroidId(val);
       setIsValid(true);
   } else {
       setIsValid(false);
       setAstroidId(val);
   }
}
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={styles.ROOT} >
      {loading ? ( <ActivityIndicator />) :
      <>
      <Text style={styles.NAME}>Astroid App</Text>
     
      <TextInput 
                    placeholder="Enter AstroidId eg,2000433 "
                    placeholderTextColor="#666666"
                    style={styles.PLACEHOLDER}
                    value= {astroidId}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                   
                />
              
                <TouchableOpacity disabled={!isValid} onPress={()=>{handleSearch(astroidId)}} style={styles.SEARCH_BUTTON}>
                  <Text style={styles.BUTTON_TEXT}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{randomAstroid()}} style={styles.SEARCH_BUTTON}>
                  <Text style={styles.BUTTON_TEXT}>Random Astroid</Text>
                </TouchableOpacity>
                </>
}
    </View>
  )
})

const styles = StyleSheet.create({
  ROOT :{
    backgroundColor: color.palette.black,
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
 NAME :{
  fontSize:35,
  fontWeight:'bold',
  marginBottom : spacing[8]
 },
 PLACEHOLDER :{
  backgroundColor: color.palette.white,
  height: 60,
  width:'80%',
  borderRadius:15,
  paddingLeft: spacing[5],
  justifyContent:'center',
  alignItems:"center",
  fontSize : 20,
 },
 SEARCH_BUTTON :{
  backgroundColor: color.palette.lightGrey,
  marginTop:spacing[7],
  height:60,
  width:'60%',
  alignItems:"center",
  justifyContent:'center',
  borderRadius : 15
 },
 BUTTON_TEXT :{
   color : color.palette.white,
   fontSize : 30,
 },
});
