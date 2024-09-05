import { View, Text, StyleSheet } from "react-native";
import { styleConstants } from "../styles/constants";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

const ConfirmPayment = ({ navigation }: { navigation: any }) => {
    return (
        <View style={styles.container}>
          <Icon name="check-circle" style={styles.icon} size={160}></Icon>
        <Text style={styles.text}> Tour Order is complete please check the delivery status at order tracking page</Text>
        <Button style={styles.Button}>
          <Text style={styles.buttonText}>
            Continue Shopping
          </Text>
          </Button>
    </View>
  )
  };

export default ConfirmPayment;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: styleConstants.color.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  icon:{
    backgroundColor: styleConstants.color.primaryColor,
    color: styleConstants.color.textWhiteColor,
  },
  text: {
    textAlign: "center",
    fontFamily: styleConstants.fontFamily,
    fontSize: 16,
    fontWeight: "500",
    color: styleConstants.color.textWhiteColor
  },
  Button: {
    backgroundColor: styleConstants.color.textWhiteColor,
    borderRadius: 25,
    marginTop: 25,
    height: 50,
    justifyContent: "center",
    width: 310, //try to get screen-width 
    textAlign: "center"
},
buttonText: {
    color: styleConstants.color.primaryColor,
    fontSize: 18,
    fontFamily: styleConstants.fontFamily,
    fontWeight: "500",
}
})