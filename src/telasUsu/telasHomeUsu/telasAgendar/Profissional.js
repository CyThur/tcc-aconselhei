import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { styles } from '../../../Styles';
import { firebase } from '../../../firebase.config.js';


export default function Profissional({ route, navigation }) {

    const [dataAdvs, setDataAdvs] = useState([]);
    const todoRef = firebase.firestore().collection('advogados');

    useEffect(async () => {
        todoRef.onSnapshot(querySnapshot => {
            const advs = [];
            querySnapshot.forEach(doc => {
                const { nome, oab, faculdade, espec } = doc.data();
                advs.push({
                    id: doc.id,
                    nome,
                    oab,
                    faculdade,
                    espec,
                });
            });
            setDataAdvs(advs);
        });
    }, []);


    // const [list, setList] = useState([]);

    // const retornarAdvs = async () => {
    //     //PEGAR DADOS DE UMA COLEÇÃO INTEIRA
    //     const collectionRef = collection(db, 'advogados');

    //     const snapshot = await getDocs(collectionRef);

    //     snapshot.forEach((doc) => {
    //         setList((prev) => {
    //             const copyState = [...prev, doc.data()]

    //             return copyState
    //         })
    //     })

    //     console.log(list)
    // }


    return (
        <View style={styles.containerTelas}>
            <View style={styles.logoView}>
                <Image
                    style={styles.logo2}
                    source={require('../../../../assets/aconselhei1.png')}
                />
            </View>

            <View style={styles.txtView3}>
                <Text style={styles.txt}>Advogados especialzados no</Text>
                <Text style={styles.txt}>assunto: {specialty}</Text>
            </View>

            <ScrollView style={{ paddingTop: 0, width: '90%' }} showsVerticalScrollIndicator={false}>
                <FlatList
                    style={{ height: '100%' }}
                    data={advs}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => navigation.navigate('', { adv: item })}
                        >
                            <Text style={styles.specialtyText}>{item.nome}</Text>
                        </TouchableOpacity>
                    )}
                />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                </View>
            </ScrollView>
        </View>
    );
}
