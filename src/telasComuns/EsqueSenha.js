import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../Styles.js';

export default function EsqueSenha({navigation}) {
    const [numero, setNumero] = useState('');
    const [codigoConfirm, setcodigoConfirm] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Número do celular"
                value={numero}
                onChangeText={setNumero}
                style={styles.input}
            />
            <TextInput
                placeholder="Código de confirmação"
                value={codigoConfirm}
                onChangeText={setcodigoConfirm}
                style={styles.input}
            />

            <TouchableOpacity
                onPress={() => navigation.navigate('Inicio')}
                style={styles.button}>
                <Text style={styles.loginButtonText}>CONFIRMAR</Text>
            </TouchableOpacity>
        </View>
    );
}