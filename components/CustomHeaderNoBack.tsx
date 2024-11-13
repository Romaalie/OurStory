import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { CustomHeaderProps } from '@/types/customheaderprops';


// A quick test with the help of ChatGPT on how to customize navigation headers
// Needs a lot of styling but works otherwise as intended
export function CustomHeaderNoBack({ title }: CustomHeaderProps) {
    const router = useRouter();
    return (
        <View style={{ padding: 20, backgroundColor: '#f8f8f8', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
        </View>
    );
}