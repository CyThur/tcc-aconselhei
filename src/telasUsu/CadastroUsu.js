import React, { useState } from 'react';
import { View, TextInput, Text, TouchableWithoutFeedback, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { styles } from '../Styles.js';
import { FontAwesome } from '@expo/vector-icons';
import Calendario from '../ModalDataNasc.js';

export default function CadastroUsu({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [reSenha, setReSenha] = useState('');
    const [nascimento, setNascimento] = useState('');

    const cadastrar = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'TabRoutesUsu' }]
        })
    }

    function newUser() {
        auth
            .createUserWithEmailAndPassword(nome, email, senha, reSenha)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log('Registered with:', user.email);
            });
        if (nome === '' || email === '' || senha === '' || reSenha === '') {
            alert('Todos os campos devem ser preenchidos');
            return;
        }
        if (senha !== reSenha) {
            alert('A senha e a confirmação estão diferentes');
            return;
        } else {
            createUserWithEmailAndPassword(auth, nome, email, senha).then(
                (UserCredencial) => {
                    const user = UserCredencial.user;
                    alert('Bem vindo(a) ao AconseLhEI,' + nome + '!');
                    setNome('');
                    setEmail('');
                    setSenha('');
                    setReSenha('');
                }
            );
        }
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
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center', }}>
                            <FontAwesome name="user" size={25} color="#1E5A97" style={{ marginRight: 10 }}/>
                            <TextInput
                                style={styles.inputLogin}
                                placeholder="Nome completo"
                                value={nome}
                                onChangeText={setNome}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center', }}>
                            <FontAwesome name="envelope" size={20} color="#1E5A97" style={{ marginRight: 10 }}/>
                            <TextInput
                                placeholder="Digite seu melhor e-mail"
                                keyboardType='email-address'
                                autoCapitalize='none'
                                autoComplete='email'
                                value={email}
                                onChangeText={value => setEmail(value)}
                                style={styles.inputLogin}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center', }}>
                            <FontAwesome name="lock" size={25} color="#1E5A97" style={{ marginRight: 10 }}/>
                            <TextInput
                                placeholder="Senha"
                                value={senha}
                                onChangeText={value => setSenha(value)}
                                style={styles.inputLogin}
                                secureTextEntry
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center', }}>
                            <FontAwesome name="lock" size={25} color="#1E5A97" style={{ marginRight: 10 }}/>
                            <TextInput
                                placeholder="Confirme sua senha"
                                value={reSenha}
                                onChangeText={value => setReSenha(value)}
                                style={styles.inputLogin}
                                secureTextEntry
                            />
                        </View>
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
                            onPress={cadastrar}>
                            <Text style={styles.loginButtonText}>CADASTRAR</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>


        </TouchableWithoutFeedback>

    );
}
