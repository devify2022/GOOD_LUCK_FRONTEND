import { View, Image, Text, Touchable, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView } from "react-native";
import CartLayout from "../components/cartLayout";
import { paymentDetailStyles as styles } from "../styles/cart.styles";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useState } from "react";
import { Button, Divider, IconButton } from "react-native-paper";

const image = {
    id: "1",
    source: require("../assets/ganesha.png"),
    title: "Divine Shop",
    originalPrice: "₹500",
    discountedPrice: "₹300",
}

const PaymentDetail = ({ navigation }: { navigation: any }) => {
    const [count, setCount] = useState(1);
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [phone, setPhone] = useState("");
    return (
        <CartLayout buttonText="Pay Now" navigation={navigation}>
            <View style={styles.titleContainer}>
                <Icon name="arrow-back" size={24} color="black" style={{ top: -2 }} />
                <Text style={styles.title}>
                    Checkout
                </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.puschaseDetailsContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={image.source}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.name}>{image.title}</Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.discountedPrice}>{image.discountedPrice}</Text>
                            <Text style={styles.originalPrice}>{image.originalPrice}</Text>
                        </View>
                        <View style={styles.count}>
                            <IconButton style={styles.countButton} icon="plus" onPress={() => setCount(count + 1)} />
                            <Text style={styles.countText}>{count}</Text>
                            <IconButton style={styles.countButton} icon="minus" onPress={() => setCount(count - 1)} />
                        </View>

                    </View>
                </View>
                <View style={styles.addressDetailsContainer}>
                    <Text style={styles.title}>
                        Address Details
                    </Text>
                    <KeyboardAvoidingView behavior="padding">

                        <View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Name"
                                    placeholderTextColor="#B0B0B0"
                                    value={name}
                                    onChangeText={setName}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="City"
                                    placeholderTextColor="#B0B0B0"
                                    value={city}
                                    onChangeText={setCity}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="State"
                                    placeholderTextColor="#B0B0B0"
                                    value={state}
                                    onChangeText={setState}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Phone Number"
                                    placeholderTextColor="#B0B0B0"
                                    keyboardType="phone-pad"
                                    value={phone}
                                    onChangeText={setPhone}
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
                <View style={styles.paymentMethodContainer}>
                    <Text style={styles.title}>
                        Payment Methods
                    </Text>
                    <View style={styles.paymentMethods}>
                        <TouchableOpacity style={styles.paymentOption}>
                            <View style={styles.paymentImageContainer}>
                                <Image source={require("../assets/cash.png")} style={styles.paymentMethodImage} />
                            </View>
                            <Text style={styles.paymentMethodText}>Cash</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.paymentOption}>
                            <View style={styles.paymentImageContainer}>
                                <Image source={require("../assets/UPI.png")} style={styles.paymentMethodImage} />
                            </View>
                            <Text style={styles.paymentMethodText}>UPI</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.paymentOption}>
                            <View style={styles.paymentImageContainer}>
                                <Image source={require("../assets/others.png")} style={styles.paymentMethodImage} />
                            </View>
                            <Text style={styles.paymentMethodText}>Other</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.paymentOption}>
                            <View style={styles.paymentImageContainer}>
                                <Image source={require("../assets/offers.png")} style={styles.paymentMethodImage} />
                            </View>
                            <Text style={styles.paymentMethodText}>Offers</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.deliveryDetails}>
                    <View style={styles.deliveryDate}>
                        <Text style={styles.dateText}>Delivery Date:</Text>
                        <Text style={styles.date}>Aug 26, 2024</Text>
                    </View>
                    <View style={styles.total}>
                    <Text style={styles.totalText}>Total</Text>
                    <Text style={styles.totalAmount}>{image.discountedPrice}</Text>

                    </View>
                </View>
            </ScrollView>
        </CartLayout>
    )
};

export default PaymentDetail;