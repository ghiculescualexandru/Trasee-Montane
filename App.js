/** React imports. */
import React, { Component, useRef } from "react";
/** React native imports. */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  ScrollView,
  Platform,
  Dimensions,
  Linking,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";
/** Expo imports. */
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
/** Other imports. */
import FadeInView from "react-native-fade-in-view";
import { LinearGradient } from "expo-linear-gradient";
/** My imports. */
import Logo from "./Logo";
import BlackFlatButton from "./BlackFlatButton";
import VeziDetaliiButton from "./VeziDetaliiButton";
import VeziTraseuButton from "./VeziTraseuButon";
import InapoiButton from "./InapoiButton";
/** Images. */
import welcomeScreenBgImg from "./assets/trasee-montane-header-image.jpg";
import alegeScreenBgImg from "./assets/holding-map-image.jpg";
import clockImg from "./assets/clock-3.png";
import hikeImg from "./assets/hike.png";
import markerImg from "./assets/marker.png";
import emailImg from "./assets/email.png";
/** Trails infos. */
import { trasee } from "./Trasee";
/** Stars. */
const stars = {
  5: require("./assets/5star.png"),
  4: require("./assets/4star.png"),
  2: require("./assets/2star.png"),
};
/** Globals. */
let list = trasee;
let index,
  maps = [];
/** Dimensions. */
const { width, height } = Dimensions.get("window");

