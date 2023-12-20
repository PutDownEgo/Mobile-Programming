import { Alert, Button, Text, View, Image, StyleSheet} from "react-native"
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import { useState } from "react"

export default Square = () => {
    const [image, setImage] = useState();

    const options = {
        mediaType: 'photo',
        quality: 1,
    };

    const chooseImageFromLibrary = async () => {
        try {
            const result = await launchImageLibrary(options);
            if (!result.cancelled) {
                setImage(result.assets[0].uri);
                console.log(result.assets[0].uri)
            }
        } catch (error) {
            console.log('Error selecting image:', error);
        }
    }

    return (
        <View>
            <Button title="Click" onPress={chooseImageFromLibrary}></Button>
            {image && <Image
                style={styles.tinyLogo}
                source={{
                    uri: image,
                }}
            />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });