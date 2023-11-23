import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Modal, Image, TextInput } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, updateDoc, setDoc } from "firebase/firestore";
import { auth, db } from '../firebase.config.js';
import { styles } from '../Styles.js';
import { useForm, Controller, set } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';



export default function TextoSolicitAgenda({ route }) {
    const user = getAuth();
    const { id, nome, texto, cate } = route.params
    const [idUsu, setIdUsu] = useState('')
    const [nomeUser, setNomeUser] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [inputText, setInputText] = useState('');

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
                <TouchableOpacity style={[styles.button, { marginBottom: 90 }]} onPress={() => setModalVisible(true)}>
                    <Text style={styles.loginButtonText}>ENVIAR O LINK DA REUNIÃO</Text>
                </TouchableOpacity>

            </View>
        )
    }

    const ValidacaoLink = async (data) => {
      try {
        const linkValidado = await schema.validate(data);
        await EnviarLink(linkValidado);
        console.log("LINK: ",linkValidado);
      } catch (error) {
        console.error('Erro ao enviar solicitação:', error)
      }
    };

    const EnviarLink = async (data) => {
        const docRefAdv = doc(db, 'advogados', user.currentUser.uid, 'solicitacoes', id);
        await updateDoc(docRefAdv, {
          link: data.link
        });

        const docRefUsu = doc(db, 'usuarios', idUsu, 'solicitAceita', id)
        await setDoc(docRefUsu, {
          link: data.link
        });
        console.log("UUUIII: ",docRefAdv.id)
        Alert.alert('Atenção', 'Link enviado com sucesso!')
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
            <Text style={[styles.navOption, { marginBottom: 10, marginTop: 20, }]}>Por favor, justifique a rejeição.</Text>
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
});