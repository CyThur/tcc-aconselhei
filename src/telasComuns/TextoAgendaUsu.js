import React, { useEffect, useState } from 'react';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase.config.js';
import { styles } from '../Styles.js';

export default function TextoAgendaUsu({ route }) {
    const user = getAuth();
    const { idBene, nomeUsu, nomeAdv, texto, espe, } = route.params //AgendaUsu.js

    function TextoDoUsu() { //PAROU AQUI, PRECISA PEGAR O LINK

        const [link, setLink] = useState(null);

        async function PegarLink() {
            const docRef = doc(db, 'usuarios', idBene, 'solicitAceita');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const link = docSnap.data().link;
                setLink(link);
                console.log("AQUI O LINK :", link)
            } else {
                console.log("No such document!");
                return null;
            }
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
                    <Text style={{ color: '#1E5A97', fontSize: 15, fontWeight: 'bold', textAlign:'center' }}>Aguarde o link da reunião</Text>
                    <Text style={{ color: '#1E5A97', fontSize: 15, fontWeight: 'bold' }}>{link} aa</Text>
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