import { View, Image, Text, TouchableOpacity } from "react-native";
import CartLayout from "../components/cartLayout";
import { productDetailStyles as styles } from "../styles/cart.styles";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useState } from "react";


const image = {
  id: "1",
  source: require("../assets/ganesha.png"),
  title: "Divine Shop",
  originalPrice: "₹500",
  discountedPrice: "₹300",
}
const screenWidth = (Dimensions.get("window").width)
const imgsize = screenWidth / 2.5;

const ProductDetail = ({ navigation }: { navigation: any }) => {
  const [lines, setLines] = useState(2);
  return (
    <CartLayout buttonText="Buy Now" navigation={navigation}>

      <View style={styles.titleContainer}>
        <Icon name="arrow-back" size={24} color="black" style={{ top: -2 }} />
        <Text style={styles.title}>
          Product Details
        </Text>
      </View>
      <View style={{ ...styles.imageWrapper }}>
        <Image
          source={image.source}
          style={{
            ...styles.image,
            width: imgsize,
            height: imgsize
          }}
        />
      </View>
      <View>
        <Text style={styles.productTitle}>
          {image.title}
        </Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.discountedPrice}>{image.discountedPrice}</Text>
        {/* space was not added by using styles. so text is needed. */}
        <Text>{"  "}</Text>
        <Text style={styles.originalPrice}>{image.originalPrice}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text numberOfLines={lines} style={styles.description}>
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (lines == 2) {
              setLines(10);
            }
            else {
              setLines(2);
            }
          }}
        ><Text style={styles.moreButton}>{ (lines == 2)?"read more":"read less"}</Text></TouchableOpacity>
      </View>

    </CartLayout>

  )
};

export default ProductDetail;