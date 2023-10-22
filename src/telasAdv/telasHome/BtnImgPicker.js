import { StyleSheet, View, Pressable, TouchableOpacity, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { stylesP } from './StylesPerfil';

export default function BtnImgPicker({ label, theme, onPress }) {
    if (theme === "primary") {
        return (
            <TouchableOpacity style={stylesP.panelButton} onPress={onPress}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome name="picture-o" size={18} color="#fff" style={styles.buttonIcon} />
                    <Text style={stylesP.panelButtonTitle}>{label}</Text>
                </View>

            </TouchableOpacity>

        );
    }

    return (
        <TouchableOpacity style={stylesP.panelButton} onPress={onPress}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome name="camera" size={18} color="#fff" style={styles.buttonIcon} />
                <Text style={stylesP.panelButtonTitle}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonIcon: {
        paddingRight: 8,
    },
});