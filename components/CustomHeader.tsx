import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { CustomHeaderProps } from '@/types/customheaderprops';
import { styles } from '@/styles/styles';

export function CustomHeader({ title }: CustomHeaderProps) {
    const router = useRouter();
    return (
        <View style={styles.containerCustomHeader}>
            <Text style={styles.textCustomHeader}>{title}</Text>
            <View>
                <Button title="Go Back" onPress={() => router.back()} />
            </View>
        </View>
    );
}