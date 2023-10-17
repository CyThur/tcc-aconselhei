import React from 'react';
import {  View, Text, FlatList, TouchableOpacity, ScrollView, Image} from 'react-native';
import { styles } from '../../Styles';

export default function AgendarConsul({ navigation }) {

  const especialidades = [
    { id: '1', name: 'DIREITO AMBIENTAL' },
    { id: '2', name: 'DIREITO CIVIL' },
    { id: '3', name: 'DIREITO DO CONSUMIDOR' },
    { id: '4', name: 'DIREITO CONTRATUAL' },
    { id: '5', name: 'DIREITO DESPORTIVO' },
    { id: '6', name: 'DIREITO DIGITAL' },
    { id: '7', name: 'DIREITO ELEITORAL' },
    { id: '8', name: 'DIREITO EMPRESARIAL' },
    { id: '9', name: 'DIREITO DA FAMÍLIA' },
    { id: '10', name: 'DIREITOS HUMANOS' },
    { id: '11', name: 'DIREITO IMOBILIÁRIO' },
    { id: '12', name: 'DIREITO PENAL' },
    { id: '13', name: 'DIREITO DA PROPRIEDADE INTELECTUAL' },
    { id: '14', name: 'DEFENSORIA PÚBLICA' },
    { id: '15', name: 'DIREITO TRABALHISTA' },
    { id: '16', name: 'DIREITO TRIBUTÁRIO' },
  ];

  return (
    <View style={styles.containerTelas}>
      <View style={styles.logoView}>
        <Image
          style={styles.logo2}
          source={require('../../../assets/aconselhei1.png')}
        />
      </View>

      <View style={styles.txtView3}>
        <Text style={styles.txt}>Selecione o assunto de interesse:</Text>
      </View>

      <ScrollView style={{ paddingTop: 0, width: '90%' }} showsVerticalScrollIndicator={false}>
        <FlatList
          data={especialidades}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.specialtyItem}
              onPress={() => navigation.navigate('Profissional', { specialty: item.name, })}>
              <Text style={styles.specialtyText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );

}