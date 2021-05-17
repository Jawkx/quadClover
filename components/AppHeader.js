import * as React from "react";
import { Appbar } from "react-native-paper";

export const AppHeader = (props) => {
  const { navigation, previous } = props;
  const screenName = props.scene.route.name;

  var title = "";
  var subtitle = "";
  switch (screenName) {
    case "home":
      title = "Quad Clover";
      subtitle = "by Jaw";
      break;
    case "board":
      title = "Board";
      subtitle = props.scene.route.params.title;
      break;
  }
  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} subtitle={subtitle} />
      <Appbar.Action icon="cog" onPress={() => {}} />
    </Appbar.Header>
  );
};
