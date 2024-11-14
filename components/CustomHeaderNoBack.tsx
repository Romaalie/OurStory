import { View, Text, StyleSheet} from 'react-native';
import { useRouter } from 'expo-router';
import { CustomHeaderProps } from '@/types/customheaderprops';


// A quick test with the help of ChatGPT on how to customize navigation headers
// Needs a lot of styling but works otherwise as intended
export function CustomHeaderNoBack({ title }: CustomHeaderProps) {
    const router = useRouter();
    return (
        <View style={styles.containerHeader}>
            <Text style={styles.textContainerHeader}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containerHeader: {
        padding: 20,
        backgroundColor: '#BCE0FD',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textContainerHeader: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})