import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { addDoc, doc, setDoc, collection } from "firebase/firestore";
import { db } from '../../../firebase.config.js';
import { useNavigation } from '@react-navigation/native';

export default function EscreverDuvida({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [idSolici, setIdSolici] = useState()

  const auth = getAuth();
  const { id, nome } = route.params

  const handleRequest = async () => {
    try {
      const docRef = collection(db, 'advogados', id, 'solicitacoes');
      await addDoc(docRef, {
        nome: nome,
        texto: inputText,
        status: 'pendente',
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
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => {
        setModalVisible(true)
      }}>
        <Text>Peça ajuda ao advogado</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            placeholder="Digite suas informações..."
            onChangeText={(text) => setInputText(text)}
            value={inputText}
            multiline
            style={{ borderWidth: 1, padding: 10, width: '80%', marginBottom: 20 }}
          />
          <Button title="Enviar" onPress={handleRequest} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}