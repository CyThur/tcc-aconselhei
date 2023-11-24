import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Modal, Image, TextInput, Linking, Share } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, getDoc, addDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from '../firebase.config.js';
import { styles } from '../Styles.js';
import { useForm, Controller, set } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';



export default function TextoSolicitAgenda({ navigation, route }) {
  const user = getAuth();
  const { id, nome, texto, cate, diaDaSemana, horario } = route.params //ConsulAgen.js
  const [idUsu, setIdUsu] = useState('')
  const [nomeUser, setNomeUser] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [linkConsultoria, setLinkConsultoria] = useState('');

  const schema = yup.object().shape({
    link: yup.string().url('Insira um link').required('Campo vazio'),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });


  async function pegarNomeAdv() {
    const docRef = doc(db, 'advogados', user.currentUser.uid)

    await getDoc(docRef).then((doc) => {
      setNomeUser(doc.data().nome)
    })
  }

  //pegando ID do usuário que fez a solicitacao
  useEffect(() => {
    pegarNomeAdv()
    onAuthStateChanged(auth, async () => {
      const docRef = doc(db, 'advogados', user.currentUser.uid, 'solicitacoes', id)
      await getDoc(docRef).then((doc) => {
        setIdUsu(doc.data().id)
      })
    })
  }, [])

  //pegando ID da solicitação aceita do usuário, NO USUÁRIO
  useEffect(() => {
    pegarNomeAdv()
    onAuthStateChanged(auth, async () => {
      const docRef = doc(db, 'usuarios', idUsu, 'solicitAceita', id)
      await getDoc(docRef).then((doc) => {
        setIdUsu(doc.data().id)
      })
    })
  }, [])


  function TextoDoUsu() {
    return (
      <View style={styles.telasAdv}>
        <View style={stylesN.containerNome}>
          <Text style={stylesN.nomeTxt}>{cate}</Text>
        </View>

        <Text style={stylesN.especiTxt}>De: {nome}</Text>
        <Text style={stylesN.especiTxt}>Para: {nomeUser}</Text>

        <View style={stylesN.containerTexto}>
          <ScrollView style={{ width: 300 }}>
            <Text style={stylesN.textoTxt}>{texto}</Text>
          </ScrollView>
        </View>

        {/* ABRIR MODAL */}
        {linkConsultoria ? (
          <View style={{ width: '87%', height: '13%', alignSelf:'center' }}>
            <TouchableOpacity
              style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: '#1E5A97',  width: '100%', borderRadius: 16, padding: 10 }}
              onPress={() => { EntrarReuniao(); console.log('*click*'); }}
              onLongPress={() => Share.share({ message: linkConsultoria })}>
              <Text style={{ color: '#1E5A97', fontSize: 16, fontWeight: '500', color: 'white', textAlign:'center' }}>Toque para ir à reunião ou segure para copiar o link</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={[styles.button, { marginBottom: 90 }]} onPress={() => setModalVisible(true)}>
            <Text style={styles.loginButtonText}>ENVIAR O LINK DA REUNIÃO</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }


  useEffect(() => {
    async function PegarLink() {
      const collectionRef = collection(db, 'advogados', user.currentUser.uid, 'solicitacoes');
      const q = query(collectionRef, where("cate", "==", `${cate}`), where("diaDaSemana", "==", `${diaDaSemana}`), where("horario", "==", `${horario}`));
      const querySnapshot = await getDocs(q);

      const links = await Promise.all(querySnapshot.docs.map(async (docData) => {
        const docRefAdv = doc(db, 'advogados', user.currentUser.uid, 'solicitacoes', docData.id);
        const docSnap = await getDoc(docRefAdv);

        if (docSnap.exists()) {
          return docSnap.data().link;
        }
      }));

      if (links.length > 0) {
        setLinkConsultoria(links[0]);
      }
    }
    PegarLink();
  }, []);

  const ValidacaoLink = async (data) => {
    try {
      const linkValidado = await schema.validate(data);
      await EnviarLink(linkValidado);
      console.log("LINK: ", linkValidado);
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error)
    }
  };

  const EnviarLink = async (data) => {
    const collectionRef = collection(db, 'advogados', user.currentUser.uid, 'solicitacoes');
    const q = query(collectionRef, where("cate", "==", `${cate}`), where("diaDaSemana", "==", `${diaDaSemana}`), where("horario", "==", `${horario}`));
    const querySnapshot = await getDocs(q);

    await Promise.all(querySnapshot.docs.map(async (docData) => {
      const docRefAdv = doc(db, 'advogados', user.currentUser.uid, 'solicitacoes', docData.id);
      await updateDoc(docRefAdv, {
        link: data.link
      });
    }));

  //   const docRefUsu = collection(db, 'usuarios', idUsu, 'LinkReuniaoUsu')  ACHO QUE NÃO PRECISA MAIS
  //   await addDoc(docRefUsu, {
  //     link: data.link
  //   });
  //   setModalVisible(false);
  //   setInputText('');
  //   navigation.navigate('TabRoutesAdv', { screen: 'HomeAdv' })
  //   Alert.alert('Atenção', 'Link enviado com sucesso!')
  }

  const EntrarReuniao = async () => {
    Linking.openURL(linkConsultoria);

    const collectionRef = collection(db, 'advogados', user.currentUser.uid, 'solicitacoes');
    const q = query(collectionRef, where("cate", "==", `${cate}`), where("diaDaSemana", "==", `${diaDaSemana}`), where("horario", "==", `${horario}`));
    const querySnapshot = await getDocs(q);
    
    const consulRealizadas = await Promise.all(querySnapshot.docs.map(async (docData) => {
      const docRef = doc(db, 'advogados', user.currentUser.uid, 'solicitacoes', docData.id);
      await updateDoc(docRef, {
        realizada: true
      });

      console.log("realizada"); 
    }));
  }


  return (
    <View style={styles.containerTelas}>

      <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', alignSelf: 'center' }}>
        <TextoDoUsu />
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.containerTelas}>
          <View style={styles.logoView}>
            <Image
              style={styles.logo2}
              source={require('../../assets/aconselhei1.png')}
            />
          </View>
          <View style={{ width: '80%', alignSelf: 'center', }}>
            <Text style={[styles.navOption, { marginBottom: 10, marginTop: 20, }]}>Envie o link da reunião para {nome}.</Text>
          </View>
          <ScrollView style={{ marginTop: 20, paddingBottom: 10, width: '100%', alignSelf: 'center', }} showsVerticalScrollIndicator={false}>

            <Controller
              name="link"
              control={control}
              defaultValue=""
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[
                    stylesN.input, {
                      borderWidth: errors.link ? 1.5 : 1,
                      borderColor: errors.link ? '#f23535' : '#000',
                      marginBottom: errors.link ? 5 : 16
                    }]}
                  onBlur={onBlur}
                  onChangeText={onChange} //value => onChange(value)
                  value={value}
                  placeholder="Insira o link aqui..."
                  multiline
                  autoCapitalize="none"
                />
              )}
            />
            {errors.link && <Text style={[styles.inputLoginError, { marginLeft: '10%' }]}>{errors.link.message}</Text>}

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '115%', alignSelf: 'center', }}>
              <TouchableOpacity style={[styles.button, { marginBottom: 10, justifyContent: 'center', backgroundColor: '#fff', paddingVertical: 0, paddingHorizontal: 0, borderRadius: 0 }]} onPress={() => { setModalVisible(false) }}>
                <Text style={[styles.buttonText, { color: '#1E5A97' }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { marginBottom: 10 }]} onPress={handleSubmit(ValidacaoLink)}>
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>

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
    marginTop: 40,
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
    height: '55%',
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
  },
});