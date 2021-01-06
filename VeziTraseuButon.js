import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";

import FadeInView from "react-native-fade-in-view";
import mapsIcon from "./assets/google-maps.png";

const VeziTraseuButton = ({ text, onPress, img }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FadeInView style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
        {/* <Image style={styles.mapsIcon} source={mapsIcon} /> */}
      </FadeInView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 0,
  },
  button: {
    borderRadius: 15,
    paddingVertical: 14,
    // paddingHorizontal: 10,
    backgroundColor: "#CD5C5C",
    width: 150,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    // textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
  marker: {
    left: 5,
    width: 20,
    height: 20,
  },
  mapsIcon: {
    marginLeft: 20,
    width: 20,
    height: 20,
  },
});

export default VeziTraseuButton;
