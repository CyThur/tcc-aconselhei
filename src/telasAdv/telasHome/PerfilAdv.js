import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importe o ícone de edição
import { styles } from '../../Styles';

// Componente para exibir o nome editável
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

export default function App() {
  const [name, setName] = useState('Seu nome');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handlePasswordChange = () => {
    if (isChangingPassword) {
      if (newPassword === confirmPassword) {
        // Simulação de salvamento da senha (em um ambiente de desenvolvimento local)
        // Aqui você pode substituir esta parte por uma chamada real à API ou lógica de salvamento de senha
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
    // Implemente a lógica para salvar todos os dados aqui
    // Pode ser uma chamada à API ou outra lógica de armazenamento de dados
    Alert.alert('Dados salvos com sucesso!');
  };

  return (
    <View style={styles.containerPerfilAdv}>
      <ScrollView style={{ backgroundColor: 'react-spring-scroll-snap' }}>
        <Image
          source={{
            uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0c3c390a53af14d8ca2843178f74ac3a',
          }}
          style={styles.perfilImagePerfilAdv}
        />
        <Text style={styles.profileTextPerfilAdv}>Perfil</Text>

        <EditableName name={name} onNameChange={setName} />

        <View>
          <Text style={styles.labelPerfilAdv}>Email:</Text>
          <TextInput
            style={styles.inputPerfilAdv}
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Digite seu email"
          />
        </View>

        <View>
          <Text style={styles.labelPerfilAdv}>Telefone:</Text>
          <TextInput
            style={styles.inputPerfilAdv}
            value={phone}
            onChangeText={(text) => setPhone(text)}
            placeholder="Digite seu telefone"
          />
        </View>

        <Text style={styles.profileText2PerfilAdv}>Advogado(a)</Text>

        <View>
          <Text style={styles.labelPerfilAdv}>Número da OAB:</Text>
          <TextInput style={styles.inputPerfilAdv} placeholder="XXXXXX-OAB/UF" />
        </View>

        <View>
          <Text style={styles.labelPerfilAdv}>País de formação:</Text>
          <TextInput
            style={styles.inputPerfilAdv}
            value={phone}
            onChangeText={(text) => setPhone(text)}
            placeholder="País em que se formou"
          />
        </View>

        <View>
          <Text style={styles.labelPerfilAdv}>Instituição de formação:</Text>
          <TextInput
            style={styles.inputPerfilAdv}
            value={phone}
            onChangeText={(text) => setPhone(text)}
            placeholder="Instituição em que se formou"
          />
        </View>

        <View>
          <Text style={styles.labelPerfilAdv}>Área de atuação:</Text>
          <Text style={{ marginBottom: 30 }}>Arrumar</Text>
        </View>

        <View>
          <Text style={styles.labelPerfilAdv}>Dias disponíveis para consultoria:</Text>
          <Text style={{ marginBottom: 30 }}>Arrumar</Text>
        </View>

        <View>
          <Text style={styles.labelPerfilAdv}>
            Horários disponíveis para consultoria:
          </Text>
          <Text style={{ marginBottom: 30 }}>Arrumar</Text>
        </View>

        <TouchableOpacity
          style={styles.smallButtonPerfilAdv}
          onPress={handlePasswordChange}>
          <Text style={styles.buttonTextPerfilAdv}>
            {isChangingPassword ? 'Salvar Alterações' : 'Alterar Senha'}
          </Text>
        </TouchableOpacity>

        {isChangingPassword ? (
          <View>
            <Text style={styles.labelPerfilAdv}>Nova Senha:</Text>
            <TextInput
              style={styles.inputPerfilAdv}
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              secureTextEntry={true}
              placeholder="Digite sua nova senha"
            />
            <Text style={styles.labelPerfilAdv}>Confirmar Senha:</Text>
            <TextInput
              style={styles.inputPerfilAdv}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={true}
              placeholder="Confirme sua nova senha"
            />
          </View>
        ) : null}

        <TouchableOpacity style={styles.buttonPerfilAdv} onPress={handleSaveData}>
          <Text style={styles.buttonTextPerfilAdv}>SALVAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}