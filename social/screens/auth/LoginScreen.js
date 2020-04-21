import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import { auth } from "../../firebase/config";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = ({ navigation }) => {

  
  const [state, setState] = useState(initialState);
  
  const loginUser = async () => {
    const { email, password } = state;
    // console.log("email", email);
    // console.log("password", password);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      
    } catch (error) {
      console.log(error);
    }
   
  };

  return (
   
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{flex: 1}}
    >
    <View style={styles.container}>

      <View style={{ ...StyleSheet.absoluteFill }}>
        <Image
          source={ {uri:"https://iphonepapers.com/wp-content/uploads/papers.co-nd76-mountain-nature-sky-cloud-wood-fog-33-iphone6-wallpaper-1-250x444.jpg"}}
          style={{ flex: 1, width: null, height: null }}
        />
      </View>
      
        <Text style={styles.text}>MY INSTAGRAM</Text>
     
      <View style={styles.form}>

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
        <TouchableOpacity style={styles.btn} onPress={loginUser}>
          <Text style={styles.btnTitle}>Login</Text>
        </TouchableOpacity>
      </View>

<TouchableOpacity onPress={() => navigation.navigate("Register")}>
<Text style={styles.register}>Not registered yet? Press here.</Text>
</TouchableOpacity>
      
    </View>
</KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  register:{
    fontSize:17,
    marginTop:15,
  },
  form: {
    alignItems: "center",
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
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    fontSize: 30,
    fontWeight:"600"
  },
  text:{
    fontSize:35,
    fontWeight:"800",
    marginBottom:50
  }
});
