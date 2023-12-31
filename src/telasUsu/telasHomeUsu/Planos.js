import { Text, View, TouchableOpacity, Image, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../../Styles';

export default function Planos({ navigation }) {
  return (
    <View style={styles.containerTelas}>
      <View style={styles.logoView}>
        <View style={{
          flexDirection: 'row',
          width: '100%',
          height: '100%',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <AntDesign 
          name="left" 
          size={20} 
          color="#1E5A97" 
          style={{marginRight: '7%'}}
          onPress={() => navigation.navigate('TabRoutesUsu')} />
          <Image
            style={styles.logo2}
            source={require('../../../assets/aconselhei1.png')}
          />
        </View>
      </View>
      <Text style={styles.navOption}>PLANOS</Text>
      <View style={{ height: '65%', width: '70%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', }}>
        <Text style={styles.txt3}>Desculpe! Planos ainda não disponíveis.</Text>
      </View>
    </View>
  );
}
