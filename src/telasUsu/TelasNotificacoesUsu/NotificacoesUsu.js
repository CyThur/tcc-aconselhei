import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Alert, FlatList } from 'react-native';
import { doc, collection, query, getDocs, getDoc, where, deleteDoc, } from "firebase/firestore";
import { auth, db } from '../../firebase.config.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { styles } from '../../Styles';

export default function NotificacoesUsu() {
  const user = getAuth()

  const colRef = collection(db, 'usuarios', user.currentUser.uid, 'solicitRecusadaNotifi');
  const qRecusada = query(colRef, where('status', '==', 'recusada'));

  const colRefAceita = collection(db, 'usuarios', user.currentUser.uid, 'solicitAceita');
  const qAceita = query(colRefAceita, where('status', '==', 'aceita'));

  const [list, setList] = useState([]);
  const [id, setId] = useState('');

  // async function pegarNotifiRecusadas() {
  //   await getDocs(q).then((snapshot) => {
  //     const arr = []
  //     snapshot.forEach((doc) => {
  //       const obj = {
  //         data: doc.data(),
  //         id: doc.id
  //       }
  //       arr.push(obj)
  //       setId(doc.id)
  //     })
  //     setList(arr)
  //   }).catch((err) => console.log(err))
  // }

  // useEffect(() => {
  //   pegarNotifiRecusadas()
  // }, []);

  // async function pegarNotifiAceitas() {
  //   await getDocs(qAceita).then((snapshot) => {
  //     const arrAceita = []
  //     snapshot.forEach((doc) => {
  //       const obj = {
  //         data: doc.data(),
  //         id: doc.id
  //       }
  //       arrAceita.push(obj)
  //       setId(doc.id)
  //     })
  //     setList(arrAceita)
  //   }).catch((err) => console.log(err))
  // }

  // useEffect(() => {
  //   pegarNotifiAceitas()
  // }, []);


  useEffect(() => {
    async function pegarNotificacoes() {
      let arr = [];
      let arrAceita = [];

      await getDocs(qRecusada).then((snapshot) => {
        snapshot.forEach((doc) => {
          const obj = {
            data: doc.data(),
            id: doc.id
          }
          arr.push(obj)
        })
      }).catch((err) => console.log(err))

      await getDocs(qAceita).then((snapshot) => {
        snapshot.forEach((doc) => {
          const obj = {
            data: doc.data(),
            id: doc.id
          }
          arrAceita.push(obj)
        })
      }).catch((err) => console.log(err))

      setList([...arr, ...arrAceita]);
      console.log(list);
    }

    pegarNotificacoes();
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

  const showDeleteConfirmation = (id, status) => {
    let message = 'Tem certeza de que deseja excluir esta notificação?';
    let buttons = [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', onPress: () => handleDelete(id) },
    ];
    if (status === 'aceita') {
      message = 'Esta notificação será excluída automaticamente após a realização da consultoria.';
      buttons = [];
    }

    Alert.alert(
      'Excluir Notificação',
      message,
      buttons,
      { cancelable: true }
    );
  };

  // Altere a função handleDelete para aceitar um id
  const handleDelete = (id) => {
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

  return (
    <View style={styles.containerTelas}>
      <View style={styles.logoView}>
        <Image
          style={styles.logo2}
          source={require('../../../assets/aconselhei1.png')}
        />
      </View>
      <Text style={styles.navOption}>NOTIFICAÇÕES</Text>
      <FlatList style={{ marginTop: '6%', paddingBottom: 10, height: '60%', width: '90%', alignSelf: 'center', }}
        showsVerticalScrollIndicator={false}
        data={list} // assumindo que 'list' é o seu array de notificações
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <View style={[styleN.buttonSoli, { height: item.data.status == 'aceita' ? 150 : 300 }]}>
            <TouchableOpacity
              onPressIn={() => {
                buttonPressTimer.current = setTimeout(() => {
                  showDeleteConfirmation(item.id, item.data.status);
                }, pressDurationThreshold);
              }}
              onPressOut={() => {
                clearTimeout(buttonPressTimer.current);
              }}
            >
              <View>
                <View style={{ width: '100%' }}>
                  <View style={{ backgroundColor: '#1E5A97', alignItems: 'center', width: '100%', borderTopEndRadius: 14, borderTopStartRadius: 14, paddingTop: 10, }}>
                    <Text style={styleN.nomeSoli}>IMPORTANTE</Text>
                  </View>

                  <View style={{ margin: 15, flexDirection: 'row', flexWrap: 'wrap', width: '80%', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
                    <Text style={styleN.txt}>{item.data.nome}</Text>
                    <Text style={styleN.txt}> ({item.data.espe})</Text>
                    <Text style={styleN.txt2}>{item.data.status == 'aceita' && item.data.link ?
                      'te enviou o link! Veja a consultoria na agenda para acessá-lo'
                      :
                      item.data.status == 'aceita' ? //DÁ PRA APAGAR AS NOTIFICAÇÕES 'status == aceita' E 'item.data.link' (quando tem link) ???
                        'aceitou sua solicitação! Em breve você receberá o link para reunião'
                        :
                        'recusou sua solicitação!'
                    }
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            {item.data.status == 'recusada' ? (
              <View style={{ height: '55%' }}>
                <Text style={styleN.txt3}>Resposta:</Text>
                <ScrollView style={{ marginBottom: 15, paddingLeft: 15, paddingTop: 15, paddingRight: 15, width: '91%', backgroundColor: '#D3D3D3', alignSelf: 'center', padding: 5, borderRadius: 10, }}>
                  <Text style={[styleN.txt, { marginBottom: 30 }]}>{item.data.texto} </Text>
                </ScrollView>
              </View>
            ) : null}
          </View>

        )}
      />

    </View>

  );
}

const styleN = StyleSheet.create({
  buttonSoli: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    marginBottom: 20,
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
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
    elevation: 3,
  },

  buttonSoli2: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
  },

  especiTxt: {
    fontSize: 15,
    color: 'gray',
    marginBottom: 15,
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
    textAlign: 'center',
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