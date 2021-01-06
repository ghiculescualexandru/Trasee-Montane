/** React imports. */
import React from "react";
/** React native imports. */
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
} from "react-native";
/** My imports. */
import FadeInView from "react-native-fade-in-view";
/** Dimensions. */
const { width, height } = Dimensions.get("window");

const VeziDetaliiButton = ({ text, onPress, img }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FadeInView style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </FadeInView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginLeft: 10,
  },
  button: {
    borderRadius: 15,
    paddingVertical: height > width ? 0 : 3,
    // paddingHorizontal: 10,
    backgroundColor: "#CD5C5C",
    width: height > width ? 90 : width * 0.115,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    // textTransform: "uppercase",
    fontSize: height > width ? 12 : width * 0.01,
    textAlign: "center",
  },
  marker: {
    left: 20,
    width: 20,
    height: 20,
  },
});

export default VeziDetaliiButton;
