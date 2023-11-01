import React from 'react';
import { View, TextInput, Text, TouchableWithoutFeedback, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { styles } from '../Styles.js';
import { FontAwesome } from '@expo/vector-icons';
import Calendario from '../ModalDataNasc.js';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { db, auth } from '../firebase.config.js';
import { doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';

export default function CadastroUsu({ navigation }) {

    const schema = yup.object({
        nome: yup.string().required('Informe seu nome'),
        email: yup.string().required('Informe seu e-mail').email('E-mail inválido'),
        senha: yup.string().required('Digite uma senha').min(8, 'Pelo menos 8 caracteres'),
        reSenha: yup.string().required('Confirme a senha digitada').min(8, 'Pelo menos 8 caracteres').oneOf([yup.ref('senha'), null], 'As senhas devem ser iguais')
    })

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const cadastrar = async (data) => {

        const { email, senha, nome } = data;
        //CRIAR UM USUARIO COM O MESMO ID DO AUTHENTICATION (FAZER RELACIONAMENTO)

        createUserWithEmailAndPassword(auth, email, senha, nome)
            .then(() => {
                onAuthStateChanged(auth, async (user) => {
                    // CRIANDO UM DOCUMENTO EM UMA COLEÇÃO

                    const docRef = doc(db, 'usuarios', user.uid)
                    await setDoc(docRef, {
                        nome: nome,
                        foto: null,
                    });
                })
                Alert.alert('Atenção', 'Cadastrado com sucesso!');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'TabRoutesUsu' }]
                })
            })
    }

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
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <FontAwesome name="user" size={25} color="#1E5A97" style={[{ marginRight: 10 }, { marginBottom: errors.nome ? 3.5 : 16 }]} />
                            <Controller
                                control={control}
                                name="nome"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={[
                                            styles.inputLogin, {
                                                borderWidth: errors.nome ? 1.5 : 1,
                                                borderColor: errors.nome ? '#f23535' : '#1E5A97',
                                                marginBottom: errors.nome ? 5 : 16
                                            }]}
                                        placeholder="Nome completo"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                    />
                                )}
                            />
                        </View>
                        {errors.nome && <Text style={styles.inputLoginError}>{errors.nome?.message}</Text>}

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <FontAwesome name="envelope" size={20} color="#1E5A97" style={[{ marginRight: 10 }, { marginBottom: errors.email ? 3.5 : 16 }]} />
                            <Controller
                                control={control}
                                name="email"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={[
                                            styles.inputLogin, {
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
                                            styles.inputLogin, {
                                                borderWidth: errors.senha ? 1.5 : 1,
                                                borderColor: errors.senha ? '#f23535' : '#1E5A97',
                                                marginBottom: errors.senha ? 5 : 16
                                            }]}
                                        placeholder="Senha"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        secureTextEntry={true}
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
                                            styles.inputLogin, {
                                                borderWidth: errors.reSenha ? 1.5 : 1,
                                                borderColor: errors.reSenha ? '#f23535' : '#1E5A97',
                                                marginBottom: errors.reSenha ? 5 : 16
                                            }]}
                                        placeholder="Confirme sua senha"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        secureTextEntry={true}
                                    />
                                )}
                            />
                        </View>
                        {errors.reSenha && <Text style={styles.inputLoginError}>{errors.reSenha?.message}</Text>}
                    </View>

                    <View style={styles.buttonContainer}>
                        <Text style={styles.textLegendaCad}>Data de nascimento:</Text>

                        <View style={styles.inputCad}>
                            <Calendario />
                        </View>

                        <Text style={styles.politica}>
                            Ao clicar no botão "CADASTRAR", você concorda expressa e
                            integralmente com a nossa Política de Privacidade e Política de
                            Cookies. Além de aceitar receber notificações quando necessário.
                        </Text>

                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleSubmit(cadastrar)}>
                            <Text style={styles.loginButtonText}>CADASTRAR</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>


        </TouchableWithoutFeedback>

    );
}