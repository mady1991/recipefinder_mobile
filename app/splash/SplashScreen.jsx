import { View, Text } from 'react-native';
import { splashStyles } from '../../assets/styles/splash.styles';
import { Image } from "expo-image";

const SplashScreen = () => {
    return (
        <View style={splashStyles.imageContainer}>
            <Image source={require('../../assets/images/splash-icon.png')}
                style={splashStyles.image}
                contentFit="contain" />
        </View>
    )
}

export default SplashScreen;