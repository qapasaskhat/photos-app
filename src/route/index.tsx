import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import type { StackNavigationProp } from '@react-navigation/stack';

import { Main, Detail, Search } from '../screens'

type StackNavigatorParamList = {
    MainScreen: undefined;
    DetailScreen: { id: string };
    SearchScreen: undefined;
};

export type ScreenNavigationProp = StackNavigationProp< StackNavigatorParamList,
  'DetailScreen'
>;

const Stack = createStackNavigator<StackNavigatorParamList>()

const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

const Navigator = () => {
    return <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerBackTitle: ' ',
        }}>
            <Stack.Screen 
                name='MainScreen' 
                component={Main} 
                options={({ navigation, route }) => ({
                    title: 'Photos',
                    headerRight: () => (
                        <TouchableOpacity style={{
                            marginRight: 16,
                        }} onPress={()=>console.log(navigation.navigate('SearchScreen'))}>
                            <Text>Search</Text>
                        </TouchableOpacity>
                    ),
                  })}
            />
            <Stack.Screen 
                name='DetailScreen' 
                component={Detail} 
                options={{ 
                    title: 'Detail',
                    transitionSpec: {
                        open: config,
                        close: config
                    },
                }}  
            />
            <Stack.Screen name='SearchScreen' component={Search} options={{ title: 'Search' }} />
        </Stack.Navigator>
    </NavigationContainer>
}

export default Navigator