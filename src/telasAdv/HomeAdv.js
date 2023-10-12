import { Text, View, TouchableOpacity, Image } from 'react-native';
import { styles } from '../Styles.js';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

export default function HomeAdv({navigation}) {
    return (
        <View style={styles.containerTelas}>
            <View style={styles.logoView}>
                <Image
                    style={styles.logo2}
                    source={require('../../assets/aconselhei1.png')}
                />
            </View>

            <View style={styles.buttonHomeCardContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('PerfilAdv')} style={styles.buttonHomeCard}>
                    <Ionicons name="person" size={45} color="white" />
                    <Text style={styles.buttonHomeText}>Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ConsulAgen')} style={styles.buttonHomeCard}>
                    <Octicons name="law" size={45} color="white" />
                    <Text style={styles.buttonHomeText}>Consultorias agendadas</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('HistoricoAdv')} style={styles.buttonHomeCard}>
                    <Ionicons name="newspaper" size={45} color="white" />
                    <Text style={styles.buttonHomeText}>Histórico</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}