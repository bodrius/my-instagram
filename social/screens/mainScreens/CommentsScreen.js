import React, { useState } from "react";

import { firestore } from "../../firebase/config";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

export const CommentsScreen = ({route}) => {
 
  const [value, setValue] = useState("");
  // console.log("NEEDS",route)


  const sendComment = async () => {
      await firestore
    .collection("posts")
    .doc(route.params.item.id)
    .collection("comments")
    .add({
      comment:value,
    });

    setValue("");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 20,
            width: 320,
            height: 50,
            paddingLeft: 40,
            backgroundColor: "white",
            fontSize: 20,
          }}
          placeholder="Enter your comment"
          onChangeText={setValue}
          value={value}
        />
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "black",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 20,
              width: 200,
              height: 50,
              textAlign: "center",
              backgroundColor: "white",
              marginTop: 20,
              marginBottom: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={sendComment}
          >
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              Create comment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
