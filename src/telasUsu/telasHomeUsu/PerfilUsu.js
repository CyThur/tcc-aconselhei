import React, { useState } from 'react';
import {View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert,} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from '../../Styles';

function EditableName({ name, onNameChange }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleNameChange = () => {
    if (isEditing) {
      onNameChange(name);
    }
    setIsEditing(!isEditing);
  };

  return (
    <View style={styles.editableNameContainer}>
      <Text style={styles.label}></Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={onNameChange}
          onBlur={handleNameChange}
        />
      ) : (
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          <TouchableOpacity onPress={handleNameChange}>
            <FontAwesome name="edit" size={20} color="#1E5A97" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default function PerfilUsu({navigation}) {
  const [name, setName] = useState('Seu nome');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handlePasswordChange = () => {
    if (isChangingPassword) {
      if (newPassword === confirmPassword) {
        Alert.alert('Senha salva com sucesso!');
        setIsChangingPassword(false);
      } else {
        Alert.alert('A senha e a confirmação não coincidem');
      }
    } else {
      setIsChangingPassword(true);
    }
  };

  const handleSaveData = () => {
    Alert.alert('Dados salvos com sucesso!');
    // Adicione a lógica real para salvar os dados aqui, como uma chamada à API.
  };

  return (
    <ScrollView style={{ paddingTop: 20 }} showsVerticalScrollIndicator={false}>
      <View style={styles.containerPerfilUsu}>
      
        <Image
          source={{
            uri: 'https://i.pinimg.com/1200x/5a/e2/25/5ae225b4ebc9e80004734ca4ca93a783.jpg',
          }}
          style={styles.perfilImage}
        />
        <Text style={styles.profileText}>Perfil</Text>

        <EditableName name={name} onNameChange={setName} />

        <View>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Digite seu email"
          />
        </View>

        <View>
          <Text style={styles.label}>Telefone:</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={(text) => setPhone(text)}
            placeholder="Digite seu telefone"
          />
        </View>

        <TouchableOpacity
          style={styles.smallButton}
          onPress={handlePasswordChange}>
          <Text style={styles.buttonText}>
            {isChangingPassword ? 'Salvar Alterações' : 'Alterar Senha'}
          </Text>
        </TouchableOpacity>

        {isChangingPassword ? (
          <View>
            <Text style={styles.label}>Nova Senha:</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              secureTextEntry={true}
              placeholder="Digite sua nova senha"
            />
            <Text style={styles.label}>Confirmar Senha:</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={true}
              placeholder="Confirme sua nova senha"
            />
          </View>
        ) : null}

        <TouchableOpacity style={styles.buttonPerfilUsu} onPress={handleSaveData}>
          <Text style={styles.buttonText}>SALVAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}