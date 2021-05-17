import React from "react";
import { Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

export const ImageViewerModal = ({ isVisible, setIsVisible, imageData }) => {
  const { imageUri, width, height } = imageData;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      onRequestClose={() => setIsVisible(false)}
    >
      <ImageViewer
        enableSwipeDown={true}
        renderIndicator={(currentIndex, allSize) => null}
        onSwipeDown={() => setIsVisible(false)}
        imageUrls={[
          {
            url: imageUri,
            width: width,
            height: height,
          },
        ]}
      />
    </Modal>
  );
};
