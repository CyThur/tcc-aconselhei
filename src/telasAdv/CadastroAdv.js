import React, { useState } from 'react';
import { View, TextInput, Text, TouchableWithoutFeedback, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { styles } from '../Styles.js';
import { FontAwesome } from '@expo/vector-icons';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import {useForm, Controller, set} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export default function CadastroAdv({ navigation }) {

    const cadastrar = (data) => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'TabRoutesAdv' }]
        })
        console.log(data, selected, categories); //pra ver como os dados estão sendo enviados
    }

    const schema = yup.object({
        nomeadv: yup.string().required('Informe seu nome completo'),
        email: yup.string().required('Informe seu e-mail').email('E-mail inválido'),
        senha: yup.string().required('Digite uma senha').min(8, 'Pelo menos 8 caracteres'),
        reSenha: yup.string().required('Confirme sua senha').min(8, 'Pelo menos 8 caracteres').oneOf([yup.ref('senha'), null], 'As senhas devem ser iguais'),
        ufOab: yup.string().required('Informe a UF da OAB').min(2, 'UF inválida').max(2, 'UF inválida'),
        oab: yup.string().required('Informe o número da OAB').min(6, 'Número inválido').max(6, 'Número inválido'),
        paisFormacao: yup.string().required('Informe o país de formação'),
        instituicao: yup.string().required('Informe a instituição onde se formou'),
    })
    
    const {control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

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
                            <FontAwesome name="user" size={25} color="#1E5A97" style={[{ marginRight: 10 }, { marginBottom: errors.nomeadv ? 3.5 : 16 }]} />
                            <Controller
                                control={control}
                                name="nomeadv"
                                render={({ field: {onChange, onBlur, value}}) => (
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
                                        onBlur={onBlur} //quando o textinput é tocado
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
                                render={({ field: {onChange, onBlur, value}}) => (
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
                                render={({ field: {onChange, onBlur, value}}) => (
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
                                render={({ field: {onChange, onBlur, value}}) => (
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

                        <View style={{flexDirection: 'row', width: '100%', justifyContent:'space-around'}}>
                            <Controller
                                control={control}
                                name="ufOab"
                                render={({ field: {onChange, onBlur, value}}) => ( 
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
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                    />
                                )}
                            />                

                            <Controller
                                control={control}
                                name="oab"
                                render={({ field: {onChange, onBlur, value}}) => ( 
                                    <TextInput
                                    style={[
                                        styles.inputList, {
                                            width: '65%',
                                            marginRight: '2.5%',
                                            borderWidth: errors.oab ? 1.5 : 1,
                                            borderColor: errors.oab ? '#f23535' : '#1E5A97'
                                        }]}
                                        placeholder="Número da OAB"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                    />
                                )}
                            />
                        </View>
                        {errors.ufOab || errors.oab  ? <Text style={[styles.inputLoginError, {marginLeft:'8%', marginTop:'-4%'}]}>{errors.ufOab?.message || errors.oab.message}</Text> : null}

                        <Controller
                            control={control}
                            name="paisFormacao"
                            render={({ field: {onChange, onBlur, value}}) => (
                                <TextInput
                                style={[
                                    styles.inputList, {
                                      borderWidth: errors.paisFormacao ? 1.5 : 1,
                                      borderColor: errors.paisFormacao ? '#f23535' : '#1E5A97',
                                      marginBottom: errors.paisFormacao ? 5 : 16
                                    }]}
                                    placeholder="País de Formação"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                />
                            )}
                        />
                        {errors.paisFormacao && <Text style={[styles.inputLoginError, {marginLeft:'9%'}]}>{errors.paisFormacao?.message}</Text>}

                        <Controller
                            control={control}
                            name="instituicao"
                            render={({ field: {onChange, onBlur, value}}) => (
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
                        {errors.instituicao && <Text style={[styles.inputLoginError, {marginLeft:'9%'}]}>{errors.instituicao?.message}</Text>}

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
                            {categories !== '' ? null : <Text style={[styles.inputLoginError, {marginLeft:'1%', marginTop:'-5%'}]}>Qual a sua área de atuação?</Text>} 
                            

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
                            {selected !== '' ? null : <Text style={[styles.inputLoginError, {marginLeft:'1%', marginTop:'-5%'}]}>Escolha dias de disponibilidade?</Text>}

                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={handleSubmit(cadastrar)}
                            style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>CADASTRAR</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}