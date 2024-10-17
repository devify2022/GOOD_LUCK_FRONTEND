import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
} from "react-native";
import { Avatar, IconButton, Divider, ActivityIndicator } from "react-native-paper";
import { styleConstants } from "../styles/constants";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import useMatrimonyServices from "../hooks/useMatrimonyServices";
import { useSelector } from "react-redux";
import { RootState } from "../redux";

const MyProfile = ({ routes }: { routes: any }) => {
  const navigation = useNavigation<any>();
  const type = routes?.params?.type;
  const { getProfileDetails, profileDetails, isLoading } = useMatrimonyServices();

  const currentProfileId = useSelector((state: RootState) => state.auth.currentProfileId);
  const userId=useSelector((state:RootState)=>state.auth.userDetails?.matrimonyID)
  const openWhatsApp = () => {
    Linking.openURL("whatsapp://send?phone=1234567890");
  };

  const openFacebook = () => {
    Linking.openURL("https://www.facebook.com/johndoe");
  };
  useEffect(() => {
   console.log(type,"getting type")
    if ((type === "matrimonyprofile" || type === "datingprofile"))
    { console.log('inside condition'); getProfileDetails(currentProfileId ?? '');}
     
    else{ console.log("getting userId"); getProfileDetails(userId??'');}
  }, []);

  return (
    <View style={{ flex: 1 }}>
    
      {isLoading ? <ActivityIndicator  style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          size={"large"}
          color={styleConstants.color.primaryColor}/>: <ScrollView contentContainerStyle={styles.container}>
          {/* Profile Section */}
          <View style={styles.titleContainer}>
        <Icon name="arrow-back" size={24} color="black" style={{ top: -2 }} />
        <Text style={styles.title}>
          {type === "own"
            ? "Your profile"
            : profileDetails?.userName ?? "No Name"}
        </Text>
       
      </View>
          <View style={styles.profileSection}>
            {type === "own" ? (
              <>
                <IconButton
                  icon="pencil"
                  iconColor={styleConstants.color.primaryColor}
                  size={24}
                  onPress={() => {
                    navigation.navigate("createdatingprofile", {type:'updatematrimonyprofile'});
                  }}
                  style={styles.editIcon}
                />
                <Avatar.Image
                  size={100}
                  source={{ uri: profileDetails?.imageURL[0] }}
                />
                <Text style={styles.nameAgeText}>{profileDetails?.userName}</Text>
              </>
            ) : (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: profileDetails?.imageURL[0] }}
                  style={styles.profileImage}
                />
  
                {/* WhatsApp and Facebook buttons */}
                <View style={styles.socialButtonsContainer}>
                  {profileDetails?.whatsappNumber &&  <IconButton
                    icon="whatsapp"
                    size={30}
                    iconColor="#25D366"
                    style={styles.socialButton}
                    onPress={openWhatsApp}
                  /> }
                  
                 {profileDetails?.facebookLink &&  <IconButton
                    icon="facebook"
                    size={30}
                    iconColor="#3b5998"
                    style={styles.socialButton}
                    onPress={openFacebook}
                  />}
                 
                </View>
              </View>
            )}
          </View>
  
          <Divider style={styles.divider} />
  
          {/* Details Section */}
          <View style={styles.detailsSection}>
            <View style={styles.detailItem}>
              <IconButton icon="map-marker" size={20} style={styles.detailIcon} />
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>City:</Text>{profileDetails?.city}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <IconButton icon="map-marker" size={20} style={styles.detailIcon} />
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>State:</Text> {profileDetails?.state}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <IconButton icon="calendar" size={20} style={styles.detailIcon} />
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Age:</Text> {profileDetails?.age}
              </Text>
            </View>
  
            <View style={styles.detailItem}>
              <IconButton icon="gender-male-female" size={20} style={styles.detailIcon} />
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Gender:</Text> {profileDetails?.gender}
              </Text>
            </View>
    
              {type === 'datingprofile' && <>
                <View style={styles.detailItem}>
              <IconButton icon="school" size={20} style={styles.detailIcon} />
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Education:</Text> B Tech
              </Text>
            </View>
               <View style={styles.detailItem}>
              <IconButton icon="smoking" size={20} style={styles.detailIcon} />
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Smoking Habits:</Text> Yes
              </Text>
            </View>
  
            <View style={styles.detailItem}>
              <IconButton
                icon="glass-cocktail"
                size={20}
                style={styles.detailIcon}
              />
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Alcohol Habits:</Text> No
              </Text>
            </View></> }
           {type==='matrimonyprofile' &&  <>
           
            <View style={styles.detailItem}>
            
            
            <IconButton
              icon="group"
              size={20}
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Cast :</Text> {profileDetails?.caste }
            </Text>
          </View>
           
           <View style={styles.detailItem}>
            
            
            <IconButton
              icon="heart-broken"
              size={20}
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Is Divorcee :</Text> {profileDetails?.isDivorcee ? 'Yes': 'No'}
            </Text>
          </View><View style={styles.detailItem}>
            
            <IconButton
              icon="wallet"
              size={20}
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Salary:</Text> {profileDetails?.salary }
            </Text>
          </View></> }
            {type==='datingprofile' &&
            <View style={styles.detailItem}>
              <IconButton icon="heart" size={20} style={styles.detailIcon} />
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Orientation:</Text> Straight
              </Text>
            </View>}
  
            <View style={styles.detailItem}>
              <IconButton icon="star" size={20} style={styles.detailIcon} />
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Interests:</Text> {profileDetails?.interests?.map((item:string)=>item)}
              </Text>
            </View>
  
            <View style={styles.detailItem}>
              <IconButton
                icon="account-search"
                size={20}
                style={styles.detailIcon}
              />
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Looking For:</Text> {profileDetails?.lookingFor}
              </Text>
            </View>
          </View>
  
          <Divider style={styles.divider} />
  
          {/* Bio Section */}
          <Text style={styles.bioTitle}>Bio</Text>
          <View style={styles.bioContainer}>
            <Text style={styles.bioText}>
             {profileDetails?.bio}
            </Text>
          </View>
        </ScrollView>}
     
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
  justifyContent:'space-evenly',
    alignItems: "center",
    paddingHorizontal: 5,
    marginTop: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: styleConstants.fontFamily,
    color: styleConstants.color.textBlackColor,
    alignSelf:'center'
  },
  container: {
    padding: 20,
    backgroundColor: styleConstants.color.transparent,
  },
  profileSection: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  imageContainer: {
    position: "relative",
  },
  profileImage: {
    height: 430,
    width: 400,
    borderRadius: 20,
  },
  socialButtonsContainer: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  socialButton: {
    backgroundColor: "white",
    borderRadius: 25,
  },
  divider: {
    marginVertical: 20,
  },
  detailsSection: {
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  detailIcon: {
    marginRight: 10,
  },
  detailText: {
    fontSize: 16,
    fontFamily: styleConstants.fontFamily,
   
    color: styleConstants.color.textBlackColor,
    flexWrap: "wrap",
  },
  detailLabel: {
    fontSize: 16,
    fontFamily: styleConstants.fontFamily,
    
    color: styleConstants.color.textGrayColor,
  },
  bioTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: styleConstants.fontFamily,
    color: styleConstants.color.textBlackColor,
  },
  bioContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: styleConstants.fontFamily,
    color: styleConstants.color.textBlackColor,
  },
  editIcon: { position: "absolute", left: 60, bottom: 60, zIndex: 100 },
  nameAgeText: {
    fontSize: 22,
    marginTop: 10,
    fontFamily: styleConstants.fontFamily,
    color: styleConstants.color.textBlackColor,
  },
});
