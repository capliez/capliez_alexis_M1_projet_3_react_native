import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './views/home';
import { SignUpScreen, SignInScreen } from './views/auth';
import { ROUTES } from './config/routes';
import { SafeAreaView } from 'react-native';
import { AddProduct, CurrentProduct } from './views/products';
import CartScreen from './views/cart';
const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode="none">
    <Screen name={ROUTES.home} component={HomeScreen} />
    <Screen name={ROUTES.signUp} component={SignUpScreen} />
    <Screen name={ROUTES.signIn} component={SignInScreen} />
    <Screen name={ROUTES.addProduct} component={AddProduct} />
    <Screen name={ROUTES.currentProduct} component={CurrentProduct} />
    <Screen name={ROUTES.cart} component={CartScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <SafeAreaView style={{ flex: 1 }}>
      <HomeNavigator />
    </SafeAreaView>
  </NavigationContainer>
);
