import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../../../Styles';
import CustomRating from './CustomRating'; 

export default function PerfilAdvEsco({ route, navigation }) {
  const { adv, id, nomeCerto, speciality  } = route.params;

  // const [rating, setRating] = useState(3.0); // Defina o valor inicial da classificação aqui
  const [hasImage, setHasImage] = useState(adv.foto ? true : false);
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
            source={require('../../../../assets/aconselhei1.png')}
          />
        </View>
      </View>
      <View style={styles.header}>
        <View style={{ marginTop: '10%', height: 120, width: 120, borderRadius: 60, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={{ uri: hasImage ? adv.foto : 'https://www.pinclipart.com/picdir/big/157-1578186_user-profile-default-image-png-clipart.png' }}
            style={{ height: 120, width: 120, borderRadius: 60, borderWidth: 1, borderColor: '#000' }}
          />
        </View>
        {/* <CustomRating rating={rating} /> */}
        <Text style={styles.txtNome}>{adv.nome}</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>• Formado(a) em Direito na {adv.faculdade}.</Text>
        <Text style={styles.infoText}>• Ingressou no aplicativo em 2023.</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AdvHorarios', { id: id, nome: nomeCerto, speciality })}>
        <Text style={styles.buttonText}>VERIFICAR DISPONIBILIDADE</Text>
      </TouchableOpacity>
    </View>
  );
}