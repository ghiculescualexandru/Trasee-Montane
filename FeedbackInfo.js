import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  Linking,
} from "react-native";
import FadeInView from "react-native-fade-in-view";

import holdingMapBgImage from "./images/holding-map-image.jpg";

const FeedbackInfo = () => {
  return (
    // <ProgressiveImage></ProgressiveImage>
    <ImageBackground style={styles.background} source={holdingMapBgImage}>
      <FadeInView style={styles.propuneTraseuInformativeTextContainer}>
        <Text style={styles.propuneTraseuInformativeText}>
          Lasa-ne sa aflam experienta ta. Scrie-ne mai jos detaliile si iti
          promitem ca traseul tau va fi adaugat in cel mai scurt timp!
        </Text>
      </FadeInView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  propuneTraseuInformativeTextContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  propuneTraseuInformativeText: {
    // width: "80%",
    fontWeight: "400",
    fontSize: 35,
    paddingBottom: 20,
    color: "white",
    fontStyle: "italic",
    textAlign: "center",
  },
});

export default FeedbackInfo;
