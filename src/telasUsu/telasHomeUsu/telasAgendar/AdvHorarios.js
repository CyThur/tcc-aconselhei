import React, { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../../Styles';
import { db } from '../../../firebase.config.js';

export default function AdvHorarios({ navigation, route }) {
    const [stateHorariosSegunda, setStateHorariosSegunda] = useState([]);
    const [stateHorariosTerca, setStateHorariosTerca] = useState([]);
    const [stateHorariosQuarta, setStateHorariosQuarta] = useState([]);
    const [stateHorariosQuinta, setStateHorariosQuinta] = useState([]);
    const [stateHorariosSexta, setStateHorariosSexta] = useState([]);
    const [stateHorariosSabado, setStateHorariosSabado] = useState([]);
    const [dias, setDias] = useState([]);
    const { id, nome, speciality } = route.params;

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
                setStateHorariosSabado(advogadoDocData.data().horarioSabado);
                // SE PRECISAR TESTAR
                //  console.log(`${dias[0]}: ${stateHorariosSegunda}`)
                //  console.log(`${dias[1]}: ${stateHorariosTerca}`);
                //  console.log(`${dias[2]}: ${stateHorariosQuarta}`);
                //  console.log(`${dias[3]}: ${stateHorariosQuinta}`);
                //  console.log(`${dias[4]}: ${stateHorariosSexta}`);
                //  console.log(`${dias[5]}: ${stateHorariosSabado}`);
            }
        }
        fetchHorarios();
    }, []);

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
                            onPress={() => navigation.navigate('EscreverDuvida', { id: id, nome, speciality })}
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
                        <Text style={styles.dataAgendarConsul}>{dias && dias[index] ? dias[index].toUpperCase() + "-FEIRA" : "Nenhum dia disponível"}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            {horariosDia && horariosDia.length > 0 ? (
                                <View>
                                    {botaoHorariosDia()}
                                </View>
                            ) : (
                                <Text>Nenhum horário disponível</Text>
                            )}
                        </View>
                    </View>
                )
            }
        }
    };

    return (
        <View style={styles.containerAgendarConsul}>

            <Image
                source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/3364/3364044.png',
                }}
                style={styles.bannerAgendarConsul}
                resizeMode="contain"
            />

            <Text style={styles.tituloAgendarConsul}>{nome}</Text>

            {disponibilidadeDia("Segunda", stateHorariosSegunda, 0)}
            {disponibilidadeDia("Terça", stateHorariosTerca, 1)}
            {disponibilidadeDia("Quarta", stateHorariosQuarta, 2)}
            {disponibilidadeDia("Quinta", stateHorariosQuinta, 3)}
            {disponibilidadeDia("Sexta", stateHorariosSexta, 4)}
            {disponibilidadeDia("Sábado", stateHorariosSabado, 5)}
        </View>
    );
}