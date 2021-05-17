import React from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Chip,
  Divider,
  IconButton,
  List,
} from "react-native-paper";
import { View, StyleSheet } from "react-native";

import { getThreads, getImageURI } from "../4chanapi";
import HTML from "react-native-render-html";

export const ThreadCard = ({
  threadData,
  boardCode,
  isMain,
  toThread,
  viewImage,
}) => {
  const { no, id, country, now, tim, ext, filename, com, replies, w, h } =
    threadData;

  const imgUri = getImageURI(boardCode, tim, ext);

  const viewImageHandler = () => {
    if (tim) {
      viewImage(imgUri, w, h);
    }
  };

  const countryFlag = (
    <Avatar.Image
      size={24}
      source={{
        uri: `https://www.countryflags.io/${country}/flat/16.png`,
      }}
    />
  );

  return (
    <Card style={style.card} onPress={viewImageHandler}>
      <View style={style.threadDetails}>
        <Chip style={style.threadDetailChip} icon="clover">
          {no}
        </Chip>
        <Chip style={style.threadDetailChip} icon="timetable">
          {now}
        </Chip>
        {id && (
          <View>
            {country ? (
              <Chip style={style.threadDetailChip} avatar={countryFlag}>
                {id}
              </Chip>
            ) : (
              <Chip style={style.threadDetailChip} icon="guy-fawkes-mask">
                {id}
              </Chip>
            )}
          </View>
        )}
      </View>
      {tim && (
        <View>
          <Card.Cover
            source={{
              uri: imgUri,
            }}
            resizeMode={"contain"}
          />
          <Card.Title title={filename + ext} style={style.cardTitle} />
        </View>
      )}

      <Card.Content style={style.content}>
        {com && <HTML source={{ html: com }} />}
      </Card.Content>
      {isMain && (
        <Card.Actions style={style.cardActions}>
          <Chip
            style={style.threadDetailChip}
            icon="newspaper-variant-multiple-outline"
          >
            {replies}
          </Chip>
          <Button
            onPress={() => {
              toThread(no);
            }}
            icon="card-text-outline"
          >
            View Thread
          </Button>
        </Card.Actions>
      )}
    </Card>
  );
};

const style = StyleSheet.create({
  card: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 10,
    marginBottom: 15,
    paddingBottom: 10,
  },
  threadDetails: {
    padding: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignItems: "center",
  },
  content: {},
  threadDetailChip: {
    margin: 2,
    fontSize: 1,
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
  },
});
