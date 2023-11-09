import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase.config.js';
import { styles } from '../../Styles.js';


export default function EscreverDuvida({ navigation, route }) {
  const user = getAuth();
  const { id, nome, texto } = route.params


  function TextoDoUsu() {
    return (
      <View style={styles.telasAdv}>
        <View style={stylesN.containerNome}>
          <Text style={stylesN.nomeTxt}>{nome}</Text>

          {/* Exemplo... ainda não está pegando as especialidades */}
          <Text style={stylesN.especiTxt}>Direito da Família</Text>
        </View>

        <View style={stylesN.containerTexto}>
          <ScrollView >
            <Text style={stylesN.textoTxt}>{texto}</Text>
          </ScrollView>
        </View>

        <TouchableOpacity style={[styles.button, { marginBottom: 10 }]} onPress={() => {
          const docRef = doc(db, 'advogados', user.currentUser.uid, 'solicitacoes', id)
          updateDoc(docRef, {
            status: 'aceita'
          }).then(() => {
            console.log('aceita')
          })

          navigation.navigate('TabRoutesAdv')
          Alert.alert('Atenção', 'Confira sua tela de agendamentos para ver a solicitação aceita!')
        }}>
          <Text style={styles.loginButtonText}>ACEITAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { marginBottom: 90 }]} onPress={() => {
          const docRef = doc(db, 'advogados', user.currentUser.uid, 'solicitacoes', id)
          Alert.alert(
            'Confirmação',
            'Tem certeza de que deseja recusar esta consultoria?',
            [
              {
                text: 'Cancelar',
                onPress: () => console.log('Cancelado'),
                style: 'cancel',
              },
              {
                text: 'Confirmar',
                onPress: () => {
                  deleteDoc(docRef)
                  navigation.navigate('TabRoutesAdv', { screen: 'HomeAdv' })
                  Alert.alert('Atenção', 'Solicitação recusada com sucesso!')
                },
              },
            ],
            { cancelable: false }
          );
        }}>
          <Text style={styles.loginButtonText}>RECUSAR</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.containerTelas}>

      <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', alignSelf: 'center' }}>
        <TextoDoUsu />
      </View>

    </View>

  );
}

const stylesN = StyleSheet.create({
  containerNome: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    width: 300,
    marginTop: 35,
    marginBottom: 20,
  },

  nomeTxt: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 25,
  },

  especiTxt: {
    fontSize: 15,
    color: 'gray',
    marginBottom: 15,
  },

  containerTexto: {
    borderRadius: 5,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    height: '60%',
    width: '98%',
    padding: 15,
  },

  textoTxt: {
    fontSize: 15,
    color: '#000',
  },
});