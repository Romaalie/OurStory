import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { CustomHeaderProps } from '@/types/customheaderprops';


// A quick test with the help of ChatGPT on how to customize navigation headers
// Needs a lot of styling but works otherwise as intended
export function CustomHeader({ title }: CustomHeaderProps) {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <Button title="Go Back" onPress={() => router.back()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#BCE0FD',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})