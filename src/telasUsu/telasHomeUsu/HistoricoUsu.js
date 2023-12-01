import React, { useState, useEffect } from 'react';
import { Text, View, Image, FlatList, Modal, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../../Styles';
import { useForm, Controller, set } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { collection, query, getDocs, where, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase.config.js';
import { getAuth } from 'firebase/auth';

export default function HistoricoUsu({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [list, setList] = useState([]);

  const schema = yup.object().shape({
    textoDenuncia: yup.string().required('Campo vazio'),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const user = getAuth()

  const colRef = collection(db, 'usuarios', user.currentUser.uid, 'consultoriasRealizadasUsu');

  const q = query(colRef, where('status', '==', 'realizada'), where('realizada', '==', true));

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
    }).catch((err) => console.log('Erro:', err))
  }

  useEffect(() => {
    pegarDadosFiltrados()
  }, [])

  function ConsultoriasRealizadas({ item }) {
    return (                              //MELHORAR A ESTILIZAÇÃO DO CARD DO HISTÓRICO
      <View style={styles.labelContainerHistUsu}>
          <Text style={styles.nomeHistUsu}>{item.data.nome} ({item.data.espe})</Text>
          <Text style={styles.dateHistUsu}>{item.data.diaDaSemana} — {item.data.horario}</Text>
          <Text style={styles.msgHistUsu}>{item.data.texto}</Text>
          <TouchableOpacity
            style={styles.denunciarHistUsu}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.denunciarTxtHistUsu}>DENUNCIAR</Text>
          </TouchableOpacity>
      </View>
    )
  }

  if (list.length == 0) {
    return (
      <View style={styles.containerTelas}>
        <View style={styles.logoView}>
          <View style={{
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <AntDesign
              name="left"
              size={20}
              color="#1E5A97"
              style={{ marginRight: '7%' }}
              onPress={() => navigation.navigate('TabRoutesUsu')} />
            <Image
              style={styles.logo2}
              source={require('../../../assets/aconselhei1.png')}
            />
          </View>
        </View>
        <Text style={styles.navOption}>HISTÓRICO</Text>
        <View style={{ height: '65%', width: '70%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', }}>
          <Text style={styles.txt3}>Você ainda não realizou nenhuma consultoria.</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.containerTelas}>
      <View style={styles.logoView}>
        <View style={{
          flexDirection: 'row',
          width: '100%',
          height: '100%',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <AntDesign
            name="left"
            size={20}
            color="#1E5A97"
            style={{ marginRight: '7%' }}
            onPress={() => navigation.navigate('TabRoutesAdv')} />
          <Image
            style={styles.logo2}
            source={require('../../../assets/aconselhei1.png')}
          />
        </View>
      </View>
      <Text style={styles.navOption}>HISTÓRICO</Text>
      <ScrollView style={{ marginTop: '6%', paddingBottom: 10, height: '60%', width: '90%', alignSelf: 'center', }} showsVerticalScrollIndicator={false}>
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.containerTelas}>
            <View style={styles.logoView}>
              <Image
                style={styles.logo2}
                source={require('../../../assets/aconselhei1.png')}
              />
            </View>
            <View style={{ width: '80%', alignSelf: 'center', }}>
              <Text style={[styles.navOption, { marginBottom: 10, marginTop: 20, }]}>O(A) advogado(a) teve má conduta durante a consultoria? Denuncie</Text>
            </View>
            <ScrollView style={{ marginTop: 20, paddingBottom: 10, width: '100%', alignSelf: 'center', }} showsVerticalScrollIndicator={false}>

              <Controller
                name="textoDenuncia"
                control={control}
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      stylesN.input, {
                        borderWidth: errors.textoDenuncia ? 1.5 : 1,
                        borderColor: errors.textoDenuncia ? '#f23535' : '#000',
                        marginBottom: errors.textoDenuncia ? 5 : 16
                      }]}
                    onBlur={onBlur}
                    onChangeText={onChange} //value => onChange(value)
                    value={value}
                    placeholder="Escreva sua denúncia aqui..."
                    multiline
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.textoDenuncia && <Text style={[styles.inputLoginError, { marginLeft: '10%' }]}>{errors.textoDenuncia.message}</Text>}

              <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '115%', alignSelf: 'center', }}>
                <TouchableOpacity style={[styles.button, { marginBottom: 10, justifyContent: 'center', backgroundColor: '#fff', paddingVertical: 0, paddingHorizontal: 0, borderRadius: 0 }]} onPress={() => { setModalVisible(false) }}>
                  <Text style={[styles.buttonText, { color: '#1E5A97' }]}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { marginBottom: 10 }]} onPress={() => { setModalVisible(false); Alert.alert('Atenção', 'Sua denúncia foi enviada com sucesso e será analisada pela equipe da AconseLhEI'); }}>
                  <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Modal>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', alignSelf: 'center' }}>
          {list.map((item) => <ConsultoriasRealizadas key={item.id} item={item} />)}
        </View>
      </ScrollView>

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
    marginTop: 45,
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
    marginBottom: 5,
  },

  containerTexto: {
    borderRadius: 5,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 15,
    height: '60%',
    width: '150%',
    padding: 15,
  },

  textoTxt: {
    fontSize: 15,
    color: '#000',
  },

  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '80%',
    marginBottom: 20,
    marginTop: 20,
    alignSelf: 'center',
  }
});

// return (
//   <View style={styles.containerHistUsu}>
//     <Text style={styles.titleHistUsu}>Meus Agendamentos</Text>
//     <View style={styles.navigatorHistUsu}>
//       <TouchableOpacity>
//         <Text style={styles.navOptionHistUsu}>Próximas</Text>
//       </TouchableOpacity>

//       <TouchableOpacity>
//         <Text style={styles.navOption2HistUsu}>Histórico</Text>
//       </TouchableOpacity>
//     </View>

//     <ScrollView style={styles.scrollViewHistUsu}>
//       <View style={styles.labelContainerHistUsu}>
//         <View style={{ paddingRight: 15 }}>
//           <Text style={styles.dateHistUsu}>05/11/2023</Text>
//           <Text style={styles.timeHistUsu}>17:00</Text>
//         </View>

//         <View>
//           <Text style={styles.categoryHistUsu}>Direito do consumidor</Text>
//           <Text style={styles.sourceHistUsu}>Realizada por chat</Text>
//         </View>
//       </View>

//       <View style={styles.labelContainerHistUsu}>
//         <View style={{ paddingRight: 15 }}>
//           <Text style={styles.dateHistUsu}>05/11/2023</Text>
//           <Text style={styles.timeHistUsu}>17:00</Text>
//         </View>

//         <View>
//           <Text style={styles.categoryHistUsu}>Direito do consumidor</Text>
//           <Text style={styles.sourceHistUsu}>Realizada por chat</Text>
//         </View>
//       </View>

//       <View style={styles.labelContainerHistUsu}>
//         <View style={{ paddingRight: 15 }}>
//           <Text style={styles.dateHistUsu}>05/11/2023</Text>
//           <Text style={styles.timeHistUsu}>17:00</Text>
//         </View>

//         <View>
//           <Text style={styles.categoryHistUsu}>Direito do consumidor</Text>
//           <Text style={styles.sourceHistUsu}>Realizada por chat</Text>
//         </View>
//       </View>
//     </ScrollView>
//   </View>