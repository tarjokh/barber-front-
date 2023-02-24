import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './Screens';

function Nav(props) {
  return (
    <NavigationContainer>
    <MyStack/>
    </NavigationContainer>
  );
}
export default Nav;