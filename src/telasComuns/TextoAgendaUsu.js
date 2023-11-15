import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { dgetFirestore, addDoc, doc, updateDoc, collection, query, getDocs, setDoc, where, deleteDoc, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase.config.js';
import { styles } from '../Styles.js';

export default function TextoAgendaUsu({ route }) {
    const user = getAuth();
    const { nomeUsu, nomeAdv, texto, espe } = route.params

    function TextoDoUsu() {
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