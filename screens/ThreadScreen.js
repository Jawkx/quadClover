import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { View, FlatList } from "react-native";
import { getPosts } from "../4chanapi";
import { ThreadCard } from "../components/ThreadCard";
import { ImageViewerModal } from "../components/ImageViewer";
export const ThreadScreen = ({ navigation, route }) => {
  const [postList, setPostList] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [imageViewerData, setImageViewerData] = useState({
    imageUri: "",
    width: "",
    height: "",
  });
  const threadCode = route.params.threadCode;
  const boardCode = route.params.board;

  useEffect(() => {
    getPosts(boardCode, threadCode, setPostList);
    return () => {
      setPostList([]);
    };
  }, []);

  const viewImage = (imageUri, w, h) => {
    setImageViewerData({
      imageUri: imageUri,
      width: w,
      height: h,
    });
    setIsVisible(true);
  };
  const renderCards = ({ item }) => {
    return (
      <ThreadCard
        threadData={item}
        boardCode={boardCode}
        isMain={false}
        viewImage={(uri, w, h) => viewImage(uri, w, h)}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={postList}
        renderItem={renderCards}
        keyExtractor={(item, idx) => "item" + idx}
      />
      <ImageViewerModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        imageData={imageViewerData}
      />
    </View>
  );
};
