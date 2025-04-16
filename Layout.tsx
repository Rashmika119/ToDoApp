import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Layout(){
    const Stack=createNativeStackNavigator();

    return(
        <Stack screenOptions={headerShown:false}/>
        )

 }
 export default Layout;