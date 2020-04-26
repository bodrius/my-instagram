import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, RefreshControl} from "react-native";
import { useDispatch } from "react-redux";
import { auth, firestore } from "../../firebase/config";
import { CollectionDrawing } from "../../components/CollectionDrawing";

export const PostsScreen = () => {
  const dispatch = useDispatch();

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    currentUser();
  }, []);

  useEffect(() => {
    getCollection();
  }, []);

  const currentUser = async () => {
    const currentUser = await auth.currentUser;

    // console.log("currentUser ----------------------> ", currentUser);

    
  };

  const getCollection = async () => {
    await firestore.collection("posts").onSnapshot((data) => {
      setAllPosts(
        data.docs.map((doc) => {
          // console.log(doc.id);
          return { ...doc.data(), id: doc.id};
        })
      );
    });
  };


  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  
    const [refreshing, setRefreshing] = React.useState(false);
  
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
  
      wait(1500).then(() => setRefreshing(false));
    }, [refreshing]);


  return (
    <View style={styles.container}>
       <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
      <View style={{ marginTop: 10 }}>
        <CollectionDrawing data={allPosts} />
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
