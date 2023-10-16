import React, { useState } from 'react';
import { View, TextInput, Text, TouchableWithoutFeedback, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { styles } from '../Styles.js';
import { FontAwesome } from '@expo/vector-icons';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import {useForm, Controller} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export default function CadastroAdv({ navigation }) {

    const cadastrar = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'TabRoutesAdv' }]
        })
    }

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [reSenha, setReSenha] = useState('');

    const [oab, setOab] = useState('');
    const [paisFormacao, setPaisFormacao] = useState('');
    const [institu, setInstitu] = useState('');

    const [selected, setSelected] = React.useState('');
    const [categories, setCategories] = React.useState([]);

    const areas = [
        { key: 'Aposentadoria', value: 'Aposentadoria' },
        { key: 'Assédio', value: 'Assédio' },
        { key: 'Direitos autorais', value: 'Direitos autorais' },
        { key: 'Direitos humanos', value: 'Direitos humanos' },
        { key: 'Direitos trabalhistas', value: 'Direitos trabalhistas' },
        { key: 'Divórcio', value: 'Divórcio' },
        { key: 'INSS', value: 'INSS' },
        { key: 'Medida potetiva', value: 'Medida potetiva' },
        { key: 'Pensão alimentícia', value: 'Pensão alimentícia' },
    ];

    const diaSemana = [
        { key: 'Segunda', value: 'Segunda' },
        { key: 'Terça', value: 'Terça' },
        { key: 'Quarta', value: 'Quarta' },
        { key: 'Quinta', value: 'Quinta' },
        { key: 'Sexta', value: 'Sexta' },
        { key: 'Sábado', value: 'Sábado' },
        { key: 'Domingo', value: 'Domingo' },
    ];

    return (
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                <View style={styles.logoView}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/aconselhei1.png')}
                    />
                </View>

                <ScrollView style={{ paddingTop: 20, width: '90%' }} showsVerticalScrollIndicator={false}>
                    <View style={styles.inputContainer}>

                        <Text style={styles.text2}>INFORMAÇÕES BÁSICAS</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <FontAwesome name="user" size={25} color="#1E5A97" style={{ marginRight: 10 }} />
                            <TextInput
                                style={styles.inputList2}
                                placeholder="Nome completo"
                                value={nome}
                                onChangeText={setNome}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <FontAwesome name="envelope" size={20} color="#1E5A97" style={{ marginRight: 10 }} />
                            <TextInput
                                placeholder="Digite seu melhor e-mail"
                                keyboardType='email-address'
                                autoCapitalize='none'
                                autoComplete='email'
                                value={email}
                                onChangeText={value => setEmail(value)}
                                style={styles.inputList2}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <FontAwesome name="lock" size={25} color="#1E5A97" style={{ marginRight: 10 }} />
                            <TextInput
                                placeholder="Senha"
                                value={senha}
                                onChangeText={value => setSenha(value)}
                                style={styles.inputList2}
                                secureTextEntry
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <FontAwesome name="lock" size={25} color="#1E5A97" style={{ marginRight: 10 }} />
                            <TextInput
                                placeholder="Confirme sua senha"
                                value={reSenha}
                                onChangeText={value => setReSenha(value)}
                                style={styles.inputList2}
                                secureTextEntry
                            />
                        </View>
                        <Text style={styles.text2}>INFORMAÇÕES ESPECÍFICAS</Text>
                        <TextInput
                            style={styles.inputList}
                            placeholder="Número da OAB"
                            value={oab}
                            onChangeText={setOab}
                        />
                        <TextInput
                            style={styles.inputList}
                            placeholder="País de Formação"
                            value={paisFormacao}
                            onChangeText={setPaisFormacao}
                        />
                        <TextInput
                            style={styles.inputList}
                            placeholder="Instituição onde se formou"
                            value={institu}
                            onChangeText={setInstitu}
                        />

                        <View style={styles.viewList}>
                            <MultipleSelectList
                                setSelected={(val) => setCategories(val)}
                                data={areas}
                                save="value"
                                placeholder="Áreas de atuação"
                                label="Áreas de atuação"
                                notFoundText="Área não encontrada"
                                searchPlaceholder="Pesquisar"
                                labelStyles={{ color: '#1E5A97' }}
                                badgeStyles={{ backgroundColor: '#1E5A97' }}
                                boxStyles={{
                                    borderRadius: 18,
                                    borderColor: '#1E5A97',
                                    padding: 10,
                                    backgroundColor: '#E1E1DE',
                                    width: 320,
                                    alignSelf: 'center',
                                }}
                            />

                            <MultipleSelectList
                                setSelected={setSelected}
                                data={diaSemana}
                                placeholder="Dias disponíveis para consultorias"
                                label="Dias disponíveis para consultorias"
                                notFoundText="Dia não encontrado"
                                searchPlaceholder="Pesquisar"
                                labelStyles={{ color: '#1E5A97' }}
                                badgeStyles={{ backgroundColor: '#1E5A97' }}
                                boxStyles={{
                                    marginTop: 9,
                                    marginBottom: 20,
                                    borderRadius: 18,
                                    borderColor: '#1E5A97',
                                    padding: 10,
                                    backgroundColor: '#E1E1DE',
                                    width: 320,
                                    alignSelf: 'center',
                                }}
                            />
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={cadastrar}
                            style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>CADASTRAR</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}