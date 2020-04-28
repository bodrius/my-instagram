import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import { auth } from "../../firebase/config";

const initialState = {
  email: "",
  password: "",
  displayName: "",
};

export const RegisterScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [message, setmessage] = useState(null);
  const [avatar, setAvatar] = useState("https://png.pngtree.com/svg/20161027/631929649c.png");
  const dispatch = useDispatch();
  useEffect(() => {
    getPermissionAsync();
  }, []);

  const getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log("result", result);
    setAvatar(result.uri);
  };

  const currentState = () => {
    // console.log("state", state);
    Alert.alert(JSON.stringify(state));
    setState(initialState);
  };

  // useEffect(() => {
  //   currentUser();
  // }, []);

  const currentUser = async () => {
    const currentUser = await auth.currentUser;

    dispatch({
      type: "CURRENT_USER",
      payload: {
        userName: currentUser.displayName,
        userId: currentUser.uid,
        avatar: currentUser.photoURL,
      },
    });
    // console.log("currentUser", currentUser);
  };

  const registerUser = async () => {
    const { email, password, displayName } = state;
    try {
      const user = await auth.createUserWithEmailAndPassword(email, password);
      // console.log("user", user);
      await user.user.updateProfile({
        displayName: displayName,
        photoURL: avatar,
      });
    } catch (error) {
      console.log(error);
      setmessage(error.message);
    }
    currentUser()
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{flex: 1}}
    >
    <View style={styles.container}>
      <View style={{ ...StyleSheet.absoluteFill }}>
        
        <Image
          source={{uri:"https://wallpapers.net/colourful-bubbles-4k-hd-abstract-wallpaper/download/750x1334.jpg"}}
          style={{ flex: 1, width: null, height: null }}
          />
         
      </View>
      <Text style={{marginBottom:10}}>Choose your avatar</Text>
      <View style={styles.form}>
      
        <TouchableOpacity onPress={takePhoto} activeOpacity={0.3}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              position:"absolute",
              top:-130,
              right:-50
            }}
            source={{
              uri:
              avatar,
            }}
          />
        </TouchableOpacity>
      
        <TextInput
          style={{ ...styles.input, marginBottom: 20 }}
          placeholder="Enter your nick name"
          value={state.displayName}
          onChangeText={(value) => setState({ ...state, displayName: value })}
        />
        <TextInput
          style={{ ...styles.input, marginBottom: 20 }}
          placeholder="Enter email"
          value={state.email}
          onChangeText={(value) => setState({ ...state, email: value })}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(value) => setState({ ...state, password: value })}
          value={state.password}
        />
        
        {message && <Text>{message}</Text>}
        <TouchableOpacity style={styles.btn} onPress={registerUser}>
          <Text style={styles.btnTitle}>Register</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
<Text style={styles.register}>Go to login</Text>
</TouchableOpacity>

    </View>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop:100,
  },
  form: {
    alignItems: "center",
  },
  register:{
    fontSize:17,
    marginTop:15,
    color:"white"
  },
  input: {
    borderWidth:1,
    borderColor:"black",
    borderRadius:20,
    width: 320,
    height: 50,
    paddingLeft: 40,
    backgroundColor: "white",
    fontSize:20
  },
  btn: {
    borderWidth:1,
    borderColor:"black",
    borderRadius:20,
    width: 200,
    height: 50,
    textAlign:"center",
    backgroundColor: "white",
    fontSize:20,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    fontSize: 30,
    fontWeight:"600"
  },
});