export default class App extends Component {
  state = {
    header: false,
    isReady: false,
    inWelcomeScreen: true,
    inAlegeScreen: false,
    inPropuneScreen: false,
    inVeziDetalii: false,
    active: 0,
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        {this.generateHeader()}
        {this.generateWelcomeScreen()}
        {this.generateAlegeScreen()}
        {this.generateVeziDetaliiScreen()}
      </SafeAreaView>
    );
  }

  async _cacheResourcesAsync() {
    const images = [require("./assets/favicon.png")];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  }

  generateHeader = () => {
    if (!this.state.header) {
      return;
    }

    let toGoBackTo;
    if (this.state.inAlegeScreen) {
      toGoBackTo = "Home";
    } else if (this.state.inVeziDetalii) {
      toGoBackTo = "Alege traseu";
    }

    return (
      <View style={styles.header}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1, paddingLeft: 10, flexDirection: "row" }}>
            <Text onPress={this.goBackTo} style={styles.backArrow}>
              ←
            </Text>
            <Text onPress={this.goBackTo} style={styles.toGoBackTo}>
              {toGoBackTo}
            </Text>
          </View>
          <FadeInView style={{ flex: 1, paddingRight: 10 }}>
            <Image
              style={styles.mountainsIcon}
              source={require("./assets/mountains-icon.png")}
            />
          </FadeInView>
          <View style={{ flex: 1, paddingRight: 10 }}></View>
        </View>
      </View>
    );
  };

  goBackTo = () => {
    if (this.state.inAlegeScreen) {
      this.setState({
        header: false,
        inWelcomeScreen: true,
        inAlegeScreen: false,
      });
    }

    if (this.state.inVeziDetalii) {
      this.setState({
        header: true,
        inWelcomeScreen: false,
        inAlegeScreen: true,
        inVeziDetalii: false,
        active: 0,
      });
    }
  };

  generateWelcomeScreen = () => {
    if (!this.state.inWelcomeScreen) {
      return;
    }
    return (
      <ImageBackground
        style={styles.backgroundWelcomeScreen}
        source={welcomeScreenBgImg}
      >
        <Logo />
        <View style={styles.welcomeScreenButtons}>
          <BlackFlatButton
            text="Alege traseu"
            onPress={this.alegeTraseuPressed}
            img={markerImg}
          />
          <BlackFlatButton
            text="Propune traseu"
            onPress={this.propuneTraseuPressed}
            img={emailImg}
          />
        </View>
      </ImageBackground>
    );
  };

  alegeTraseuPressed = () => {
    this.setState({
      header: true,
      inWelcomeScreen: false,
      inAlegeScreen: true,
      inPropuneScreen: false,
    });
  };

  propuneTraseuPressed = () => {
    console.log("pressed.");
  };

  generateAlegeScreen = () => {
    if (!this.state.inAlegeScreen) {
      return;
    }

    return (
      <View style={styles.containerAlegeScreen}>
        {this.generateList()}
        <View style={styles.footer}>
          <BlackFlatButton
            text="Back"
            onPress={this.inapoiButtonInAlegeTraseuPressed}
          />
        </View>
      </View>
    );
  };
  componentDidUpdate() {
    if (this.state.inVeziDetalii) {
      window.scrollTo(0, 0);
    } else if (this.state.inAlegeScreen) {
      window.scrollTo(
        0,
        index * (height > width ? height * 0.3 : height * 0.45)
      );
    }
  }
  generateList = () => {
    let renderedList = list.map((t, idx) => {
      maps.push(t.coordinates);
      return (
        <TouchableOpacity onPress={() => this.VeziDetaliiButtonPressed(idx)}>
          <FadeInView style={styles.traseuContainer} key={idx}>
            <ImageBackground
              style={styles.traseuImage}
              imageStyle={{ borderRadius: 15 }}
              source={{ uri: t.imgLink }}
            >
              <LinearGradient
                style={styles.gradient}
                colors={["rgba(255,255,255,0.0)", "rgba(50,50,50,0.6)", "#000"]}
              >
                <VeziDetaliiButton
                  text={"Vezi detalii"}
                  onPress={() => this.VeziDetaliiButtonPressed(idx)}
                />
                <View style={styles.traseuStars}>
                  <Image
                    style={styles.traseuStarsImg}
                    source={stars[t.popularitate]}
                  />
                </View>
                <View stlye={styles.traseuText}>
                  <Text style={styles.traseuName}>{t.name}</Text>
                  <Text style={styles.traseuLocation}>{t.location}</Text>
                </View>
              </LinearGradient>
            </ImageBackground>
          </FadeInView>
        </TouchableOpacity>
      );
    });

    return (
      <FadeInView style={styles.listContainer}>
        <ScrollView>{renderedList}</ScrollView>
      </FadeInView>
    );
  };

  VeziDetaliiButtonPressed = (idx) => {
    index = idx;
    console.log(idx + " " + index);
    this.setState({
      inWelcomeScreen: false,
      inAlegeScreen: false,
      inPropuneScreen: false,
      inVeziDetalii: true,
    });
  };

  generateVeziDetaliiScreen = () => {
    if (!this.state.inVeziDetalii) {
      return;
    }
    console.log(width);
    return (
      <SafeAreaView>
        <FadeInView style={styles.traseuDetaliiContainer}>
          {/* <ScrollView> */}
          {/* <Image
              style={styles.traseuDetaliiImage}
              source={{ uri: list[index].imgLink }}
            /> */}
          <View>
            <ScrollView
              showsHorizontalScrollIndicator={height > width ? false : false}
              pagingEnabled={height > width ? true : false}
              horizontal
              onScroll={this.changeDot}
              style={(width, height)}
            >
              {list[index].images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={styles.carouselImage}
                />
              ))}
            </ScrollView>
            {this.generateDots()}
          </View>
          <View style={styles.durataDificultate}>
            <View style={styles.durata}>
              <Image style={styles.durataImage} source={clockImg} />
              <Text style={styles.durataText}>{list[index].durata}</Text>
            </View>
            <View style={styles.dificultate}>
              <Image style={styles.dificultateImage} source={hikeImg} />
              <Text style={styles.dificultateText}>
                {list[index].dificultate}
              </Text>
            </View>
          </View>
          <View style={styles.numeZona}>
            <Text style={styles.traseuDetaliiNume}>{list[index].name}</Text>
            <Text style={styles.traseuDetaliiZona}>{list[index].location}</Text>
            <View style={styles.popularitate}>
              <Image
                style={styles.popularitateImage}
                source={stars[list[index].popularitate]}
              />
              {/* <Text style={styles.popularitateText}>/5</Text> */}
            </View>
          </View>
          <View style={styles.detaliiDetalii}>
            <Text style={styles.detaliiText}>{list[index].details}</Text>
          </View>
          <View style={styles.detaliiButtons}>
            <VeziTraseuButton
              text="Deschide traseu"
              onPress={() => this.openMaps()}
            />
            <InapoiButton
              text="Back"
              onPress={this.inapoiButtonInVeziDetaliiPressed}
            />
          </View>
          {/* </ScrollView> */}
        </FadeInView>
      </SafeAreaView>
    );
  };

  generateDots = () => {
    if (height > width) {
      return (
        <View style={styles.dotsContainer}>
          {list[index].images.map((i, index) => (
            <Text
              key={index}
              style={
                index == this.state.active ? styles.dotsActive : styles.dots
              }
            >
              ⬤
            </Text>
          ))}
        </View>
      );
    }

    return;
  };

  changeDot = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );

    if (slide !== this.state.active) {
      this.setState({ active: slide });
    }
  };

  openMaps = () => {
    console.log("ceva");
    Linking.openURL(maps[index]);
  };

  inapoiButtonInAlegeTraseuPressed = () => {
    this.setState({
      header: false,
      inWelcomeScreen: true,
      inAlegeScreen: false,
      inPropuneScreen: false,
    });
  };

  inapoiButtonInVeziDetaliiPressed = () => {
    this.setState({
      inWelcomeScreen: false,
      inAlegeScreen: true,
      inPropuneScreen: false,
      inVeziDetalii: false,
      active: 0,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundWelcomeScreen: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  containerAlegeScreen: {
    // top: 20,
    top: Platform.OS == "android" ? 20 : 0,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#E8E8E8",
  },
  containerVeziDetaliiScreen: {
    // flex: 1,
    // justifyContent: "flex-end",
    // alignItems: "center",
  },
  backgroundAlegeScreen: {
    width: "100%",
  },
  welcomeScreenBgImg: {
    borderWidth: 50,
    borderColor: "red",
    width: "100%",
  },
  welcomeScreenButtons: {
    bottom: 10,
  },
  footer: {
    // backgroundColor: "red",
    // height: 50,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  footerText: {
    color: "black",
  },
  alegeUnTraseuText: {
    color: "white",
    fontSize: 20,
    bottom: 15,
  },
  traseuContainer: {
    // borderWidth: 1,
    // borderColor: "red",
    width: height > width ? width * 0.8 : width * 0.5,
  },
  traseuImage: {
    width: "100%",
    height: height > width ? height * 0.3 : height * 0.45,
    borderRadius: 50,

    marginBottom: 30,
  },
  traseuName: {
    bottom: 0,
    color: "white",
    // fontFamily: "YesevaOne-Regular",
    fontSize: height > width ? width * 0.055 : width * 0.035,
    marginLeft: 10,
  },
  traseuLocation: {
    bottom: 0,
    color: "white",
    // fontFamily: "YesevaOne-Regular",
    fontSize: height > width ? width * 0.035 : width * 0.02,
    marginLeft: 10,
    marginBottom: 2,
  },
  traseuStarsImg: {
    width: height > width ? 60 : 100,
    height: height > width ? 10 : 20,
    marginLeft: 10,
    marginBottom: 5,
  },
  listContainer: {
    top: 20,
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 60,
  },
  gradient: {
    height: "100%",
    flexDirection: "column-reverse",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

  traseuDetaliiContainer: {
    // top: 20,
    // top: Platform.OS == "android" ? 20 : 0,
    // flex: 1,
    justifyContent: "flex-end",
    // backgroundColor: "#E8E8E8",
    // alignItems: "center",
  },
  traseuDetaliiImage: { width: "100%", height: 200 },
  durataDificultate: {
    flexDirection: "row",
    marginBottom: 20,
  },
  carouselImage: {
    width: height > width ? width : width * 0.25,
    height: height > width ? height * 0.3 : height * 0.5,
    resizeMode: "cover",
  },
  durata: {
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 20,
  },
  durataImage: {
    width: 20,
    height: 20,
  },
  durataText: {
    fontSize: 15,
    marginLeft: 10,
  },
  dificultate: {
    flexDirection: "row",
    marginLeft: 30,
    marginTop: 20,
  },
  dificultateImage: {
    width: 20,
    height: 20,
  },
  dificultateText: {
    fontSize: 15,
    marginLeft: 10,
  },
  popularitate: {
    marginTop: 10,
    marginLeft: 0,
    marginBottom: 5,
    flexDirection: "row",
  },
  popularitateImage: {
    width: 120,
    height: 20,
  },
  popularitateText: {
    fontSize: 18,
  },
  numeZona: {
    marginLeft: 20,
  },
  traseuDetaliiNume: {
    fontSize: height > width ? 28 : width * 0.03,
  },
  traseuDetaliiZona: {
    fontSize: height > width ? 18 : width * 0.02,
  },
  detaliiDetalii: {
    marginTop: 5,
    marginLeft: 20,
    width: "90%",
  },
  detaliiText: {
    fontSize: height > width ? 15 : width < 800 ? 13 : width * 0.015,
    // fontFamily: "Gidolinya-Regular",
  },
  footerInVeziDetalii: {
    position: "absolute",
    left: 0,
    right: 0,
    // top: Dimensions.get("window").height - 40,
    // bottom: 0,
    alignItems: "center",
  },
  detaliiButtons: {
    flexDirection: "row",
    // alignItems: "center",
    // alignContent: "center",
    justifyContent: "center",
    // backgroundColor: "red",
    marginTop: 10,
    marginBottom: 10,
  },
  mapsIcon: {
    marginLeft: 20,
    width: 50,
    height: 50,
  },
  dotsContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  dots: {
    color: "#888",
    margin: 3,
  },
  dotsActive: {
    color: "#fff",
    margin: 3,
  },

  header: {
    width: "100%",
    height: 50,
    backgroundColor: "black",
    flexDirection: "row",
  },

  backArrow: {
    fontSize: 20,
    color: "white",
    marginLeft: 5,
    alignSelf: "center",
  },
  toGoBackToContainer: {
    // backgroundColor: "red",
  },
  toGoBackTo: {
    fontSize: 13,
    color: "white",
    alignSelf: "center",
    marginLeft: 5,
    // marginTop: 17,
    textDecorationLine: "underline",
    // backgroundColor: "red",
  },
  mountainsIconContainer: {
    // backgroundColor: "red",
    width: "70%",
  },
  mountainsIcon: {
    width: 50,
    height: 50,
    alignSelf: "center",
    // marginRight: 5,
  },
});
