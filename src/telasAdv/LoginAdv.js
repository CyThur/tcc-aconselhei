import React, { useState } from 'react';
import { View, TextInput, Text, TouchableWithoutFeedback, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {useForm, Controller} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { styles } from '../Styles.js';

export default function LoginAdv({ navigation }) {
  const logar = (data) => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'TabRoutesAdv' }]
    })
    console.log(data); //pra ver como os dados estão sendo enviados
  }

  const schema = yup.object({
    email: yup.string().required('Informe seu e-mail').email('E-mail inválido'),
    senha: yup.string().required('Digite uma senha').min(8, 'Pelo menos 8 caracteres')
  })

  const {control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

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
        <ScrollView style={{ paddingTop: 35, width: '90%' }} showsVerticalScrollIndicator={false}>
          <View style={styles.inputContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center', }}>
              <FontAwesome name="envelope" size={20} color="#1E5A97" style={[{ marginRight: 10 }, { marginBottom: errors.email ? 3.5 : 16 }]}/>
              <Controller
                control={control}
                name="email"
                render={({ field: {onChange, onBlur, value}}) => (
                  <TextInput
                  style={[
                    styles.inputLogin, {
                      borderWidth: errors.email ? 1.5 : 1,
                      borderColor: errors.email ? '#f23535' : '#1E5A97',
                      marginBottom: errors.email ? 5 : 16
                    }]}
                  placeholder="E-mail"
                  keyboardType='email-address'
                  autoCapitalize='none'
                  autoComplete='email'
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur} //quando o textinput é tocado
                  />
                )}
              />
            </View>
            {errors.email && <Text style={styles.inputLoginError}>{errors.email?.message}</Text>}

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center', }}>
              <FontAwesome name="lock" size={25} color="#1E5A97" style={[{ marginRight: 10 }, { marginBottom: errors.email ? 3.5 : 16 }]}/>
              <Controller
                control={control}
                name="senha"
                render={({ field: {onChange, onBlur, value}}) => (
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
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSubmit(logar)} style={styles.button}>
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