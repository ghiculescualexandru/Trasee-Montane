import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";

import FadeInView from "react-native-fade-in-view";

const InputBoxes = () => {
  return (
    <KeyboardAvoidingView style={styles.inputTextBoxes}>
      <FadeInView>
        <TextInput
          style={{
            height: 40,
            borderColor: "#236B8E",
            borderWidth: 2,
            borderBottomWidth: 0,
          }}
          onChangeText={(text) => (emailAdress = text)}
          placeholder="   Adresa email: "
        />
        <TextInput
          style={{ height: 40, borderColor: "#236B8E", borderWidth: 2 }}
          onChangeText={(text) => (name = text)}
          placeholder="   Nume si prenume: "
        />
        <TextInput
          style={{
            height: 100,
            borderColor: "#236B8E",
            borderWidth: 2,
            borderTopWidth: 0,
            borderBottomWidth: 0,
          }}
          onChangeText={(text) => (name = text)}
          placeholder="   Detalii: "
        />
      </FadeInView>
      <FadeInView style={styles.trimiteButton}>
        <Text style={styles.trimiteText} onPress={trimiteButtonPressed}>
          Trimite
        </Text>
      </FadeInView>
    </KeyboardAvoidingView>
  );
};

const trimiteButtonPressed = () => {
  alert("Mesaj trimis!");
  handleEmail();
};

const handleEmail = () => {
  /** TODO: handle email. */
};

const styles = StyleSheet.create({
  inputTextBoxes: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
  },
  trimiteButton: {
    width: "100%",
    height: 70,
    backgroundColor: "#0198E1",
    alignItems: "center",
    justifyContent: "center",
  },
  trimiteText: {
    color: "#fff",
    fontSize: 30,
  },
});

export default InputBoxes;
