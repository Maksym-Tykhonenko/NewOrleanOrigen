import { View } from "react-native"
import Quiz from "../components/Quiz"

const QuizScreen = () => {
    return (
        <View style={styles.container}>
            <Quiz />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default QuizScreen;