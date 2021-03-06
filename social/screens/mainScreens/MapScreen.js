import React from "react";
import { View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ route }) => (
  <View>
    <MapView style={{ width: "100%", height: "100%" }} minZoomLevel={5}>
      <Marker
        title="like photo"
        coordinate={{
          latitude: route.params.info.location.latitude,
          longitude: route.params.info.location.longitude,
        }}
      >
        <Image
          style={{
            width: 30,
            height: 30,
            marginBottom: 10,
            borderRadius: 10,
          }}
          source={{ uri: route.params.info.image }}
        />
      </Marker>
    </MapView>
  </View>
);
