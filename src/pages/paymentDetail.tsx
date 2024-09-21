import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import CartLayout from "../components/cartLayout";
import { paymentDetailStyles as styles } from "../styles/cart.styles";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useState, useEffect } from "react";
import { Button, Divider, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import moment from "moment";
import { setCurrentOrder } from "../redux/silces/order.slice";

const PaymentDetail = ({ navigation }: { navigation: any }) => {
  const image = useSelector((state: RootState) => state.product.productDetails);
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    count: 1,
    name: "",
    city: "",
    state: "",
    phone: "",
    address: "",
    pincode: "",
    totalPrice: image ? image.discountedPrice.replace(/[^0-9.-]+/g, "") : 0,
  });
  const handleInputChange = (key: string, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleCountChange = (increment: boolean) => {
    setFormState((prevState) => {
      const newCount = increment ? prevState.count + 1 : prevState.count - 1;

      // Prevent the count from dropping below 1
      if (newCount < 1) return prevState;

      // Update total price based on count

      const newTotalPrice =
        newCount *
        parseFloat(image.discountedPrice.replace(/[^0-9.-]+/g, "") ?? 0);

      return {
        ...prevState,
        count: newCount,
        totalPrice: newTotalPrice.toFixed(2),
      };
    });
  };

  // Calculate delivery date as 10 days from the current date
  const deliveryDate = moment().add(10, "days").format("MMM DD, YYYY");

  useEffect(() => {
    dispatch(setCurrentOrder(formState));
  }, [formState]);

  return (
    <CartLayout buttonText="Pay Now" navigation={navigation}>
      <View style={styles.titleContainer}>
        <Icon
          name="arrow-back"
          size={24}
          color="black"
          style={{ top: -2 }}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Checkout</Text>
      </View>
      {image && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.puschaseDetailsContainer}>
            <View style={styles.imageContainer}>
              <Image source={image.source} style={styles.image} />
            </View>
            <View style={styles.details}>
              <Text style={styles.name}>{image.title}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.discountedPrice}>
                  {image.discountedPrice}
                </Text>
                <Text style={styles.originalPrice}>{image.originalPrice}</Text>
              </View>
              <View style={styles.count}>
                <IconButton
                  style={styles.countButton}
                  icon="plus"
                  onPress={() => handleCountChange(true)}
                />
                <Text style={styles.countText}>{formState.count}</Text>
                <IconButton
                  style={styles.countButton}
                  icon="minus"
                  onPress={() => handleCountChange(false)}
                />
              </View>
            </View>
          </View>
          <View style={styles.addressDetailsContainer}>
            <Text style={styles.title}>Address Details</Text>
            <KeyboardAvoidingView behavior="padding">
              <View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="#B0B0B0"
                    value={formState.name}
                    onChangeText={(text) => handleInputChange("name", text)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Address"
                    placeholderTextColor="#B0B0B0"
                    value={formState.address}
                    onChangeText={(text) => handleInputChange("address", text)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="City"
                    placeholderTextColor="#B0B0B0"
                    value={formState.city}
                    onChangeText={(text) => handleInputChange("city", text)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="State"
                    placeholderTextColor="#B0B0B0"
                    value={formState.state}
                    onChangeText={(text) => handleInputChange("state", text)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Pincode"
                    placeholderTextColor="#B0B0B0"
                    value={formState.pincode}
                    onChangeText={(text) => handleInputChange("pincode", text)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    placeholderTextColor="#B0B0B0"
                    keyboardType="phone-pad"
                    value={formState.phone}
                    onChangeText={(text) => handleInputChange("phone", text)}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
          <View style={styles.paymentMethodContainer}>
            <Text style={styles.title}>Payment Methods</Text>
            <View style={styles.paymentMethods}>
              <TouchableOpacity style={styles.paymentOption}>
                <View style={styles.paymentImageContainer}>
                  <Image
                    source={require("../assets/cash.png")}
                    style={styles.paymentMethodImage}
                  />
                </View>
                <Text style={styles.paymentMethodText}>Cash</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.paymentOption}>
                <View style={styles.paymentImageContainer}>
                  <Image
                    source={require("../assets/UPI.png")}
                    style={styles.paymentMethodImage}
                  />
                </View>
                <Text style={styles.paymentMethodText}>UPI</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.paymentOption}>
                <View style={styles.paymentImageContainer}>
                  <Image
                    source={require("../assets/offers.png")}
                    style={styles.paymentMethodImage}
                  />
                </View>
                <Text style={styles.paymentMethodText}>Offers</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.deliveryDetails}>
            <View style={styles.deliveryDate}>
              <Text style={styles.dateText}>Delivery Date:</Text>
              <Text style={styles.date}>{deliveryDate}</Text>
            </View>
            <View style={styles.total}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalAmount}>₹{formState.totalPrice}</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </CartLayout>
  );
};

export default PaymentDetail;
