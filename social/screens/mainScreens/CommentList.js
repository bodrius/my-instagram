import React from "react";
import { FlatList, Text, StyleSheet, Image, View } from "react-native";

const CommentList = ({ comments }) => {
  const image = {
    uri:
      "https://c7.hotpng.com/preview/134/30/572/quotation-mark-punctuation-computer-icons-quotation.jpg",
  };

  return (
    <FlatList
      data={comments}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <View style={styles.container}>
            <Image style={styles.image} source={image} />
            <Text style={styles.textComment}> {item.comment} </Text>
            <Image style={styles.imageRight} source={image} />
            <Image style={styles.avatarUser} source={{ uri: item.avatar }} />
            <Text style={styles.textName}> said: {item.userName}</Text>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    position: "absolute",
    top: 15,
    left: 100,
  },
  imageRight: {
    width: 30,
    height: 30,
    position: "absolute",
    top: 50,
    right: 90,
  },
  avatarUser: {
    width: 75,
    height: 75,
    position: "absolute",
    top: 15,
    left: 15,
    borderRadius: 20,
  },
  textComment: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 20,
    paddingTop: 30,
    fontWeight: "800",
  },
  textName: {
    fontStyle: "italic",
    fontSize: 17,
    textAlign: "right",
    paddingRight: 10,
    fontWeight: "600",
  },
  container: {
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
    marginHorizontal: 10,
  },
});

export default CommentList;
