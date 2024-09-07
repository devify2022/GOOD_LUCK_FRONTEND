import { Button, Image, Text, TouchableOpacity, View } from "react-native"
import { OrderDetailStyles as styles } from "../styles/cart.styles";
import { IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

const OrderDetails: React.FC<{
    closeModal?: any;
  }> = ({
     closeModal
     // order details depending on current purchase or previous all orders.
  })=>{
    const image = {
        id: "1",
        source: require("../assets/ganesha.png"),
        title: "Divine Shop",
        originalPrice: "₹500",
        discountedPrice: "₹300",
        count: 2,
    }
    const user = {
        name: "Aditya",
        city: "Kolhapur",
        state: "Maharashtra",
        phone: "9970233012"
    }
    return (
        
        <View style={styles.container}>
            
            <View style={styles.titleContainer}>
            <TouchableOpacity onPress={closeModal}>
                <Icon name="arrow-back" size={24} color="black" style={{ top: -2 }} />
            </TouchableOpacity>
                <Text style={styles.title}>
                    Order Details
                </Text>
            </View>
            
            <View style={styles.orderDetailsContainer}>
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
                            <Text style={styles.countText}>Quantity :</Text>
                            <Text style={styles.countText}>{image.count}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.divider} />

                <View style={styles.orderDetails}>
                    <View style={styles.orderDetailCategory}>
                        <Text style={styles.categoryName}>Name:</Text>
                        <Text style={styles.categoryValue}>{user.name}</Text>
                    </View>
                    <View style={styles.orderDetailCategory}>
                        <Text style={styles.categoryName}>City:</Text>
                        <Text style={styles.categoryValue}>{user.city}</Text>
                    </View>
                    <View style={styles.orderDetailCategory}>
                        <Text style={styles.categoryName}>State:</Text>
                        <Text style={styles.categoryValue}>{user.state}</Text>
                    </View>
                    <View style={styles.orderDetailCategory}>
                        <Text style={styles.categoryName}>Phone Number:</Text>
                        <Text style={styles.categoryValue}>{user.phone}</Text>
                    </View>
                    
                </View>

                <View style={styles.divider} />

                <View style={styles.orderDetails}>
                    <View style={styles.orderDetailCategory}>
                        <Text style={styles.categoryName}>Order Date:</Text>
                        <Text style={styles.categoryValue}>Aug 26, 2024</Text>
                    </View>
                    <View style={styles.total}>
                    <Text style={styles.totalText}>Total</Text>
                    <Text style={styles.totalAmount}>{image.discountedPrice}</Text>

                    </View>
                </View>
        </View>
    )
}

export default OrderDetails;