import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { getFirestore, updateDoc, collection, query, getDocs, where, deleteDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase.config.js';
import { styles } from '../Styles.js';

export default function TextoAgendaUsu({ route }) {
    const user = getAuth();
const { nomeUsu, nomeAdv, texto, espe, } = route.params;
const [idUsu, setIdUsu] = useState('');
const [link, setLink] = useState('');

useEffect(() => {
  onAuthStateChanged(user, async (user) => {
    if (user) {
      setIdUsu(user.uid);
      const docRef = doc(db, 'usuarios', user.uid, 'LinkReuniaoUsu');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLink(docSnap.data().link);
      }
    }
  });
}, []);

console.log(link);
console.log(idUsu);

    function TextoDoUsu() {
       

        async function PegarLink() {
            const docRef = collection(db, 'usuarios', idUsu, 'LinkReuniaoUsu'); // Substitua 'idUsu' pelo ID do usuário
            const snapshot = await getDocs(docRef);
            const doc = snapshot.docs.find(doc => doc.data().link); // Encontrar o primeiro documento onde o campo 'link' existe
            if (doc) {
                setLink(doc.data().link); // Definir 'link' como uma string
            }
            console.log(link);
            console.log(idUsu);
        }


        useEffect(() => {
            PegarLink();
        }, []);

        return (
            <View style={styles.telasAdv}>
                <View style={stylesN.containerNome}>
                    <Text style={stylesN.nomeTxt}>{espe}</Text>
                </View>

                <Text style={stylesN.especiTxt}>De: {nomeUsu}</Text>
                <Text style={stylesN.especiTxt}>Para: {nomeAdv}</Text>

                <View style={stylesN.containerTexto}>
                    <ScrollView style={{ width: 300 }}>
                        <Text style={stylesN.textoTxt}>{texto}</Text>
                    </ScrollView>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', width: '70%', alignSelf: 'center' }}>
                    <Text style={{ color: '#1E5A97', fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>Aguarde o link da reunião que será enviado pelo(a) advogado(a)</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '90%', alignSelf: 'center' }}>
                <Text style={{ color: '#1E5A97', fontSize: 15, fontWeight: 'bold', marginTop: 10 }}>{link}</Text>
                </View>
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