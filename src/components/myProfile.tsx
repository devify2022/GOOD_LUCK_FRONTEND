import React, { useState } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  Chip,
  TextInput,
  IconButton,
  Switch,
} from "react-native-paper";
import { styleConstants } from "../styles/constants"; // Assuming styleConstants is defined in your project

const ProfileCreation = ({ navigation }: { navigation: any }) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [bio, setBio] = useState("");
  const [smoking, setSmoking] = useState("No");
  const [drinking, setDrinking] = useState("No");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);

  const interests = ["Music", "Travel", "Sports", "Art"];
  const genderOptions = ["Men", "Women", "Both"];

  const handleImageUpload = () => {
    if (uploadedImages.length < 5) {
      setUploadedImages([...uploadedImages, "image_uri_here"]); // Replace with actual image upload logic
    }
  };

  const handleImageRemove = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const handleChipToggle = (
    chip: string,
    selectedChips: string[],
    setChips: (chips: string[]) => void
  ) => {
    setChips(
      selectedChips.includes(chip)
        ? selectedChips.filter((item) => item !== chip)
        : [...selectedChips, chip]
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainerStyle}>
          <IconButton icon="arrow-left" style={styles.icon} onPress={() => { }} />
          <Text style={styles.header}>Create Profile</Text>
        </View>
      <ScrollView contentContainerStyle={styles.container}>
      
        <Text style={styles.sectionHeader}>Profile Pictures</Text>

        <View style={styles.imagesGrid}>
          {uploadedImages.length < 5 && (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleImageUpload}
            >
              <IconButton icon="camera" size={40} style={styles.cameraIcon} />
            </TouchableOpacity>
          )}
          {uploadedImages.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image
                source={require("../assets/marketingOne.png")}
                style={styles.image}
              />
              <IconButton
                icon="close"
                size={20}
                style={styles.removeIcon}
                onPress={() => handleImageRemove(index)}
              />
            </View>
          ))}
        </View>

        {/* <Text style={styles.sectionHeader}>Habits</Text> */}
        <TextInput
          theme={{
            roundness: 60, // Custom border radius
            fonts: {
              regular: { fontFamily: styleConstants.fontFamily }, // Custom font family
            },

          }}
          // label="State"
          // value={drinking}
          mode="outlined"
          style={styles.input}
          outlineColor="#CCCCCC"
          placeholderTextColor={styleConstants.color.textGrayColor}
          placeholder="State"
        />
        <TextInput
          theme={{
            roundness: 60, // Custom border radius
            fonts: {
              regular: { fontFamily: styleConstants.fontFamily }, // Custom font family
            },
          }}
          // label="City"
          // value={drinking}
          mode="outlined"
          style={styles.input}
          outlineColor="#CCCCCC"
          placeholderTextColor={styleConstants.color.textGrayColor}
          placeholder="City"
        />
        <TextInput
          theme={{
            roundness: 60, // Custom border radius
            fonts: {
              regular: { fontFamily: styleConstants.fontFamily }, // Custom font family
            },
          }}
          // label="Pin"
          // value={drinking}
          mode="outlined"
          editable={true}
          style={styles.input}
          outlineColor="#CCCCCC"
          placeholderTextColor={styleConstants.color.textGrayColor}
          placeholder="Pin"
        />
        <TextInput
          theme={{
            roundness: 60, // Custom border radius
            fonts: {
              regular: { fontFamily: styleConstants.fontFamily }, // Custom font family
            },
          }}
          // label="Education"
          // value={drinking}
          mode="outlined"
          editable={true}
          style={styles.input}
          outlineColor="#CCCCCC"
          placeholderTextColor={styleConstants.color.textGrayColor}
          placeholder="Education"
        />

        <View style={styles.habitContainer}>
          <TextInput
            theme={{
              roundness: 60, // Custom border radius
              fonts: {
                regular: { fontFamily: styleConstants.fontFamily }, // Custom font family
              },
            }}
            outlineColor="#CCCCCC"
            // label="Smoking Habit"
            value={"Smoker"}
            textColor={styleConstants.color.textGrayColor}
            mode="outlined"
            editable={false}
            style={styles.input}
            right={
              <TextInput.Icon
                icon={() => (
                  <TouchableOpacity>
                    <Switch
                      onChange={() =>
                        setSmoking(smoking === "Yes" ? "No" : "Yes")
                      }
                      color={styleConstants.color.primaryColor}
                      style={[
                        styles.toggleButton,
                        smoking === "Yes" && styles.toggleButtonActive,
                      ]}
                      value={smoking === "Yes"}
                    />
                  </TouchableOpacity>
                )}
              />
            }
          />
          <TextInput
            theme={{
              roundness: 60, // Custom border radius
              fonts: {
                regular: { fontFamily: styleConstants.fontFamily }, // Custom font family
              },
            }}
            // label="Drinking Habit"
            outlineColor="#CCCCCC"
            value={"Drinker"}
            textColor={styleConstants.color.textGrayColor}
            mode="outlined"
            editable={false}
            style={styles.input}
            right={
              <TextInput.Icon
                icon={() => (
                  <TouchableOpacity>
                    <Switch
                      color={styleConstants.color.primaryColor}
                      onChange={() =>
                        setDrinking(drinking === "Yes" ? "No" : "Yes")
                      }
                      style={[
                        styles.toggleButton,
                        drinking === "Yes" && styles.toggleButtonActive,
                      ]}
                      value={drinking === "Yes"}
                    />
                  </TouchableOpacity>
                )}
              />
            }
          />
        </View>

        <Text style={styles.sectionHeader}>Interest</Text>
        <View style={styles.chipsContainer}>
          {interests.map((interest, index) => (
            <Chip
              key={index}
              style={[
                styles.chip,
                selectedInterests.includes(interest) && styles.chipSelected,
              ]}
              textStyle={[
                styles.chipText,
                selectedInterests.includes(interest) && styles.chipTextSelected,
              ]}
              onPress={() =>
                handleChipToggle(
                  interest,
                  selectedInterests,
                  setSelectedInterests
                )
              }
            >
              {interest}
            </Chip>
          ))}
        </View>

        <Text style={styles.sectionHeader}>Looking For</Text>
        <View style={styles.chipsContainer}>
          {genderOptions.map((option, index) => (
            <Chip
              key={index}
              style={[
                styles.chip,
                selectedGender.includes(option) && styles.chipSelected,
              ]}
              textStyle={[
                styles.chipText,
                selectedGender.includes(option) && styles.chipTextSelected,
              ]}
              onPress={() =>
                handleChipToggle(option, selectedGender, setSelectedGender)
              }
            >
              {option}
            </Chip>
          ))}
        </View>

        <TextInput
          // label="Bio"
          value={bio}
          onChangeText={setBio}
          mode="outlined"
          multiline
          style={styles.bioInput}
          theme={{
            roundness: 20, // Custom border radius
            fonts: {
              regular: { fontFamily: styleConstants.fontFamily }, // Custom font family
            },
          }}
          placeholder="Bio"
        />

        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("plans");
          }}
          style={styles.submitButton}
          contentStyle={styles.submitButtonContent}
          labelStyle={styles.submitButtonText}
        >
          Submit
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  headerContainerStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 5,
    
  },
  icon: {
    justifyContent: "space-between",
  },
  header: {
    fontSize: 24,
        fontWeight: "600",
        fontFamily: styleConstants.fontFamily,
        color: styleConstants.color.textBlackColor,
        marginLeft: 15,
  },
  sectionHeader: {
    fontSize: 18,
    fontFamily: styleConstants.fontFamily,
    color: styleConstants.color.textBlackColor,
    marginVertical: 8,
  },
  imagesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageContainer: {
    position: "relative",
    margin: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
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
  removeIcon: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  input: {
    marginVertical: 8,

  },
  bioInput: {
    marginBottom: 16,
    height: 100,
    justifyContent: "flex-start",
    flex: 1,
  },
  habitContainer: {
    marginBottom: 16,
  },
  toggleButton: {
    // borderRadius: 16,
    backgroundColor: styleConstants.color.transparent,
    borderWidth: 1,
    borderColor: styleConstants.color.primaryColor,
    marginRight: 12,
    width: "auto",
  },
  toggleButtonActive: {
    // backgroundColor: styleConstants.color.primaryColor,
  },
  toggleText: {
    color: styleConstants.color.primaryColor,
    fontFamily: styleConstants.fontFamily,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: styleConstants.color.primaryColor,
    backgroundColor: styleConstants.color.transparent,
  },
  chipSelected: {
    backgroundColor: styleConstants.color.primaryColor,
  },
  chipText: {
    color: styleConstants.color.primaryColor,
    fontFamily: styleConstants.fontFamily,
  },
  chipTextSelected: {
    color: styleConstants.color.textWhiteColor,
    fontFamily: styleConstants.fontFamily,
  },
  submitButton: {
    marginVertical: 16,
    backgroundColor: styleConstants.color.primaryColor,
    // height: "6%",
    alignItems: "center",
    borderRadius: 46,
    
  },
  submitButtonContent: {
    paddingVertical: 4,
    alignSelf: "center"
  },
  submitButtonText: {
    color: styleConstants.color.textWhiteColor,
    alignSelf: "center",
    fontFamily: styleConstants.fontFamily,
    fontSize: 18,
    fontWeight: "700"
  },
});

export default ProfileCreation;
