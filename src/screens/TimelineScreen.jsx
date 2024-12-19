import { View } from "react-native"
import Timeline from "../components/Timeline"

const TimelineScreen = () => {
    return (
        <View style={styles.container}>
            <Timeline />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default TimelineScreen;