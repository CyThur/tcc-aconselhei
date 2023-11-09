import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { getFirestore, doc, updateDoc, collection, query, getDocs, where, deleteDoc } from "firebase/firestore";
import { auth, db } from '../firebase.config.js';
import { styles } from '../Styles';
import { getAuth } from 'firebase/auth';

export default function Inicial({ navigation }) {
  const user = getAuth()

  const colRef = collection(db, 'advogados', user.currentUser.uid, 'solicitacoes');
  const q = query(colRef, where('status', '==', 'pendente'));

  const [list, setList] = useState([]);

  async function pegarDadosFiltrados() {
    await getDocs(q).then((snapshot) => {
      const arr = []
      snapshot.forEach((doc) => {
        const obj = {
          data: doc.data(),
          id: doc.id
        }
        arr.push(obj)
      })
      setList(arr)
    }).catch((err) => console.log(err))
  }

  useEffect(() => {
    pegarDadosFiltrados()
  }, [])


  if (list.length == 0) {
    return (
      <View style={styles.containerTelas}>
        <View style={{ height: '100%', width: '70%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', }}>
          <Text style={styles.txt3}>Ainda não há nenhuma solicitação.</Text>
        </View>
      </View>
    );
  }

  function Solicita({ item }) {
    return (
      <TouchableOpacity
        style={styleN.buttonSoli}
        onPress={() => {
          navigation.navigate('SolicitaTextoUsu', { nome: item.data.nome, texto: item.data.texto, id: item.id })
          console.log(item.id)
        }}
      >
        <Text style={styleN.nomeSoli}>{item.data.nome}</Text>

        {/* Exemplo... ainda não está pegando as especialidades */}
        <Text style={styleN.especiTxt}>Direito da Família</Text>

      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.containerTelas}>

      <View style={styles.logoView}>
        <Image
          style={styles.logo2}
          source={require('../../assets/aconselhei1.png')}
        />
      </View>
      <Text style={styles.navOption}>SOLICITAÇÕES</Text>
      <ScrollView style={{ marginTop: '6%', paddingBottom: 10, height: '60%', width: '90%', alignSelf: 'center', }} showsVerticalScrollIndicator={false}>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', alignSelf: 'center' }}>
          {list.map((item) => <Solicita item={item} />)}
        </View>
      </ScrollView>

    </View>
  );
}

const styleN = StyleSheet.create({
  buttonSoli: {
    width: '100%',
    height: 100,
    backgroundColor: '#C0C0C0',
    marginBottom: 10,
    padding: 15,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#4F4F4F',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5, especiTxt: {
      fontSize: 15,
      color: 'gray',
      marginBottom: 15,
    },
    shadowRadius: 3.84,
    elevation: 8,
  },

  nomeSoli: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },

  especiTxt: {
    fontSize: 15,
    color: '#4F4F4F',
  },
});