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
import { useNavigation } from "@react-navigation/native";
import UploadScreen from "./imageUploader";
import useMatrimonyServices from "../hooks/useMatrimonyServices";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
interface IProfileDetails {
  name?: string;
  state?: string;
  city?: string;
  pin?: string;
  education?: string;
  age?: string;
  caste?: string;
  salary?: string;
  whatsappno?: string;
  fblink?: string;
}

const ProfileCreation = ({ route }: { route: any }) => {
  console.log(route.params);
  const currentFlow = useSelector(
    (state: RootState) => state.auth.userDetails?.currentFlow
  );
  const { createOwnMatrimonyProfile } = useMatrimonyServices();
  const imageNumber = route?.params?.type === "dating" ? 5 : 1;
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [bio, setBio] = useState("");
  const [isDivorcee, setIsDivorcee] = useState("No");
  const [smoking, setSmoking] = useState("No");
  const [drinking, setDrinking] = useState("No");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [userDetails, setuserDetails] = useState<IProfileDetails>();

  const navigation = useNavigation<any>();

  const interests = [
    "Badminton",
    "Football",
    "Cricket",
    "MakeUp",
    "Dance",
    "Yoga",
    "Meditation",
    "Swimming",
    "Movie",
    "Party",
  ];
  const genderOptions =
    route?.params?.type === "dating"
      ? ["Men", "Women", "Both"]
      : ["Bride", "Groom"];

  const handleImageUpload = () => {
    if (uploadedImages.length < imageNumber) {
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
    if (
      (chip === "Bride" || chip === "Groom") &&
      route?.params?.type === "matrimony"
    ) {
      setChips([chip]);
      return;
    }
    setChips(
      selectedChips.includes(chip)
        ? selectedChips.filter((item) => item !== chip)
        : [...selectedChips, chip]
    );
  };

  const handleValueUpdate = (text: string, type: string) => {
    setuserDetails((prev) => ({ ...prev, [type]: text }));
  };

  const handleButtonCLick = () => {
    if (route.params.type === "matrimony") {
      const payload = {
        Fname: userDetails?.name?.split(" ")[0],
        Lname: userDetails?.name?.split(" ")[1] ?? "",
        photo: uploadedImages,
        city: userDetails?.city,
        state: userDetails?.state,
        salary: userDetails?.salary,
        age: parseInt(userDetails?.age ?? ""),
        subscribed: false,
        subs_plan_name: "Basic plan",
        subs_start_date: new Date().toISOString(),
        bio,
        isDivorce: isDivorcee === "Yes",
        pending_likes_id: "64e4b3a1f5e45b8d9b2c5f7d",
        sent_likes_id: "64e4b3aaf5e45b8d9b2c5f7e",
        cast: userDetails?.caste,
        searching_for: selectedGender[0].toLowerCase(),
        gender: selectedGender[0].toLowerCase() === "bride" ? "Male" : "Female",
        interests: selectedInterests[0].toLowerCase(),
      };

      console.log(payload);

      createOwnMatrimonyProfile(payload);
    } else {
      navigation.navigate("datingplans");
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainerStyle}>
        <IconButton
          icon="arrow-left"
          style={styles.icon}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.header}>
          {route?.params?.type === "matrimony"
            ? "Create matrimony profile "
            : "Create dating profile"}
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionHeader}>Profile Pictures</Text>

        <View style={styles.imagesGrid}>
          {uploadedImages.length < imageNumber && (
            // <TouchableOpacity
            //   style={styles.uploadButton}
            //   onPress={handleImageUpload}
            // >
            //   <IconButton icon="camera" size={40} style={styles.cameraIcon} />
            // </TouchableOpacity>
            <UploadScreen />
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
          // label="City"
          // value={drinking}
          mode="outlined"
          style={styles.input}
          outlineColor="#CCCCCC"
          placeholderTextColor={styleConstants.color.textGrayColor}
          placeholder="Name"
          value={userDetails?.name}
          onChangeText={(text: string) => {
            handleValueUpdate(text, "name");
          }}
        />
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
          value={userDetails?.state}
          onChangeText={(text: string) => {
            handleValueUpdate(text, "state");
          }}
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
          value={userDetails?.city}
          onChangeText={(text: string) => {
            handleValueUpdate(text, "city");
          }}
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
          value={userDetails?.pin}
          onChangeText={(text: string) => {
            handleValueUpdate(text, "pin");
          }}
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
          value={userDetails?.education}
          onChangeText={(text: string) => {
            handleValueUpdate(text, "education");
          }}
        />

        {route?.params?.type === "matrimony" && (
          <>
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
              placeholder="Age"
              value={userDetails?.age}
              onChangeText={(text: string) => {
                handleValueUpdate(text, "age");
              }}
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
              placeholder="Caste"
              value={userDetails?.caste}
              onChangeText={(text: string) => {
                handleValueUpdate(text, "caste");
              }}
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
              placeholder="Salary"
              value={userDetails?.salary}
              onChangeText={(text: string) => {
                handleValueUpdate(text, "salary");
              }}
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
              placeholder="Whatsapp number"
              value={userDetails?.whatsappno}
              onChangeText={(text: string) => {
                handleValueUpdate(text, "whatsappno");
              }}
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
              placeholder="Facebook link"
              value={userDetails?.fblink}
              onChangeText={(text: string) => {
                handleValueUpdate(text, "fblink");
              }}
            />
          </>
        )}

        <View style={styles.habitContainer}>
          {route?.params?.type === "matrimony" && (
            <TextInput
              theme={{
                roundness: 60, // Custom border radius
                fonts: {
                  regular: { fontFamily: styleConstants.fontFamily }, // Custom font family
                },
              }}
              outlineColor="#CCCCCC"
              // label="Smoking Habit"
              value={"Is divorcee"}
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
                          setIsDivorcee(isDivorcee === "Yes" ? "No" : "Yes")
                        }
                        color={styleConstants.color.primaryColor}
                        style={[
                          styles.toggleButton,
                          isDivorcee === "Yes" && styles.toggleButtonActive,
                        ]}
                        value={isDivorcee === "Yes"}
                      />
                    </TouchableOpacity>
                  )}
                />
              }
            />
          )}

          {route?.params?.type === "dating" && (
            <>
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
            </>
          )}
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
          onPress={handleButtonCLick}
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
    borderColor: styleConstants.color.primaryColor,
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
    alignSelf: "center",
  },
  submitButtonText: {
    color: styleConstants.color.textWhiteColor,
    alignSelf: "center",
    fontFamily: styleConstants.fontFamily,
    fontSize: 18,
    fontWeight: "700",
  },
});

export default ProfileCreation;
