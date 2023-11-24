import React, { useEffect, useState, useRef } from 'react';
import { Link, useFocusEffect } from '@react-navigation/native';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Share } from 'react-native';
import { getFirestore, updateDoc, collection, query, getDocs, where, deleteDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase.config.js';
import { styles } from '../Styles.js';

export default function TextoAgendaUsu({ route }) {
    const user = getAuth();
    const { nomeUsu, nomeAdv, texto, espe, diaDaSemana, horario, idAdv } = route.params; //AgendaUsu.js
    const [idUsu, setIdUsu] = useState('');
    const [link, setLink] = useState('');
    const [linkConsultoria, setLinkConsultoria] = useState('');

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

        useEffect(() => {
            async function PegarLink() {
                const collectionRef = collection(db, 'advogados', idAdv, 'solicitacoes');
                const q = query(collectionRef, where("cate", "==", `${espe}`), where("diaDaSemana", "==", `${diaDaSemana}`), where("horario", "==", `${horario}`));
                const querySnapshot = await getDocs(q);

                const links = await Promise.all(querySnapshot.docs.map(async (docData) => {
                    const docRefAdv = doc(db, 'advogados', idAdv, 'solicitacoes', docData.id);
                    const docSnap = await getDoc(docRefAdv);

                    if (docSnap.exists()) {
                        return docSnap.data().link;
                    }
                }));

                if (links.length > 0) {
                    setLink(links[0]);
                    console.log("LINK: ", links);
                }
            }
            PegarLink();
        }, []);

        const EntrarReuniao = async () => {
            Linking.openURL(link);

            const collectionRef = collection(db, 'usuarios', user.currentUser.uid, 'solicitAceita');
            const q = query(collectionRef, where("espe", "==", `${espe}`), where("diaDaSemana", "==", `${diaDaSemana}`), where("horario", "==", `${horario}`));
            const querySnapshot = await getDocs(q);
            
            const consulRealizadas = await Promise.all(querySnapshot.docs.map(async (docData) => {
              const docRef = doc(db, 'usuarios', user.currentUser.uid, 'solicitAceita', docData.id);
              await updateDoc(docRef, {
                realizada: true
              });

              console.log("realizada");
            }));
          }

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


                {link ? (
                    <View style={{ width: '87%', height: '13%', alignSelf: 'center' }}>
                        <TouchableOpacity
                            style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: '#1E5A97', borderRadius: 16, padding: 10 }}
                            onPress={() => { EntrarReuniao(); console.log('*click*'); }}
                            onLongPress={() => Share.share({ message: link })}>
                            <Text style={{ color: '#1E5A97', fontSize: 16, fontWeight: '500', color: 'white', textAlign: 'center' }}>Toque para ir à reunião ou segure para copiar o link</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '70%', alignSelf: 'center' }}>
                        <Text style={{ color: '#1E5A97', fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>Aguarde o link da reunião que será enviado pelo(a) advogado(a)</Text>
                    </View>
                )}

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
        height: '55%',
        width: '150%',
        padding: 15,
    },

    textoTxt: {
        fontSize: 15,
        color: '#000',
    },
});