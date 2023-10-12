import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from '../../Styles';

export default function NotificationScreen({ navigation }) {
  const handleNavigateToAvaliarAdvogado = () => {
    navigation.navigate('AvaliarAdvogado');
  };

  const handleNavigateToConsultoria = () => {
    navigation.navigate('Consultoria');
  };

  const showRatingPrompt = () => {
    Alert.alert(
      'Avaliar o aplicativo',
      'Ajude-nos a melhorar! Se você estiver satisfeito com nosso aplicativo, ficaríamos muito agradecidos se o compartilhasse com seus amigos e familiares. Além disso, consideraríamos valiosíssimo se pudesse reservar um minuto para deixar sua avaliação na Play Store.',
      [
        {
          text: 'Fechar',
          style: 'cancel',
        },
        {
          text: 'Avaliar na Play Store',
          onPress: () => {
            // Coloque aqui a lógica para direcionar o usuário para a página de avaliação na Play Store.
          },
        },
      ]
    );
  };

  return (
    <View style={styles.containerNS}>

      <View style={styles.headerNS}>
        <Icon name="ios-notifications" size={33} color="#1E5A97" />
        <Text style={styles.notificationTextNS}>Notificações</Text>
      </View>

      <TouchableOpacity
        style={styles.buttonNS}
        onPress={handleNavigateToAvaliarAdvogado}
      >
        <Icon name="ios-star" size={30} color="#1E5A97" />
        <Text style={styles.buttonTextNS}>Avalie o Advogado</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonNS}
        onPress={handleNavigateToConsultoria}
      >
        <Icon name="ios-chatbubbles" size={30} color="#1E5A97" />
        <Text style={styles.buttonTextNS}>Sua consultoria vai começar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.rateButtonNS}
        onPress={showRatingPrompt}
      >
        <Text style={styles.rateButtonTextNS}>AVALIE-NOS</Text>
      </TouchableOpacity>

    </View>
  );
}