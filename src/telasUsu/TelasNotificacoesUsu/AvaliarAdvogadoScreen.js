import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../../Styles';

export default function AvaliarAdvogadoScreen({ navigation }) {
  const handleNavigateBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.containerAvaliarAdvogadoScreen}>
      <Text style={styles.textAvaliarAdvogadoScreen}>Avaliar Advogado</Text>
      <TouchableOpacity style={styles.buttonAvaliarAdvogadoScreen} onPress={handleNavigateBack}>
        <Text style={styles.buttonTextAvaliarAdvogadoScreen}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}