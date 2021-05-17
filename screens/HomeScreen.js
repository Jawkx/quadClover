import React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Divider, List, TextInput } from "react-native-paper";
import { getAllBoards } from "../../4chanapi";

export const HomeScreen = ({ navigation }) => {
  const [allBoards, setAllBoards] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    getAllBoards(setAllBoards);
  }, []);

  const toBoardScreenHandler = (title, code) => {
    navigation.navigate("board", { title: title, code: code });
  };

  const searchFilter = (board) => {
    if (searchInput === "") {
      return true;
    }

    const fullstring = board.title + board.board;
    if (fullstring.indexOf(searchInput) !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const boardList = allBoards.filter(searchFilter).map((boardData, idx) => {
    const title = boardData.title;
    const boardCode = boardData.board;
    return (
      <View key={idx}>
        <List.Item
          title={title}
          description={boardCode}
          onPress={() => toBoardScreenHandler(title, boardCode)}
        />
        <Divider />
      </View>
    );
  });

  return (
    <View style={style.container}>
      <TextInput label="Search" onChangeText={(text) => setSearchInput(text)} />
      <Divider />
      <ScrollView>
        <List.Section>{boardList}</List.Section>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {},
  title: { textAlign: "center", fontSize: 30, padding: 8, fontWeight: "bold" },
});
