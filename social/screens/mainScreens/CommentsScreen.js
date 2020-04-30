import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import CommentList from "./CommentList";
import { firestore } from "../../firebase/config";

export const CommentsScreen = ({ route }) => {
  const { avatar, userName } = useSelector((state) => state.user);

  const [value, setValue] = useState("");
  const [comments, setComments] = useState([]);

  const sendComment = async () => {
    await firestore
      .collection("posts")
      .doc(route.params.item.id)
      .collection("comments")
      .add({
        comment: value,
        avatar,
        userName,
      });

    setValue("");
  };

  const getCommentsForPost = async (id) => {
    await firestore
      .collection("posts")
      .doc(id)
      .collection("comments")
      .onSnapshot((data) => {
        setComments(
          data.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      });
  };

  useEffect(() => {
    getCommentsForPost(route.params.item.id);
  }, []);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
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
      <CommentList comments={comments} />
    </>
  );
};
