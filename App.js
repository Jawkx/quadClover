import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import { DarkTheme, Provider as PaperProvider } from "react-native-paper";
import { AppHeader } from "./components/AppHeader";
import { HomeScreen } from "./screens/HomeScreen";
import { BoardScreen } from "./screens/BoardScreen";
import { ThreadScreen } from "./screens/ThreadScreen";

const Stack = createStackNavigator();
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="home"
          screenOptions={{ header: (props) => <AppHeader {...props} /> }}
        >
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="board" component={BoardScreen} />
          <Stack.Screen name="thread" component={ThreadScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
