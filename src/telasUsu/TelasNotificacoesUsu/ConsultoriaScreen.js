import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {styles} from '../../Styles';

export default function ConsultoriaScreen({ navigation }) {
  const handleNavigateBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.containerConsultoriaScreen}>
      <Text style={styles.textConsultoriaScreen}>Consultoria</Text>
      <TouchableOpacity style={styles.buttonConsultoriaScreen} onPress={handleNavigateBack}>
        <Text style={styles.buttonTextConsultoriaScreen}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}