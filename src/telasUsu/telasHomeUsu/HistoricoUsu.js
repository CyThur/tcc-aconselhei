import { Text, View, Image, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../../Styles';

export default function HistoricoUsu({ navigation }) {

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
            style={{ marginRight: '7%' }}
            onPress={() => navigation.navigate('TabRoutesUsu')} />
          <Image
            style={styles.logo2}
            source={require('../../../assets/aconselhei1.png')}
          />
        </View>
      </View>
      <Text style={styles.navOption}>HISTÓRICO</Text>
      <View style={{ height: '65%', width: '70%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', }}>
        <Text style={styles.txt3}>Você ainda não recebeu nenhuma consultoria.</Text>
      </View>
    </View>
  );

  // return (
  //   <View style={styles.containerHistUsu}>
  //     <Text style={styles.titleHistUsu}>Meus Agendamentos</Text>
  //     <View style={styles.navigatorHistUsu}>
  //       <TouchableOpacity>
  //         <Text style={styles.navOptionHistUsu}>Próximas</Text>
  //       </TouchableOpacity>

  //       <TouchableOpacity>
  //         <Text style={styles.navOption2HistUsu}>Histórico</Text>
  //       </TouchableOpacity>
  //     </View>

  //     <ScrollView style={styles.scrollViewHistUsu}>
  //       <View style={styles.labelContainerHistUsu}>
  //         <View style={{ paddingRight: 15 }}>
  //           <Text style={styles.dateHistUsu}>05/11/2023</Text>
  //           <Text style={styles.timeHistUsu}>17:00</Text>
  //         </View>

  //         <View>
  //           <Text style={styles.categoryHistUsu}>Direito do consumidor</Text>
  //           <Text style={styles.sourceHistUsu}>Realizada por chat</Text>
  //         </View>
  //       </View>

  //       <View style={styles.labelContainerHistUsu}>
  //         <View style={{ paddingRight: 15 }}>
  //           <Text style={styles.dateHistUsu}>05/11/2023</Text>
  //           <Text style={styles.timeHistUsu}>17:00</Text>
  //         </View>

  //         <View>
  //           <Text style={styles.categoryHistUsu}>Direito do consumidor</Text>
  //           <Text style={styles.sourceHistUsu}>Realizada por chat</Text>
  //         </View>
  //       </View>

  //       <View style={styles.labelContainerHistUsu}>
  //         <View style={{ paddingRight: 15 }}>
  //           <Text style={styles.dateHistUsu}>05/11/2023</Text>
  //           <Text style={styles.timeHistUsu}>17:00</Text>
  //         </View>

  //         <View>
  //           <Text style={styles.categoryHistUsu}>Direito do consumidor</Text>
  //           <Text style={styles.sourceHistUsu}>Realizada por chat</Text>
  //         </View>
  //       </View>
  //     </ScrollView>
  //   </View>
  // );
}