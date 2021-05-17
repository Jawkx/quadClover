import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView, Vibration } from "react-native";
import { ActivityIndicator, Chip, IconButton } from "react-native-paper";
import { useState } from "react/cjs/react.development";
import { getThreads, getImageURI } from "../4chanapi";
import { ImageViewerModal } from "../components/ImageViewer";
import { ThreadCard } from "../components/ThreadCard";

export const BoardScreen = ({ route, navigation }) => {
  const [page, setPages] = useState(1);
  const [threadsData, setThreadsData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [imageViewerData, setImageViewerData] = useState({
    imageUri: "",
    width: "",
    height: "",
  });

  const title = route.params.title;
  const boardCode = route.params.code;

  useEffect(() => {
    getThreads(boardCode, page, setThreadsData);
    return () => {
      setThreadsData([]);
    };
  }, [page]);

  // function for turning page
  const turnPage = (bool) => {
    if (bool && page !== 15) {
      setPages(page + 1);
    } else if (page !== 1) {
      setPages(page - 1);
    } else {
      Vibration.vibrate(100);
    }
  };

  const toThread = (threadCode) => {
    navigation.navigate("thread", { board: boardCode, threadCode: threadCode });
  };

  const viewImage = (imageUri, w, h) => {
    setImageViewerData({
      imageUri: imageUri,
      width: w,
      height: h,
    });
    setIsVisible(true);
  };

  const threadsCard = threadsData.map((data, idx) => {
    const mainPostData = data.posts[0];
    return (
      <ThreadCard
        key={idx}
        threadData={mainPostData}
        boardCode={boardCode}
        isMain={true}
        toThread={(threadCode) => toThread(threadCode)}
        viewImage={(uri, w, h) => viewImage(uri, w, h)}
      />
    );
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      <ScrollView
        contentContainerStyle={
          threadsData.length === 0 ? style.scrollViewIndicatorOn : null
        }
      >
        {threadsData.length > 0 ? (
          threadsCard
        ) : (
          <View>
            <ActivityIndicator animating={true} size={60} />
          </View>
        )}
      </ScrollView>

      <View style={style.paginationView}>
        <IconButton
          icon="skip-previous-outline"
          mode="contained"
          onPress={() => turnPage(false)}
        />
        <Chip icon="book-open-page-variant" mode="flat">
          {page}
        </Chip>
        <IconButton
          icon="skip-next-outline"
          mode="contained"
          onPress={() => turnPage(true)}
        />
      </View>

      <ImageViewerModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        imageData={imageViewerData}
      />
    </View>
  );
};

const style = StyleSheet.create({
  card: {
    marginTop: 10,
    marginBottom: 15,
  },
  activityIndicator: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  paginationView: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scrollViewIndicatorOn: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    minHeight: 80,
  },
  threadDetails: {
    padding: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignItems: "center",
  },
  threadDetailChip: {
    margin: 2,
    fontSize: 1,
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
  },
});
