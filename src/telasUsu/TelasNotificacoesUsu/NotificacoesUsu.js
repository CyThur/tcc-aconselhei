import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import NotificationScreen from './NotificationScreen';
import AvaliarAdvogadoScreen from './AvaliarAdvogadoScreen';
import ConsultoriaScreen from './ConsultoriaScreen';
import { styles } from '../../Styles';

export default function NotificacoesUsu({navigation}) {
  const [currentScreen, setCurrentScreen] = useState('Notification');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Notification':
        return <NotificationScreen navigation={{ navigate: setCurrentScreen }} />;
      case 'AvaliarAdvogado':
        return <AvaliarAdvogadoScreen navigation={{ goBack: () => setCurrentScreen('Notification') }} />;
      case 'Consultoria':
        return <ConsultoriaScreen navigation={{ goBack: () => setCurrentScreen('Notification') }} />;
      default:
        return <NotificationScreen navigation={{ navigate: setCurrentScreen }} />;
    }
  };

  return (
    <View style={styles.containerNotificacoesUsu}>
      {renderScreen()}
    </View>
  );
}