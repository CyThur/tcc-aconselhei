import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Alert, Image, ScrollView } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, getDoc, doc } from "firebase/firestore";
import { db } from '../../../firebase.config.js';
import { styles } from '../../../Styles.js';

export default function EscreverDuvida({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [idUser, setIdUser] = useState('');

  const auth = getAuth();
  const { id, nome, speciality } = route.params

  const handleRequest = async () => {
    try {
      const docRef = collection(db, 'advogados', id, 'solicitacoes');
      await addDoc(docRef, {
        nome: nome,
        texto: inputText,
        status: 'pendente',
        cate: speciality,
        id: idUser
      }).then((doc) => {
      });
      setModalVisible(false);
      setInputText('');
      navigation.navigate('TabRoutesUsu');
      Alert.alert('Atenção', 'Solicitação enviada com sucesso! Aguarde uma resposta do advogado.')
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const docRef = doc(db, 'usuarios', user.uid)
      await getDoc(docRef).then((doc) => {
        setIdUser(doc.id)
        console.log(doc.id)
      })
    })
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => {
        setModalVisible(true)
      }}>
        <Text>Peça ajuda ao advogado</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.containerTelas}>
          <View style={styles.logoView}>
            <Image
              style={styles.logo2}
              source={require('../../../../assets/aconselhei1.png')}
            />
          </View>
          <View style={{ width: '80%', alignSelf: 'center', }}>
            <Text style={[styles.navOption, { marginBottom: 10, marginTop: 20, }]}>Envie sua solicitação para receber ajuda!</Text>
          </View>
          <ScrollView style={{ marginTop: 20, paddingBottom: 10, width: '100%', alignSelf: 'center', }} showsVerticalScrollIndicator={false}>
            <TextInput
              placeholder="Detalhe seu problema..."
              onChangeText={(text) => setInputText(text)}
              value={inputText}
              multiline
              style={{ borderWidth: 1, borderRadius: 5, padding: 10, width: '80%', marginBottom: 20, marginTop: 20, alignSelf: 'center', }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '115%', alignSelf: 'center', }}>
              <TouchableOpacity style={[styles.button, { marginBottom: 10, justifyContent: 'center', backgroundColor: '#fff', paddingVertical: 0, paddingHorizontal: 0, borderRadius: 0 }]} onPress={() => { setModalVisible(false) }}>
                <Text style={[styles.buttonText, { color: '#1E5A97' }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { marginBottom: 10 }]} onPress={handleRequest}>
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}