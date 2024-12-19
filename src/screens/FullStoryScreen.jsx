import { View } from "react-native"
import FullStory from "../components/FullStory"

const FullStoryScreen = ({ route }) => {
    const { story } = route.params;

    return (
        <View style={styles.container}>
            <FullStory story={story} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default FullStoryScreen;