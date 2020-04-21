import React, { useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { firestore } from "../firebase/config";

export const CollectionDrawing = ({ data }) => {
  const navigation = useNavigation();

  // console.log("navigation", navigation);

  const getCurrentUserPost = async (id) => {
    const data = await firestore.collection("posts").doc(id).get();
    // console.log("data.data()", data);
    await firestore
      .collection("posts")
      .doc(id)
      .update({
        likes: Number(data.data().likes) + 1,
      });
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item, indx) => indx.toString()}
      renderItem={({ item }) => {
        // console.log("post", item);
        return (
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 2,
              marginBottom: 10,
              paddingBottom: 10,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Map", { info: item })}
              style={styles.postContainer}
            >
              <Ionicons
                style={{ position: "absolute", top: 160, left: 15 }}
                name="md-map"
                size={45}
                color={"red"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.like}
              onPress={() => getCurrentUserPost(item.id)}
            >
              <Ionicons
                style={{ position: "absolute", top: 80, left: 15 }}
                name="ios-heart-empty"
                size={45}
                color={"red"}
              />
              <Text
                style={{
                  position: "absolute",
                  top: 93,
                  left: 24,
                  fontSize: 15,
                  fontWeight: "700",
                  color: "red",
                }}
              >
                {item.likes}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              // style={styles.like}
              onPress={() => navigation.navigate("Comments", { item })}
            >
              <Ionicons
                style={{ position: "absolute", top: 0, left: 15 }}
                name="ios-chatbubbles"
                size={45}
                color={"red"}
              />
            </TouchableOpacity>

            <Image style={styles.image} source={{ uri: item.image }} />
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginLeft: 70,
  },
});

//----------
