import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Modal, Image, TextInput } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, doc, updateDoc, collection, deleteDoc, getDoc } from "firebase/firestore";
import { auth, db } from '../../firebase.config.js';
import { styles } from '../../Styles.js';

export default function SolicitaTextoUsu({ navigation, route }) {
  const user = getAuth();
  const { id, nome, texto, cate } = route.params
  const [idUser, setIdUser] = useState('')
  const [nomeUser, setNomeUser] = useState('')

  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');

  async function pegarNomeAdv() {
    const docRef = doc(db, 'advogados', user.currentUser.uid)

    await getDoc(docRef).then((doc) => {
      setNomeUser(doc.data().nome)
    })
  }

  useEffect(() => {
    pegarNomeAdv()
    onAuthStateChanged(auth, async (user) => {
      const docRef = doc(db, 'advogados', user.uid, 'solicitacoes', id)
      await getDoc(docRef).then((doc) => {
        setIdUser(doc.data().id)
      })
    })
  }, [])


  const EnviaParaUsuAceita = async () => {
    try {
      const docRef = collection(db, 'usuarios', idUser, 'solicitAceita');
      await addDoc(docRef, {
        nome: nomeUser,
        texto: texto,
        deUsu: nome,
        espe: cate,
        status: 'aceita',
      }).then((doc) => {

      });

    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
    }
  }

  const EnviaJustiRecusada = async () => {
    const docRefde = doc(db, 'advogados', user.currentUser.uid, 'solicitacoes', id)
    try {
      const docRef = collection(db, 'usuarios', idUser, 'solicitRecusadaNotifi');
      await addDoc(docRef, {
        nome: nomeUser,
        texto: inputText,
        paraUsu: nome,
        espe: cate,
        status: 'recusada',
      }).then((doc) => {
      });
      deleteDoc(docRefde)
      setModalVisible(false);
      setInputText('');
      navigation.navigate('TabRoutesAdv', { screen: 'HomeAdv' })
      Alert.alert('Atenção', 'Justificação enviada com sucesso!')

    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
    }
  }


  function TextoDoUsu() {
    return (
      <View style={styles.telasAdv}>
        <View style={stylesN.containerNome}>
          <Text style={stylesN.nomeTxt}>{nome}</Text>

          {/* Exemplo... ainda não está pegando as especialidades */}
          <Text style={stylesN.especiTxt}>{cate}</Text>
        </View>

        <View style={stylesN.containerTexto}>
          <ScrollView style={{ width: 300 }}>
            <Text style={stylesN.textoTxt}>{texto}</Text>
          </ScrollView>
        </View>

        <TouchableOpacity style={[styles.button, { marginBottom: 10 }]} onPress={() => {
          const docRef = doc(db, 'advogados', user.currentUser.uid, 'solicitacoes', id)
          updateDoc(docRef, {
            status: 'aceita'
          }).then(() => {
            console.log('aceita');
            EnviaParaUsuAceita();
          })

          navigation.navigate('TabRoutesAdv', { screen: 'HomeAdv' })
          Alert.alert('Atenção', 'Confira sua tela de agendamentos para ver a solicitação aceita!')
        }}>
          <Text style={styles.loginButtonText}>ACEITAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { marginBottom: 90 }]} onPress={() => {
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
                onPress: () => { setModalVisible(true) },
              },
            ],
            { cancelable: false }
          );
        }}>
          <Text style={styles.loginButtonText}>RECUSAR</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible}  >
          <View style={styles.containerTelas}>
            <View style={styles.logoView}>
              <Image
                style={styles.logo2}
                source={require('../../../assets/aconselhei1.png')}
              />
            </View>
            <View style={{ width: '80%', alignSelf: 'center', }}>
              <Text style={[styles.navOption, { marginBottom: 10, marginTop: 20, }]}>Por favor, justifique a rejeição.</Text>
            </View>
            <ScrollView style={{ marginTop: 20, paddingBottom: 10, width: '100%', alignSelf: 'center', }} showsVerticalScrollIndicator={false}>
              <TextInput
                placeholder="Digite aqui..."
                onChangeText={(text) => setInputText(text)}
                value={inputText}
                multiline
                style={{ borderWidth: 1, borderRadius: 5, padding: 10, width: '80%', marginBottom: 20, marginTop: 20, alignSelf: 'center', }}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '115%', alignSelf: 'center', }}>
                <TouchableOpacity style={[styles.button, { marginBottom: 10, justifyContent: 'center', backgroundColor: '#fff', paddingVertical: 0, paddingHorizontal: 0, borderRadius: 0 }]} onPress={() => { setModalVisible(false) }}>
                  <Text style={[styles.buttonText, { color: '#1E5A97' }]}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { marginBottom: 10 }]} onPress={EnviaJustiRecusada}>
                  <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Modal>
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
    width: '150%',
    padding: 15,
  },

  textoTxt: {
    fontSize: 15,
    color: '#000',
  },
});