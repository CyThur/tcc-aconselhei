
import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { styles } from '../Styles.js';

export default function Inicio({ navigation }) {

  return (
    <View style={styles.containerInicio}>
      <View style={styles.logoView}>
        <Image
          style={styles.logoInicio}
          source={require('../../assets/aconselhei1.png')}
        />
      </View>
      <View style={styles.inputContainerInicio}>
        <Text style={styles.text2}>COMO DESEJA PROSSEGUIR?</Text>

        <TouchableOpacity onPress={() => navigation.navigate('LoginUsu')} style={styles.buttonInicio}>
          <Text style={styles.loginButtonText}>SOU BENEFICIADO</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('LoginAdv')} style={styles.buttonInicio}>
          <Text style={styles.loginButtonText}>SOU ADVOGADO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}