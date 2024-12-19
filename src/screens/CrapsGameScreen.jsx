import { View } from "react-native"
import CrapsGame from "../components/CrapsGame"

const CrapsGameScreen = () => {
    return (
        <View style={styles.container}>
            <CrapsGame />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default CrapsGameScreen;