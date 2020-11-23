import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle ,Text,TextStyle} from "react-native"
import { Screen} from "../../components"
 import { useNavigation ,useRoute} from "@react-navigation/native"
 import { useStores } from "../../models"
import { color,typography } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const TEXT : TextStyle ={
  fontFamily : typography.secondary,
  fontSize :20,
}

export const DetailsScreen = observer(function DetailsScreen() {
  // Pull in one of our MST stores
   const { astroidStore } = useStores();
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Text style={TEXT}>Name : {astroidStore.astroid.name}</Text>
      <Text style={TEXT}>nasa_jpl_url : {astroidStore.astroid.nasa_jpl_url}</Text>
      <Text style={TEXT}>is_potentially_hazardous_asteroid : {astroidStore.astroid.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</Text>
    </Screen>
  )
})
