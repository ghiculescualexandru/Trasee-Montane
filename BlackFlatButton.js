import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";

import FadeInView from "react-native-fade-in-view";

const BlackFlatButton = ({ text, onPress, img }) => {
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
    marginBottom: 10,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "black",
    width: 300,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
  marker: {
    left: 20,
    width: 20,
    height: 20,
  },
});

export default BlackFlatButton;
