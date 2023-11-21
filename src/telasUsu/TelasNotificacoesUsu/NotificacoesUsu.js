import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import { doc, collection, query, getDocs, getDoc, where, deleteDoc } from "firebase/firestore";
import { auth, db } from '../../firebase.config.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { AntDesign } from '@expo/vector-icons';

import { styles } from '../../Styles';
import { set } from 'react-hook-form';

export default function NotificacoesUsu() {
  const user = getAuth()

  const colRef = collection(db, 'usuarios', user.currentUser.uid, 'solicitRecusadaNotifi');
  const q = query(colRef, where('status', '==', 'recusada'));

  const [list, setList] = useState([]);

  const [id, setId] = useState('');

  async function pegarDadosFiltrados() {
    await getDocs(q).then((snapshot) => {
      const arr = []
      snapshot.forEach((doc) => {
        const obj = {
          data: doc.data(),
          id: doc.id
        }
        arr.push(obj)
        setId(doc.id)
      })
      setList(arr)
    }).catch((err) => console.log(err))
  }

  useEffect(() => {
    pegarDadosFiltrados()
  }, []);

  //deletar notificação
  const pressDurationThreshold = 1000;
  const buttonPressTimer = useRef(null);
  const handlePressIn = () => {
    buttonPressTimer.current = setTimeout(() => {
      showDeleteConfirmation();
    }, pressDurationThreshold);
  };
  const handlePressOut = () => {
    clearTimeout(buttonPressTimer.current);
  };
  const showDeleteConfirmation = () => {
    Alert.alert(
      'Excluir Notificação',
      'Tem certeza de que deseja excluir esta notificação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: handleDelete },
      ],
      { cancelable: true }
    );
  };
  const handleDelete = () => {
    const docRef = doc(db, 'usuarios', user.currentUser.uid, 'solicitRecusadaNotifi', id)
    deleteDoc(docRef).then(() => { })

    // Atualizar a lista de notificações
    setList((prevList) => prevList.filter((notification) => notification.id !== id));

    console.log('Notificação excluída!');
    Alert.alert('Notificação excluída com sucesso!');
  };


  if (list.length == 0) {
    return (
      <View style={styles.containerTelas}>
        <View style={styles.logoView}>
          <Image
            style={styles.logo2}
            source={require('../../../assets/aconselhei1.png')}
          />
        </View>
        <Text style={styles.navOption}>NOTIFICAÇÕES</Text>
        <View style={{ height: '65%', width: '70%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', }}>
          <Text style={styles.txt3}>Ainda não há nenhuma notificação.</Text>
        </View>
      </View>
    );
  }

  function Solicita({ item }) {
    return (
      <View style={styleN.buttonSoli}>
        <TouchableOpacity
          style={styleN.buttonSoli2}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <View style={{


          }}>
            <View style={{ width: '100%' }}>
              <View style={{ backgroundColor: '#1E5A97', alignItems: 'center', width: '100%', borderTopEndRadius: 14, borderTopStartRadius: 14, paddingTop: 10, }}>
                <Text style={styleN.nomeSoli}>IMPORTANTE</Text>
              </View>

              <View style={{ margin: 15, flexDirection: 'row', flexWrap: 'wrap', width: '80%', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
                <Text style={styleN.txt}>{item.data.nome}</Text>
                <Text style={styleN.txt}> ({item.data.espe})</Text>
                <Text style={styleN.txt2}> recusou sua solicitação</Text>
                <Text style={styleN.txt}>!</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>


        <Text style={styleN.txt3}>Resposta:</Text>

        <ScrollView style={{ marginBottom: 15, paddingLeft: 15, paddingTop: 15, paddingRight: 15, width: '91%', backgroundColor: '#D3D3D3', alignSelf: 'center', padding: 5, borderRadius: 10, }}>
          <Text style={[styleN.txt, { marginBottom: 20 }]}>{item.data.texto} </Text>
        </ScrollView>

      </View>

    )
  }

  return (
    <View style={styles.containerTelas}>
      <View style={styles.logoView}>
        <Image
          style={styles.logo2}
          source={require('../../../assets/aconselhei1.png')}
        />
      </View>
      <Text style={styles.navOption}>NOTIFICAÇÕES</Text>
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
    height: 300,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#4F4F4F',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
      flexDirection: 'row',
      width: '100%',
      height: '100%',
      alignSelf: 'center',
    },

    buttonSoli2: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 15,
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
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },

  txt: {
    fontSize: 15,
    color: '#000',
  },

  txt2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },

  txt3: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 15,
    fontWeight: 'bold',
    color: '#1E5A97',
  },

  especiTxt: {
    fontSize: 15,
    color: '#4F4F4F',
  },
});