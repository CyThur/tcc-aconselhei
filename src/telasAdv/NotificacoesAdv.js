import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Alert, FlatList } from 'react-native';
import { styles } from '../Styles';
import { doc, collection, query, getDocs, getDoc, where, deleteDoc } from "firebase/firestore";
import { auth, db } from '../firebase.config.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function NotificacoesAdv() {
  const user = getAuth()

  const colRefPendente = collection(db, 'advogados', user.currentUser.uid, 'solicitacoes');
  const qPendente = query(colRefPendente, where('status', '==', 'pendente'));

  const [list, setList] = useState([]);

  useEffect(() => {
    async function pegarNotificacoes() {
      let arrPendente = [];

      await getDocs(qPendente).then((snapshot) => {
        snapshot.forEach((doc) => {
          const obj = {
            data: doc.data(),
            id: doc.id
          }
          arrPendente.push(obj)
        })
      }).catch((err) => console.log(err))

      setList([...arrPendente]);
      console.log(list);
    }

    pegarNotificacoes();
  }, []);

  if (list.length == 0) {
    return (
      <View style={styles.containerTelas}>
        <View style={styles.logoView}>
          <Image
            style={styles.logo2}
            source={require('../../assets/aconselhei1.png')}
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
          source={require('../../assets/aconselhei1.png')}
        />
      </View>
      <Text style={styles.navOption}>NOTIFICAÇÕES</Text>
      <FlatList style={{ marginTop: '6%', paddingBottom: 10, height: '60%', width: '90%', alignSelf: 'center', }}
        showsVerticalScrollIndicator={false}
        data={list} // assumindo que 'list' é o seu array de notificações
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <View style={styleN.buttonSoli}>
            <TouchableOpacity
            //onde estava as funções pra apagar a notificação
            >
              <View>
                <View style={{ width: '100%' }}>
                  <View style={{ backgroundColor: '#1E5A97', alignItems: 'center', width: '100%', borderTopEndRadius: 14, borderTopStartRadius: 14, paddingTop: 10, }}>
                    <Text style={styleN.nomeSoli}>IMPORTANTE</Text>
                  </View>

                  <View style={{ margin: 15, flexDirection: 'row', flexWrap: 'wrap', width: '80%', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
                    <Text style={styleN.txt}>{item.data.nome}</Text>
                    <Text style={styleN.txt}> ({item.data.cate})</Text>
                    <Text style={styleN.txt2}>{item.data.status == 'pendente' ?
                        'te enviou uma solicitação de consultoria! Você pode aceitar ou recusar nas solicitações'
                        :
                        null
                    }
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>

  );
}

const styleN = StyleSheet.create({
  buttonSoli: {
    width: '100%',
    height: 170,
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