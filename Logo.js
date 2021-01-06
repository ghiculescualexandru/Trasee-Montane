/** React imports. */
import React from "react";
/** React native imports. */
import { StyleSheet, Image, Text, Dimensions } from "react-native";
/** My imports. */
import FadeInView from "react-native-fade-in-view";
/** Images. */
import logoImage from "./assets/logo.png";
/** Dimensions */
const { width, height } = Dimensions.get("window");

const Logo = () => {
  return (
    <FadeInView style={styles.logoContainer}>
      <Image style={styles.logo} source={logoImage} />
      <Text style={styles.logoText}>Trasee montane</Text>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    position: "absolute",
    top: 30,
    alignItems: "center",
  },
  logo: {
    width: height > width ? 100 : width * 0.15,
    height: height > width ? 100 : height * 0.15,
  },
  logoText: {
    color: "#fff",
    fontSize: height > width ? width * 0.07 : width * 0.025,
    fontWeight: "600",
    backgroundColor: "#F88379",
    backgroundColor: "rgba(248,131,121, 0.8)",
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "rgba(248,131,121, 0.1)",
    // fontFamily: "Sarpanch",
  },
});

export default Logo;
