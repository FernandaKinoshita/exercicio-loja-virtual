import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Carrinho from "./src/screens/Carrinho";
import Home from "./src/screens/Home";

import { CarrinhoProvider } from "./src/contexts/CarrinhoContext";


const Stack = createNativeStackNavigator()

const App = () => {
  return(
    <CarrinhoProvider>
      <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name='home'
          component={ Home }/>

        <Stack.Screen
          name='carrinho'
          component={ Carrinho }/>

      </Stack.Navigator>
    </NavigationContainer>
    </CarrinhoProvider>    
  )
}

export default App