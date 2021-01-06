import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";

import FadeInView from "react-native-fade-in-view";

const InapoiButton = ({ text, onPress, img }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FadeInView style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
        <Image style={styles.marker} source={img}></Image>
      </FadeInView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: 12,
    marginLeft: 20,
    // marginTop: 12,
  },
  button: {
    borderRadius: 16,
    paddingVertical: 14,
    // paddingHorizontal: 10,
    backgroundColor: "#4c4c4c",
    width: 100,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    // textTransform: "uppercase",
    fontSize: 14,
    textAlign: "center",
  },
  marker: {
    left: 20,
    width: 20,
    height: 20,
  },
});

export default InapoiButton;
