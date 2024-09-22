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
import { setButtonState, setCurrentOrder } from "../redux/silces/order.slice";

const PaymentDetail = ({ navigation }: { navigation: any }) => {
  const image = useSelector((state: RootState) => state.product.productDetails);
  const phoneNumber = useSelector(
    (state: RootState) => state.auth.userDetails?.phoneNumber
  );
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    date: new Date().toDateString(),
    count: 1,
    name: "",
    city: "",
    state: "",
    phone: phoneNumber ?? "",
    address: "",
    pincode: "",
  });
  const [paymentBreakUp, setpaymentBreakUp] = useState({
    subTotal: image?.discountedPrice * formState.count,
    shipping: 100,
    gst: image?.discountedPrice * formState.count * 0.18,
    total:
      image?.discountedPrice * formState.count +
      100 +
      image?.discountedPrice * formState.count * 0.18,
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

      // Update total price based on newCount
      setpaymentBreakUp({
        subTotal: image?.discountedPrice * newCount,
        shipping: 100,
        gst: parseFloat((image?.discountedPrice * newCount * 0.18).toFixed(2)),
        total:
          image?.discountedPrice * newCount +
          100 +
          image?.discountedPrice * newCount * 0.18,
      });

      return {
        ...prevState,
        count: newCount,
      };
    });
  };

  // Calculate delivery date as 10 days from the current date
  const deliveryDate = moment().add(10, "days").format("MMM DD, YYYY");

  useEffect(() => {
    dispatch(setCurrentOrder(formState));
    const buttonState =
      formState.name === "" ||
      formState.address === "" ||
      formState.city === "" ||
      formState.state === "" ||
      formState.phone.length < 10 ||
      formState.phone.includes(".") ||
      formState.pincode.length < 6 ||
      formState.pincode.includes(".");
    dispatch(setButtonState(buttonState));
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
                  ₹ {image.discountedPrice * formState.count}
                </Text>
                <Text style={styles.originalPrice}>
                  ₹{image.originalPrice * formState.count}
                </Text>
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
                    maxLength={200}
                    style={styles.input}
                    placeholder="Name *"
                    placeholderTextColor="#B0B0B0"
                    value={formState.name}
                    onChangeText={(text) => handleInputChange("name", text)}
                  />
                  <TextInput
                    maxLength={200}
                    style={styles.input}
                    placeholder="Address *"
                    placeholderTextColor="#B0B0B0"
                    value={formState.address}
                    onChangeText={(text) => handleInputChange("address", text)}
                  />
                  <TextInput
                    maxLength={200}
                    style={styles.input}
                    placeholder="City"
                    placeholderTextColor="#B0B0B0"
                    value={formState.city}
                    onChangeText={(text) => handleInputChange("city", text)}
                  />
                  <TextInput
                    maxLength={200}
                    style={styles.input}
                    placeholder="State"
                    placeholderTextColor="#B0B0B0"
                    value={formState.state}
                    onChangeText={(text) => handleInputChange("state", text)}
                  />
                  <TextInput
                    maxLength={6}
                    inputMode="numeric"
                    style={styles.input}
                    placeholder="Pincode *"
                    placeholderTextColor="#B0B0B0"
                    value={formState.pincode}
                    onChangeText={(text) => handleInputChange("pincode", text)}
                  />
                  <TextInput
                    maxLength={10}
                    inputMode="numeric"
                    style={styles.input}
                    placeholder="Phone Number *"
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
              <Text style={styles.totalText}>Subtotal</Text>
              <Text style={styles.totalAmount}>₹{paymentBreakUp.subTotal}</Text>
            </View>
            <View style={styles.total}>
              <Text style={styles.totalText}>Tax</Text>
              <Text style={styles.totalAmount}>₹{paymentBreakUp.gst}</Text>
            </View>
            <View style={styles.total}>
              <Text style={styles.totalText}>Shipping</Text>
              <Text style={styles.totalAmount}>₹{paymentBreakUp.shipping}</Text>
            </View>
            <View style={styles.total}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalAmount}>₹{paymentBreakUp.total}</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </CartLayout>
  );
};

export default PaymentDetail;
