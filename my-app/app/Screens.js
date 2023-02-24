import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginForm from "./Screens/LoginForm";
import Welcome from "./Screens/Welcome";
import SignupForm1 from "./Screens/SignupForm1";
import SignupForm2 from "./Screens/SignupForm2";
import SignupForm3 from "./Screens/SignupForm3";
import Home from "./Screens/Home";
import ListOfItems from "./Screens/ListOfItems";
import Settings from "./Screens/Settings";
import ItemPage from "./Screens/ItemPage";
import Favorites from "./Screens/Favorites";
import NoInternetConnection from "./Screens/NoInternetConnection";
import ChangeProfile from "./Screens/ChangeProfile";
const Stack = createNativeStackNavigator();








function MyStack() {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={LoginForm} />
      <Stack.Screen name="SignUp1" component={SignupForm1} />
      <Stack.Screen name="SignUp2" component={SignupForm2} />
      <Stack.Screen name="SignUp3" component={SignupForm3} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ListOfItems" component={ListOfItems} />
      <Stack.Screen name="ItemPage" component={ItemPage} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="NoInternetConnection" component={NoInternetConnection} />
      <Stack.Screen name="ChangeProfile" component={ChangeProfile} />
    </Stack.Navigator>
  );
}
export default MyStack