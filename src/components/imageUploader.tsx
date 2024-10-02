import React, { useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  CameraOptions,
  ImageLibraryOptions,
} from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import { styleConstants } from "../styles/constants";
import { IconButton } from "react-native-paper";
import { Image } from "react-native-svg";

const UploadScreen: React.FC = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [transferred, setTransferred] = useState<number>(0);
  const [selectedImage, setSelectedImage] =
    useState<ImagePickerResponse | null>(null);

  const selectImageFromCamera = async () => {
    try {
      const cameraOptions: CameraOptions = {
        mediaType: "photo",
        maxWidth: 2000,
        maxHeight: 2000,
        saveToPhotos: true,
      };

      const response = await launchCamera(cameraOptions);
      handleImageResponse(response);
    } catch (error) {
      console.error("Error launching camera:", error);
      Alert.alert("Error", "Failed to launch the camera.");
    }
  };

  const selectImageFromGallery = async () => {
    try {
      const galleryOptions: ImageLibraryOptions = {
        mediaType: "photo",
        maxWidth: 2000,
        maxHeight: 2000,
      };

      const response = await launchImageLibrary(galleryOptions);
      handleImageResponse(response);
    } catch (error) {
      console.error("Error launching image library:", error);
      Alert.alert("Error", "Failed to open the image library.");
    }
  };

  const handleImageResponse = async (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log("User cancelled image picker");
    } else if (response.errorCode) {
      console.log("ImagePicker Error: ", response.errorMessage);
    } else if (response.assets && response.assets[0].uri) {
      const source = { uri: response.assets[0].uri };
      setSelectedImage(response);
      console.log(source);
      const responseURl = await uploadImageToFirebase(source.uri);
      console.log(response);
    }
  };

  const uploadImageToFirebase = async (uri: string) => {
    try {
      // Generate a unique filename for the image
      const filename = uri.substring(uri.lastIndexOf("/") + 1);
      const reference = storage().ref(filename);

      // Start the file upload
      const task = reference.putFile(uri);

      // Monitor upload progress
      task.on("state_changed", (taskSnapshot) => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
        );
      });

      // When upload completes
      await task;

      // Get the download URL
      const downloadURL = await reference.getDownloadURL();
      console.log("Image uploaded to Firebase:", downloadURL);
      Alert.alert("Upload Successful", "Image has been uploaded to Firebase!");
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Upload Failed", "Something went wrong while uploading.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={selectImageFromCamera}
      >
        <IconButton icon="camera" size={40} style={styles.cameraIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.uploadButton}
        onPress={selectImageFromGallery}
      >
        <IconButton icon="folder" size={40} style={styles.cameraIcon} />
      </TouchableOpacity>

      {/* {selectedImage && (
        <Image
          source={{ uri: selectedImage.assets[0].uri }}
          style={styles.selectedImage}
        />
      )} */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    display: "flex",
    flexDirection: "row",
  },
  uploadButton: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: styleConstants.color.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
  },
  cameraIcon: {
    alignSelf: "center",
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default UploadScreen;
