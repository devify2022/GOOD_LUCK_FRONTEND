import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

interface IImageProps {
  uri: string;
  style?: any;
  headerText?: string;
  subText?: string;
}

const ImageWithOverlayText = (props: IImageProps) => {
  const defaultStyles = StyleSheet.create({
    imageContainer: {
      width: "95%",
      borderRadius: 20,
      overflow: "hidden",
      position: "relative",
    },
    image: {
      width: "100%",
      borderRadius: 20,
    },
    textOverlay: {
      position: "absolute",
      bottom: 50,
      left: 20,
      right: 20,
      paddingVertical: 10,
      alignItems: "flex-end",
    },
    headerText: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#FFF",
    },
    subText: {
      fontSize: 16,
      color: "#FFF",
    },
  });

  const styles = props.style
    ? { ...defaultStyles, ...props.style }
    : defaultStyles;

  return (
    <View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: props.uri }} style={styles.image} />
        <View style={styles.textOverlay}>
          {props.headerText && (
            <Text style={styles.headerText}>{props.headerText}</Text>
          )}
          {props.subText && <Text style={styles.subText}>{props.subText}</Text>}
        </View>
      </View>
    </View>
  );
};

export default ImageWithOverlayText;
