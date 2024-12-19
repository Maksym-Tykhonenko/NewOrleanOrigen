import { View } from "react-native"
import Places from "../components/Places"

const PlacesScreen = () => {
    return (
        <View style={styles.container}>
            <Places />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default PlacesScreen;