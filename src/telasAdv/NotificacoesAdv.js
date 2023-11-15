import { Text, View, Image, ScrollView } from 'react-native';
import { styles } from '../Styles';

export default function NotificacoesAdv() {
  return (
    // Notificação  indicando a hora da consulta, e caminho para o chat
    <View style={styles.containerTelas}>
      <View style={styles.logoView}>
        <Image
          style={styles.logo2}
          source={require('../../assets/aconselhei1.png')}
        />
      </View>
      <Text style={styles.navOption}>NOTIFICAÇÕES</Text>
      <ScrollView style={{ marginTop: '60%', paddingBottom: 10, height: '60%', width: '60%', alignSelf: 'center', }} showsVerticalScrollIndicator={false}>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', alignSelf: 'center' }}>
          {/* {list.map((item) => <Solicita item={item} />)} */}
          <Text style={styles.txt3}>Ainda não há nenhuma notificação.</Text>
        </View>
      </ScrollView>

    </View>

  );
}


