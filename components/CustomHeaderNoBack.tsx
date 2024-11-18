import { View, Text } from 'react-native';
import { CustomHeaderProps } from '@/types/customheaderprops';
import { useTitle } from './TitleContext';
import { styles } from '@/styles/styles';

export function CustomHeaderNoBack({ title }: CustomHeaderProps) {
    const { title: contextTitle } = useTitle();
    return (
        <View style={styles.containerCustomHeaderNoBack}>
            <Text style={styles.textContainerHeader}>{contextTitle || title}</Text>
        </View>
    );
}