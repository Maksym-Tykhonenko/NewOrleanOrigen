import { View } from "react-native"
import Stories from "../components/Stories"

const StoriesScreen = () => {
    return (
        <View style={styles.container}>
            <Stories />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default StoriesScreen;