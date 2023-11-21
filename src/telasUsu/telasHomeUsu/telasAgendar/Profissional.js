import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../../../Styles';
import { db } from '../../../firebase.config.js';
import { getAuth } from 'firebase/auth';

import { collection, doc, query, getDocs, where, getDoc } from 'firebase/firestore'

export default function Profissional({ route, navigation }) {

    const {speciality } = route.params;
    const [hasImage, setHasImage] = useState(false);

    const colRef = collection(db, 'advogados');
    const q = query(colRef, where('categorias', 'array-contains', speciality));

    const [list, setList] = useState([]);
    const [nomeUser, setNomeUser] = useState('')

    const user = getAuth()

    const [advogadosComHorarios, setAdvogadosComHorarios] = useState([]);


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

    async function fetchHorarios(id) {
        const advogadoDoc = doc(db, "advogados", id);
        const advogadoDocData = await getDoc(advogadoDoc);
        if (advogadoDocData.exists()) {
            const horarios = advogadoDocData.data()
            return ['horarioSegunda', 'horarioTerça', 'horarioQuarta', 'horarioQuinta', 'horarioSexta', 'horarioSábado', 'horarioDomingo'].some(dia => horarios.hasOwnProperty(dia) && horarios[dia] !== undefined && horarios[dia].length > 0);
        }
        return false;
    }

    useEffect(() => {
        const fetchAllHorarios = async () => {
            const promises = list.map(item => fetchHorarios(item.id));
            const resultados = await Promise.all(promises);
            const advogados = list.filter((_, index) => resultados[index]);
            setAdvogadosComHorarios(advogados);
            //PRA TESTAR
            // console.log("PROMESSAS:", promises, "RESULTADOS:", resultados, "ADVOGADOS:", advogados)
        };

        if (list.length > 0) {
            fetchAllHorarios();
        }
    }, [list]);

    useEffect(() => {
        pegarNomeUsuario()
        pegarDadosFiltrados()
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
                onPress={() => navigation.navigate('PerfilAdvEsco', { adv: item, id: id, nomeCerto: nome, speciality })}
            >
                <View style={{ marginTop: '10%', height: 120, width: 120, borderRadius: 60, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={{ uri: item && item.foto ? item.foto : 'https://www.pinclipart.com/picdir/big/157-1578186_user-profile-default-image-png-clipart.png' }}
                        style={{ height: 120, width: 120, borderRadius: 60, borderWidth: 1, borderColor: '#000' }}
                    />
                </View>
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
                    {advogadosComHorarios.map((item) => {
                        return <Advs item={item.data} id={item.id} nome={nomeUser} />
                    })}

                </View>
            </ScrollView>

        </View>
    );
}