import { Text, View, TouchableOpacity, Image } from 'react-native';
import { styles } from '../Styles.js';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeUsu({navigation}) {
  return (
    <View style={styles.containerTelas}>
      <View style={styles.logoView}>
        <Image
          style={styles.logo2}
          source={require('../../assets/aconselhei1.png')}
        />
      </View>

      <View style={styles.buttonHomeCardContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('PerfilUsu')} style={styles.buttonHomeCard}>
          <Ionicons name="person" size={45} color="white" />
          <Text style={styles.buttonHomeText}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AgendarConsul')} style={styles.buttonHomeCard}>
          <Octicons name="law" size={45} color="white" />
          <Text style={styles.buttonHomeText}>Agendar Consultoria</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HistoricoUsu')} style={styles.buttonHomeCard}>
          <Ionicons name="newspaper" size={45} color="white" />
          <Text style={styles.buttonHomeText}>Histórico</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Planos')} style={styles.buttonHomeCard}>
          <MaterialIcons name="attach-money" size={45} color="white" />
          <Text style={styles.buttonHomeText}>Planos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
