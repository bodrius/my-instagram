import React from "react";
import { FlatList, Text, StyleSheet, Image } from "react-native";

const CommentList = ({ comments }) => {
  return (
      
    <FlatList
      data={comments}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => {
        return (
        <>
        <Text>{item.comment}</Text>
        <Text>{item.userName}</Text>
        </>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
    image: {
      width: 50,
      height:50
    },
  });

export default CommentList;
