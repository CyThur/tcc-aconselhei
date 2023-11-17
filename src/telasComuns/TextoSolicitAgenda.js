import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase.config.js';
import { styles } from '../Styles.js';



export default function TextoSolicitAgenda({ route }) {
    const user = getAuth();
    const { id, nome, texto, cate } = route.params
    const [idUser, setIdUser] = useState('')
    const [nomeUser, setNomeUser] = useState('')


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
                <TouchableOpacity style={[styles.button, { marginBottom: 90 }]} onPress={() => ''}>
                    <Text style={styles.loginButtonText}>ENVIAR O LINK DA REUNIÃO</Text>
                </TouchableOpacity>

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