import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../../Styles';

export default function AgendarConsul({ navigation }) {

  const especialidades = [
    { id: '1', name: 'Direito Ambiental' },
    { id: '2', name: 'Direito Civil' },
    { id: '3', name: 'Direito do Consumidor' },
    { id: '4', name: 'Direito Contratual' },
    { id: '5', name: 'Direito Desportivo' },
    { id: '6', name: 'Direito Digital' },
    { id: '7', name: 'Direito Eleitoral' },
    { id: '8', name: 'Direito Empresarial' },
    { id: '9', name: 'Direito da Família' },
    { id: '10', name: 'Direitos Humanos' },
    { id: '11', name: 'Direito Imobiliário' },
    { id: '12', name: 'Direito Penal' },
    { id: '13', name: 'Direito da Propriedade Intelectual' },
    { id: '14', name: 'Defensoria Pública' },
    { id: '15', name: 'Direito Trabalhista' },
    { id: '16', name: 'Direito Tributário' },
  ];

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

      <View style={styles.txtView3}>
        <Text style={styles.txt}>Selecione o assunto de interesse:</Text>
      </View>


      <FlatList
        style={{ paddingTop: 0, width: '90%' }}
        showsVerticalScrollIndicator={false}
        data={especialidades}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.specialtyItem}
            onPress={() => navigation.navigate('Profissional', { speciality: item.name, })}>
            <Text style={styles.specialtyText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

    </View>
  );

}