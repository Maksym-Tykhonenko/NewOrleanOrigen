import { View } from "react-native"
import Album from "../components/Album"

const AlbumScreen = () => {
    return (
        <View style={styles.container}>
            <Album />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default AlbumScreen;