import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableWithoutFeedback, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { styles } from '../Styles.js';
import { FontAwesome } from '@expo/vector-icons';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { db, auth } from '../firebase.config.js';
import { doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';

export default function CadastroAdv({ navigation }) {

    const [diasStyles, setDiasStyles] = useState({
        borderRadius: 18,
        borderColor: '#1E5A97',
        padding: 10,
        backgroundColor: '#E1E1DE',
        width: 320,
        alignSelf: 'center',
    });
    const [boxStyles, setBoxStyles] = useState({
        borderRadius: 18,
        borderColor: '#1E5A97',
        padding: 10,
        backgroundColor: '#E1E1DE',
        width: 320,
        alignSelf: 'center',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [diasErrorMessage, setDiasErrorMessage] = useState('');
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState([]);

    const schema = yup.object().shape({
        nomeadv: yup.string().required('Informe seu nome completo'),
        email: yup.string().required('Informe seu e-mail').email('E-mail inválido'),
        senha: yup.string().required('Digite uma senha').min(8, 'Pelo menos 8 caracteres'),
        reSenha: yup.string().required('Confirme sua senha').min(8, 'Pelo menos 8 caracteres').oneOf([yup.ref('senha'), null], 'As senhas devem ser iguais'),
        ufOab: yup.string().required('Informe a UF da OAB').min(2, 'UF inválida').max(2, 'UF inválida'),
        oab: yup.string().required('Informe o número da OAB').min(6, 'Número inválido').max(6, 'Número inválido'),
        instituicao: yup.string().required('Informe a instituição onde se formou'),
    })

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const cadastrar = async (data) => {

        const { email, senha, nomeadv, ufOab, oab, oabCompleta = ufOab + oab, instituicao, } = data;

        console.log(email, senha, nomeadv, ufOab, oab, oabCompleta, instituicao, categories, selected)
        //CRIAR UM USUARIO COM O MESMO ID DO AUTHENTICATION (FAZER RELACIONAMENTO)

        createUserWithEmailAndPassword(auth, email, senha)
            .then(() => {
                onAuthStateChanged(auth, async (user) => {
                    // CRIANDO UM DOCUMENTO EM UMA COLEÇÃO

                    const docRef = doc(db, 'advogados', user.uid)

                    await setDoc(docRef, {
                        nome: nomeadv,
                        faculdade: instituicao,
                        ufOab: ufOab,
                        oab: oab,
                        categorias: categories,
                        dias: selected,
                        oabCompleta: oabCompleta,
                        foto: null,
                    }).then(() => {
                        Alert.alert('Atenção', 'Cadastro realizado com sucesso!');
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'TabRoutesAdv' }]
                        });
                    }).catch((err) => console.log(err));
                })
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('Atenção', 'Este e-mail já está em uso');
                } else {
                    console.log(error.message);
                }
            });
    };

    const areas = [
        { key: 'Direito Ambiental', value: 'Direito Ambiental' },
        { key: 'Direito Civil', value: 'Direito Civil' },
        { key: 'Direito do Consumidor', value: 'Direito do Consumidor' },
        { key: 'Direito Contratual', value: 'Direito Contratual' },
        { key: 'Direito Desportivo', value: 'Direito Desportivo' },
        { key: 'Direito Digital', value: 'Direito Digital' },
        { key: 'Direito Eleitoral', value: 'Direito Eleitoral' },
        { key: 'Direito Empresarial', value: 'Direito Empresarial' },
        { key: 'Direito da Família', value: 'Direito da Família' },
        { key: 'Direitos Humanos', value: 'Direitos Humanos' },
        { key: 'Direito Imobiliário', value: 'Direito Imobiliário' },
        { key: 'Direito Penal', value: 'Direito Penal' },
        { key: 'Direito da Propriedade Intelectual', value: 'Direito da Propriedade Intelectual' },
        { key: 'Defensoria Pública', value: 'Defensoria Pública' },
        { key: 'Direito Trabalhista', value: 'Direito Trabalhista' },
        { key: 'Direito Tributário', value: 'Direito Tributário' },
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

                        <Text style={[styles.text2, { marginTop: 0 }]}>INFORMAÇÕES BÁSICAS</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <FontAwesome name="user" size={25} color="#1E5A97" style={[{ marginRight: 10 }, { marginBottom: errors.nomeadv ? 3.5 : 16 }]} />
                            <Controller
                                control={control}
                                name="nomeadv"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={[
                                            styles.inputList2, {
                                                borderWidth: errors.nomeadv ? 1.5 : 1,
                                                borderColor: errors.nomeadv ? '#f23535' : '#1E5A97',
                                                marginBottom: errors.nomeadv ? 5 : 16
                                            }]}
                                        placeholder="Nome completo"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                    />
                                )}
                            />
                        </View>
                        {errors.nomeadv && <Text style={styles.inputLoginError}>{errors.nomeadv?.message}</Text>}

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <FontAwesome name="envelope" size={20} color="#1E5A97" style={[{ marginRight: 10 }, { marginBottom: errors.email ? 3.5 : 16 }]} />
                            <Controller
                                control={control}
                                name="email"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={[
                                            styles.inputList2, {
                                                borderWidth: errors.email ? 1.5 : 1,
                                                borderColor: errors.email ? '#f23535' : '#1E5A97',
                                                marginBottom: errors.email ? 5 : 16
                                            }]}
                                        placeholder="Digite seu melhor e-mail"
                                        keyboardType='email-address'
                                        autoCapitalize='none'
                                        autoComplete='email'
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                    />
                                )}
                            />
                        </View>
                        {errors.email && <Text style={styles.inputLoginError}>{errors.email?.message}</Text>}

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <FontAwesome name="lock" size={25} color="#1E5A97" style={[{ marginRight: 10 }, { marginBottom: errors.senha ? 2 : 16 }]} />
                            <Controller
                                control={control}
                                name="senha"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={[
                                            styles.inputList2, {
                                                borderWidth: errors.senha ? 1.5 : 1,
                                                borderColor: errors.senha ? '#f23535' : '#1E5A97',
                                                marginBottom: errors.senha ? 5 : 16
                                            }]}
                                        placeholder="Senha"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        secureTextEntry
                                    />
                                )}
                            />
                        </View>
                        {errors.senha && <Text style={styles.inputLoginError}>{errors.senha?.message}</Text>}

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <FontAwesome name="lock" size={25} color="#1E5A97" style={[{ marginRight: 10 }, { marginBottom: errors.reSenha ? 2 : 16 }]} />
                            <Controller
                                control={control}
                                name="reSenha"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={[
                                            styles.inputList2, {
                                                borderWidth: errors.reSenha ? 1.5 : 1,
                                                borderColor: errors.reSenha ? '#f23535' : '#1E5A97',
                                                marginBottom: errors.reSenha ? 5 : 16
                                            }]}
                                        placeholder="Confirme sua senha"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        secureTextEntry
                                    />
                                )}
                            />
                        </View>
                        {errors.reSenha && <Text style={styles.inputLoginError}>{errors.reSenha?.message}</Text>}

                        <Text style={styles.text2}>INFORMAÇÕES ESPECÍFICAS</Text>

                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
                            <Controller
                                control={control}
                                name="ufOab"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={[
                                            styles.inputList, {
                                                width: '25%',
                                                marginLeft: '2.5%',
                                                borderWidth: errors.ufOab ? 1.5 : 1,
                                                borderColor: errors.ufOab ? '#f23535' : '#1E5A97',
                                            }]}
                                        placeholder="UF: XX"
                                        value={value}
                                        onChangeText={(text) => onChange(text.toUpperCase())}
                                        onBlur={onBlur}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="oab"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={[
                                            styles.inputList, {
                                                width: '65%',
                                                marginRight: '2.5%',
                                                borderWidth: errors.oab ? 1.5 : 1,
                                                borderColor: errors.oab ? '#f23535' : '#1E5A97'
                                            }]}
                                        placeholder="Número da OAB"
                                        keyboardType='numeric'
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                    />
                                )}
                            />
                        </View>
                        {errors.ufOab || errors.oab ? <Text style={[styles.inputLoginError, { marginLeft: '9%', marginTop: '-1%' }]}>{errors.ufOab?.message || errors.oab.message}</Text> : null}

                        <Controller
                            control={control}
                            name="instituicao"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={[
                                        styles.inputList, {
                                            borderWidth: errors.instituicao ? 1.5 : 1,
                                            borderColor: errors.instituicao ? '#f23535' : '#1E5A97',
                                            marginBottom: errors.instituicao ? 5 : 16
                                        }]}
                                    placeholder="Instituição onde se formou"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                />
                            )}
                        />
                        {errors.instituicao && <Text style={[styles.inputLoginError, { marginLeft: '9%', marginTop: '-1%' }]}>{errors.instituicao?.message}</Text>}

                        <View style={styles.viewList}>
                            <MultipleSelectList
                                setSelected={setCategories}
                                data={areas}
                                placeholder="Áreas de atuação"
                                label="Áreas de atuação"
                                notFoundText="Área não encontrada"
                                searchPlaceholder="Pesquisar"
                                labelStyles={{ color: '#1E5A97' }}
                                badgeStyles={{ backgroundColor: '#1E5A97' }}
                                boxStyles={boxStyles}
                            />
                            {errorMessage !== '' && <Text style={[styles.inputLoginError, { marginLeft: '1%', marginTop: '-1%' }]}>{errorMessage}</Text>}

                            <MultipleSelectList
                                setSelected={setSelected}
                                data={diaSemana}
                                placeholder="Dias disponíveis para consultorias"
                                label="Dias disponíveis para consultorias"
                                notFoundText="Dia não encontrado"
                                searchPlaceholder="Pesquisar"
                                labelStyles={{ color: '#1E5A97' }}
                                badgeStyles={{ backgroundColor: '#1E5A97' }}
                                boxStyles={diasStyles}
                            />
                            {diasErrorMessage !== '' && <Text style={[styles.inputLoginError, { marginLeft: '1%', marginTop: '-1%' }]}>{diasErrorMessage}</Text>}
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>

                        <Text style={[styles.politica, { marginTop: 5 }]}>
                            Ao clicar no botão "CADASTRAR", você expressa e concorda integralmente com a nossa {''}
                            <Text
                                style={{ color: '#1E5A97', textDecorationLine: 'underline' }}
                                onPress={() => navigation.navigate('TermosUso')}
                            >
                                Política de Privacidade e os Termos de Uso
                            </Text>
                            . Além de aceitar receber notificações quando necessário.
                        </Text>

                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={() => {
                                // Verifica se tem pelo menos uma área selecionada
                                if (categories.length === 0) {
                                    setBoxStyles({
                                        borderRadius: 18,
                                        borderColor: 'red',
                                        padding: 10,
                                        backgroundColor: '#E1E1DE',
                                        width: 320,
                                        alignSelf: 'center',
                                    });
                                    setErrorMessage('Defina ao menos uma área de atuação');
                                } else {
                                    setBoxStyles({
                                        borderRadius: 18,
                                        borderColor: '#1E5A97',
                                        padding: 10,
                                        backgroundColor: '#E1E1DE',
                                        width: 320,
                                        alignSelf: 'center',
                                    });
                                    setErrorMessage('');
                                }
                                if (selected.length === 0) {
                                    setDiasStyles({
                                        borderRadius: 18,
                                        borderColor: 'red',
                                        padding: 10,
                                        backgroundColor: '#E1E1DE',
                                        width: 320,
                                        alignSelf: 'center',
                                    });
                                    setDiasErrorMessage('Escolha ao menos um dia da semana');
                                } else {
                                    setDiasStyles({
                                        borderRadius: 18,
                                        borderColor: '#1E5A97',
                                        padding: 10,
                                        backgroundColor: '#E1E1DE',
                                        width: 320,
                                        alignSelf: 'center',
                                    });
                                    setDiasErrorMessage('');
                                }
                                if (categories.length > 0 && selected.length > 0) {
                                    handleSubmit(cadastrar)();
                                }
                            }}
                        >
                            <Text style={styles.loginButtonText}>CADASTRAR</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View >
        </TouchableWithoutFeedback >
    );


}
