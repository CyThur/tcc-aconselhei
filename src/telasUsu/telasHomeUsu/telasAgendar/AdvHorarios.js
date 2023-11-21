import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Alert, Image, ScrollView } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, getDoc, doc } from "firebase/firestore";
import { styles } from '../../../Styles';
import { db } from '../../../firebase.config.js';

export default function AdvHorarios({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [inputText, setInputText] = useState('');
    const [idUser, setIdUser] = useState('');
    const [stateHorariosSegunda, setStateHorariosSegunda] = useState([]);
    const [stateHorariosTerca, setStateHorariosTerca] = useState([]);
    const [stateHorariosQuarta, setStateHorariosQuarta] = useState([]);
    const [stateHorariosQuinta, setStateHorariosQuinta] = useState([]);
    const [stateHorariosSexta, setStateHorariosSexta] = useState([]);
    const [stateHorariosSabado, setStateHorariosSabado] = useState([]);
    const [stateHorariosDomingo, setStateHorariosDomingo] = useState([]);
    const [dias, setDias] = useState([]);
    const [stateDiaDaSemana, setStateDiaDaSemana] = useState('');
    const [stateHorario, setStateHorario] = useState([]);

    const diasIndices = dias.reduce((acc, dia, index) => {
        acc[dia] = index;
        return acc;
    }, {});
    const auth = getAuth();
    const { id, nome, nomeAdv, speciality, foto } = route.params;

    const [hasImage, setHasImage] = useState(foto ? true : false);


    useEffect(() => {
        const fetchDias = async () => {
            const advogadoDoc = doc(db, "advogados", id);
            const advogadoDocData = await getDoc(advogadoDoc);
            console.log(doc(db, "advogados", id));
            if (advogadoDocData.exists()) {
                setDias(advogadoDocData.data().dias);
                console.log(`AQUI ${dias}`)
            }
        }
        fetchDias();
    }, []);

    useEffect(() => {
        const fetchHorarios = async () => {
            const advogadoDoc = doc(db, "advogados", id);
            const advogadoDocData = await getDoc(advogadoDoc);
            console.log(doc(db, "advogados", id));
            if (advogadoDocData.exists()) {
                setStateHorariosSegunda(advogadoDocData.data().horarioSegunda);
                setStateHorariosTerca(advogadoDocData.data().horarioTerça); //esses estados nao usam ç, mas o campo no firebase usa
                setStateHorariosQuarta(advogadoDocData.data().horarioQuarta);
                setStateHorariosQuinta(advogadoDocData.data().horarioQuinta);
                setStateHorariosSexta(advogadoDocData.data().horarioSexta);
                setStateHorariosSabado(advogadoDocData.data().horarioSábado);
                setStateHorariosDomingo(advogadoDocData.data().horarioDomingo);
                // SE PRECISAR TESTAR
                //  console.log(`${dias[0]}: ${stateHorariosSegunda}`)
                //  console.log(`${dias[1]}: ${stateHorariosTerca}`);
                //  console.log(`${dias[2]}: ${stateHorariosQuarta}`);
                //  console.log(`${dias[3]}: ${stateHorariosQuinta}`);
                //  console.log(`${dias[4]}: ${stateHorariosSexta}`);
                //  console.log(`${dias[5]}: ${stateHorariosSabado}`);
                //  console.log(`${dias[6]}: ${stateHorariosDomingo}`);
            }
        }
        fetchHorarios();
    }, []);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            const docRef = doc(db, 'usuarios', user.uid)
            await getDoc(docRef).then((doc) => {
                setIdUser(doc.id)
                console.log(doc.id)
            })
        })
    }, [])

    const disponibilidadeDia = (dia, horariosDia, index) => {
        if (horariosDia !== undefined) {
            const botaoHorariosDia = () => {
                const botoesPorLinha = 4;
                const botoes = [];
                for (let i = 0; i < horariosDia.length; i += botoesPorLinha) {
                    const linhaBotoes = horariosDia.slice(i, i + botoesPorLinha);
                    const botoesLinha = linhaBotoes.map((horario, index) => (
                        <TouchableOpacity
                            key={i + index}
                            style={styles.btnAgendarConsul}
                            onPress={() => { setModalVisible(true); setStateDiaDaSemana(dia); setStateHorario(horario);}} 
                            //TESTE: console.log('OLHA PRA MIM', stateDiaDaSemana, stateHorario); DENTRO DA LINHA ACIMA
                        >
                            <Text style={styles.btnTextAgendarConsul}>{horario}</Text>
                        </TouchableOpacity>
                    ));

                    botoes.push(
                        <View key={i} style={{ flexDirection: 'row', justifyContent: 'center', }}>
                            {botoesLinha}
                        </View>
                    );
                }

                return botoes;
            };

            if (dias.includes(dia)) {
                return (
                    <View>
                        <Text style={styles.dataAgendarConsul}>{dias[index].toUpperCase()}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View>
                                {botaoHorariosDia()}
                            </View>

                        </View>
                    </View>
                )
            }
        }
    };

    const handleRequest = async () => {
        try {
            const docRef = collection(db, 'advogados', id, 'solicitacoes');
            await addDoc(docRef, {
                nome: nome,
                texto: inputText,
                status: 'pendente',
                cate: speciality,
                id: idUser,
                diaDaSemana: stateDiaDaSemana,
                horario: stateHorario,
            }).then((doc) => {
            });
            setModalVisible(false);
            setInputText('');
            navigation.navigate('TabRoutesUsu');
            Alert.alert('Atenção', 'Solicitação enviada com sucesso! Aguarde uma resposta do advogado.')
        } catch (error) {
            console.error('Erro ao enviar solicitação:', error);
        }
    }

    return (
        <View style={styles.containerAgendarConsul}>

            <View style={{ marginTop: '10%', height: 120, width: 120, borderRadius: 60, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                <Image
                    source={{ uri: hasImage ? foto : 'https://www.pinclipart.com/picdir/big/157-1578186_user-profile-default-image-png-clipart.png' }}
                    style={{ height: 120, width: 120, borderRadius: 60, borderWidth: 1, borderColor: '#000' }}
                />
            </View>
            <Text style={styles.tituloAgendarConsul}>{nomeAdv}</Text>

            {disponibilidadeDia("Segunda", stateHorariosSegunda, diasIndices["Segunda"])}
            {disponibilidadeDia("Terça", stateHorariosTerca, diasIndices["Terça"])}
            {disponibilidadeDia("Quarta", stateHorariosQuarta, diasIndices["Quarta"])}
            {disponibilidadeDia("Quinta", stateHorariosQuinta, diasIndices["Quinta"])}
            {disponibilidadeDia("Sexta", stateHorariosSexta, diasIndices["Sexta"])}
            {disponibilidadeDia("Sábado", stateHorariosSabado, diasIndices["Sábado"])}
            {disponibilidadeDia("Domingo", stateHorariosDomingo, diasIndices["Domingo"])}

            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.containerTelas}>
                    <View style={styles.logoView}>
                        <Image
                            style={styles.logo2}
                            source={require('../../../../assets/aconselhei1.png')}
                        />
                    </View>
                    <View style={{ width: '80%', alignSelf: 'center', }}>
                        <Text style={[styles.navOption, { marginBottom: 10, marginTop: 20, }]}>Envie sua solicitação para receber ajuda!</Text>
                    </View>
                    <ScrollView style={{ marginTop: 20, paddingBottom: 10, width: '100%', alignSelf: 'center', }} showsVerticalScrollIndicator={false}>
                        <TextInput
                            placeholder="Detalhe seu problema..."
                            onChangeText={(text) => setInputText(text)}
                            value={inputText}
                            multiline
                            style={{ borderWidth: 1, borderRadius: 5, padding: 10, width: '80%', marginBottom: 20, marginTop: 20, alignSelf: 'center', }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '115%', alignSelf: 'center', }}>
                            <TouchableOpacity style={[styles.button, { marginBottom: 10, justifyContent: 'center', backgroundColor: '#fff', paddingVertical: 0, paddingHorizontal: 0, borderRadius: 0 }]} onPress={() => { setModalVisible(false) }}>
                                <Text style={[styles.buttonText, { color: '#1E5A97' }]}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { marginBottom: 10 }]} onPress={handleRequest}>
                                <Text style={styles.buttonText}>Enviar</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
}