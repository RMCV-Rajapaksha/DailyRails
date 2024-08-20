import { View, Text, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import CustomButton from "./features/(pages)/components/CustomButton";
import HomeScreen from "./features/(pages)/_layout";
import MapScreen from "./features/(pages)/(map)/map";
import UploadData from "./features/(pages)/(share-location)/UploadData";
import {router, Link} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App(){
  return (
    <><SafeAreaView>
      <StatusBar style="auto" />
      <Link href="./features/(pages)">map</Link>
      </SafeAreaView>
    </>
  ) 
}


// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Map" component={MapScreen} />
//         <Stack.Screen name="Upload" component={UploadData} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
