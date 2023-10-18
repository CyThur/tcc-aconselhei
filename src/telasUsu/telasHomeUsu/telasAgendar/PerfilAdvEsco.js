import React, {useState} from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../../Styles';
import CustomRating from './CustomRating'; // Importe o componente de classificação personalizada

export default function PerfilAdvEsco({ route, navigation }) {
  const { adv } = route.params;
  const [rating, setRating] = useState(3.0); // Defina o valor inicial da classificação aqui

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Image
          source={{ uri: adv.photoUrl }}
          style={styles.profileImage}
        /> */}
        <CustomRating rating={rating} />
        <Text style={styles.txtNome}>{adv.nome}</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>• Formado(a) em Direito na {adv.faculdade}</Text>
        {/* <Text style={styles.infoText}>• {adv.aprovacao}</Text> */}
        <Text style={styles.infoText}>• Ingressou no aplicativo em 2023.</Text>
        <Text style={styles.infoText}>• Realizou XX consultorias</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>VERIFICAR DISPONIBILIDADE</Text>
      </TouchableOpacity>
    </View>
  );
}