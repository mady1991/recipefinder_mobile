import { COLORS } from "@/constants/colors";
import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get("window");


export const splashStyles = StyleSheet.create({
    imageContainer: {
        height: height,
        marginTop: 30,
        marginBottom: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 14
    },
});