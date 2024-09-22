import { View, Image, Text, TouchableOpacity } from "react-native";
import CartLayout from "../components/cartLayout";
import { productDetailStyles as styles } from "../styles/cart.styles";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import useApiCalls from "../hooks/useApiCalls";
import { ActivityIndicator } from "react-native-paper";
import { styleConstants } from "../styles/constants";

const image = {
  id: "1",
  source: require("../assets/ganesha.png"),
  title: "Divine Shop",
  originalPrice: "₹500",
  discountedPrice: "₹300",
};
const screenWidth = Dimensions.get("window").width;
const imgsize = screenWidth / 2.5;

const ProductDetail = ({
  navigation,
  route: {
    params: { id },
  },
}: {
  navigation: any;
  route: any;
}) => {
  const [lines, setLines] = useState(2);
  const { getProductDetails, productDetails, loadingProductDetails } =
    useApiCalls();
  //(id, "getting route");
  useEffect(() => {
    if (id) getProductDetails(id);
  }, []);
  return (
    <CartLayout buttonText="Buy Now" navigation={navigation}>
      {loadingProductDetails ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          size={"large"}
          color={styleConstants.color.primaryColor}
        />
      ) : (
        <>
          <View style={styles.titleContainer}>
            <Icon
              name="arrow-back"
              size={24}
              color="black"
              style={{ top: -2 }}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Text style={styles.title}>Product Details</Text>
          </View>
          <View style={{ ...styles.imageWrapper }}>
            <Image
              source={productDetails?.source}
              style={{
                ...styles.image,
                width: imgsize,
                height: imgsize,
              }}
            />
          </View>
          <View>
            <Text style={styles.productTitle}>{productDetails?.title}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.discountedPrice}>
              {productDetails?.discountedPrice}
            </Text>
            {/* space was not added by using styles. so text is needed. */}
            <Text>{"  "}</Text>
            <Text style={styles.originalPrice}>
              {productDetails?.originalPrice}
            </Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text numberOfLines={lines} style={styles.description}>
              {productDetails?.description}
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (lines == 2) {
                  setLines(10);
                } else {
                  setLines(2);
                }
              }}
            >
              <Text style={styles.moreButton}>
                {lines == 2 ? "read more" : "read less"}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </CartLayout>
  );
};

export default ProductDetail;
