import React, { useState } from 'react';
import { View, TextInput, Text, TouchableWithoutFeedback, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from '../Styles.js';

export default function LoginAdv({ navigation }) {
  const [email, setEmail] = useState(null);
  const [senha, setSenha] = useState(null);

  const logar = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'TabRoutesAdv' }]
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoView}>
        <Image
          style={styles.logoLogin}
          source={require('../../assets/aconselhei1.png')}
        />
      </View>
      <Text style={styles.text4}>ADVOGADO</Text>
      <TouchableWithoutFeedback>
        <ScrollView style={{ paddingTop: 20, width: '90%' }} showsVerticalScrollIndicator={false}>
          <View style={styles.inputContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center', }}>
              <FontAwesome name="envelope" size={20} color="#1E5A97" style={{ marginRight: 10 }}/>
              <TextInput
                placeholder="E-mail"
                keyboardType='email-address'
                autoCapitalize='none'
                autoComplete='email'
                value={email}
                onChangeText={value => setEmail(value)}
                style={styles.inputLogin}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center', }}>
              <FontAwesome name="lock" size={25} color="#1E5A97" style={{ marginRight: 10,  }}/>
              <TextInput
                placeholder="Senha"
                value={senha}
                onChangeText={value => setSenha(value)}
                style={styles.inputLogin}
                secureTextEntry
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={logar} style={styles.button}>
              <Text style={styles.loginButtonText}>ENTRAR</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLine}>AINDA NÃO POSSUI UMA CONTA</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CadastroAdv')}
              style={styles.button}>
              <Text style={styles.loginButtonText}>CADASTRAR</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Text style={styles.text3}>Esqueceu sua senha?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('EsqueSenha')}>
              <Text style={styles.linkText}>Clique aqui</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>

  );
}