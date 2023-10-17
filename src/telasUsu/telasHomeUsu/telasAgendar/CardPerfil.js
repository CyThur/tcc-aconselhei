import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CardPerfil = ({ name, photoUrl }) => {
  return (
    <View>
      <Image source={{ uri: photoUrl }} style={styles.photo} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  photo: {
    width: 100, // Largura da foto
    height: 100, // Altura da foto
    borderRadius: 50, // Deixa a foto redonda
  },
  name: {
    marginTop: 10,
    fontSize: 16,
    color: '#1E5A97',
    alignSelf: 'center',
  },
});

export default CardPerfil;
