import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../../../Styles';
import { db } from '../../../firebase.config.js';
import { getAuth } from 'firebase/auth';

import { collection, doc, query, getDocs, where, getDoc } from 'firebase/firestore'

export default function Profissional({ route, navigation }) {

    const { speciality } = route.params;
    const colRef = collection(db, 'advogados');
    const q = query(colRef, where('categorias', 'array-contains', speciality));

    const [list, setList] = useState([]);
    const [nomeUser, setNomeUser] = useState('djskdjsk')

    const user = getAuth()


    async function pegarNomeUsuario() {
        const docRef = doc(db, 'usuarios', user.currentUser.uid)

        getDoc(docRef).then((doc) => {
            setNomeUser(doc.data().nome)
        })
    }

    async function pegarDadosFiltrados() {
        await getDocs(q).then((snapshot) => {
            const arr = []
            snapshot.forEach((doc) => {
                // setList((prev) => {

                //     const copyState = [...prev, doc.data()]
                //     return copyState
                // })

                const obj = {
                    data: doc.data(),
                    id: doc.id
                }
                arr.push(obj)
            })

            setList(arr)
            console.log(arr)
        }).catch((err) => console.log(err))
    }

    useEffect(() => {
        pegarDadosFiltrados()
    }, [])

    useEffect(() => {
        pegarNomeUsuario()
    }, [])

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
                            source={require('../../../../assets/aconselhei1.png')}
                        />
                    </View>
                </View>
                <View style={styles.txtView3}>
                    <Text style={styles.txt}>Advogados especialzados no assunto:</Text>
                    <Text style={styles.txt2}>{speciality}</Text>
                </View>
                <View style={{ height: '60%', width: '70%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', }}>
                    <Text style={styles.txt3}>Desculpe! Ainda não há advogados cadastrados que trabalhem com essa especialidade.</Text>
                </View>
            </View>
        );
    }

    function Advs({ item, id, nome }) {
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('PerfilAdvEsco', { adv: item, id: id, nomeCerto: nome })}
            >
                <Text style={styles.name2}>{item.nome}</Text>
            </TouchableOpacity>
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
                        onPress={() => navigation.navigate('TabRoutesUsu')} />
                    <Image
                        style={styles.logo2}
                        source={require('../../../../assets/aconselhei1.png')}
                    />
                </View>
            </View>

            <View style={styles.txtView3}>
                <Text style={styles.txt}>Advogados especialzados no assunto:</Text>
                <Text style={styles.txt2}>{speciality}</Text>
            </View>
            <ScrollView style={{ height: '100%', width: '90%' }} showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {list.map((item) => <Advs item={item.data} id={item.id} nome={nomeUser} />)}
                </View>
            </ScrollView>

        </View>
    );
}