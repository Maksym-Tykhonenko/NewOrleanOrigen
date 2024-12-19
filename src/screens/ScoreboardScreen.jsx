import { View } from "react-native"
import Scoreboard from "../components/Scoreboard"

const ScoreboardScreen = () => {
    return (
        <View style={styles.container}>
            <Scoreboard />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default ScoreboardScreen;