import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../Styles';

export default function PerfilAdvEsco({navigation}) {
  return (
    <View style={styles.containerAgendarConsul}>

      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/3364/3364044.png',
        }}
        style={styles.bannerAgendarConsul}
        resizeMode="contain"
      />

      <Text style={styles.tituloAgendarConsul}>Nome do advogado</Text>

      <Text style={styles.descricao}>descrição do advogado</Text>

      <Text style={styles.dataAgendarConsul}>DATA</Text>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        <TouchableOpacity style={styles.btnAgendarConsul}>
          <Text style={styles.btnTextAgendarConsul}>HORA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnAgendarConsul}>
          <Text style={styles.btnTextAgendarConsul}>HORA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnAgendarConsul}>
          <Text style={styles.btnTextAgendarConsul}>HORA</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        <TouchableOpacity style={styles.btnAgendarConsul}>
          <Text style={styles.btnTextAgendarConsul}>HORA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnAgendarConsul}>
          <Text style={styles.btnTextAgendarConsul}>HORA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnAgendarConsul}>
          <Text style={styles.btnTextAgendarConsul}>HORA</Text>
        </TouchableOpacity>
      </View>

       <Text style={styles.dataAgendarConsul}>DATA</Text>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        <TouchableOpacity style={styles.btnAgendarConsul}>
          <Text style={styles.btnTextAgendarConsul}>HORA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnAgendarConsul}>
          <Text style={styles.btnTextAgendarConsul}>HORA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnAgendarConsul}>
          <Text style={styles.btnTextAgendarConsul}>HORA</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        <TouchableOpacity style={styles.btnAgendarConsul}>
          <Text style={styles.btnTextAgendarConsul}>HORA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnAgendarConsul}>
          <Text style={styles.btnTextAgendarConsul}>HORA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnAgendarConsul}>
          <Text style={styles.btnTextAgendarConsul}>HORA</Text>
        </TouchableOpacity>
      </View>

       <Text style={styles.dataAgendarConsul}>DATA</Text>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        <TouchableOpacity style={styles.btnAgendarConsul}>
          <Text style={styles.btnTextAgendarConsul}>HORA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnAgendarConsul}>
          <Text style={styles.btnTextAgendarConsul}>HORA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnAgendarConsul}>
          <Text style={styles.btnTextAgendarConsul}>HORA</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        <TouchableOpacity style={styles.btnAgendarConsul}>
          <Text style={styles.btnTextAgendarConsul}>HORA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnAgendarConsul}>
          <Text style={styles.btnTextAgendarConsul}>HORA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnAgendarConsul}>
          <Text style={styles.btnTextAgendarConsul}>HORA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}