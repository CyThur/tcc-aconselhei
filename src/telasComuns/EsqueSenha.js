import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../Styles.js';

export default function EsqueSenha({ navigation }) {
    const [email, setEmail] = useState('');

    const recuperarSenha = async () => {
        const auth = getAuth();

        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Sucesso', 'Verifique seu e-mail para redefinir sua senha.');
        } catch (error) {
            Alert.alert('Erro', 'digite um e-mail válido.');
        }
    };

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
                        onPress={() => navigation.navigate('Inicio')} />
                    <Image
                        style={styles.logo2}
                        source={require('../../assets/aconselhei1.png')}
                    />
                </View>
            </View>
            <Text style={[styles.text4, {marginBottom: '65%'}]}>REDEFINIÇÃO DE SENHA</Text>
            <TextInput
                style={styles.inputLogin}
                onChangeText={setEmail}
                value={email}
                placeholder="Digite seu e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TouchableOpacity
                onPress={recuperarSenha}
                style={styles.button}>
                <Text style={styles.loginButtonText}>CONFIRMAR</Text>
            </TouchableOpacity>
        </View>
    );
}