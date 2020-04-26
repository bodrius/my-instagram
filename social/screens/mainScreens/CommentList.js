import React from "react";
import { FlatList, Text } from "react-native";

const CommentList = ({ comments }) => {
  console.log("NEEEDDDDDeeeddddd---->>>>>", comments);
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

export default CommentList;
