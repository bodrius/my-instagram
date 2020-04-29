import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { CollectionDrawing } from "../../components/CollectionDrawing";
import { useSelector } from "react-redux";
import { auth, firestore, storage } from "../../firebase/config";

export const ProfileScreen = () => {
  const [currentUserPost, setcurrentUserPost] = useState([]);
  const { userId, avatar, userName } = useSelector((state) => state.user);
  const [displayAvatar, setDisplayAvatar] = useState("https://png.pngtree.com/svg/20161027/631929649c.png")



  useEffect(() => {
    getCurrentUserPosts();
    createAvatar(avatar);
  }, [userId]);

  const createAvatar = async (img) => {
    const response = await fetch(img);
    const file = await response.blob();
    const uniqueId = Date.now().toString();
    await storage.ref(`avatars/${uniqueId}`).put(file);
    const url = await storage.ref("avatars").child(uniqueId).getDownloadURL();
    setDisplayAvatar(url)
  };


  const getCurrentUserPosts = async () => {
    await firestore
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setcurrentUserPost(data.docs.map((doc) => doc.data()))
      );
  };

  const signOut = async () => {
    await auth.signOut();
    dispatch({ type: "USER_SIGNOUT" });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity  style={{ position:"absolute", right:10, top:30,}}onPress={signOut}>
  <Text style={{fontWeight:"800", color:"#1e90ff", fontSize:20}}>LogOut</Text>
      </TouchableOpacity>
      <Image style={{width:150, height:150, position:"absolute", top:70, left:10, borderRadius:10}} source={{uri:displayAvatar}}/> 
      <Text style={{position:"absolute", top:70, left:220, fontWeight:"600", fontSize:20}}> Welcome {userName}!</Text>
      <View style={{ marginTop: 240 }}>
        <Text style={{fontSize:30, fontWeight:"600", textAlign:"center", marginBottom:20, fontStyle:"italic"}}>Your posts</Text>
        <CollectionDrawing data={currentUserPost} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
