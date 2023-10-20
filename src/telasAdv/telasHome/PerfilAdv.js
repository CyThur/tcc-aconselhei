import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { styles } from '../../Styles';

const PefilAdv = () => {

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSaveData = () => {
    // Implemente a lógica para salvar todos os dados aqui
    // Pode ser uma chamada à API ou outra lógica de armazenamento de dados
    Alert.alert('Dados salvos com sucesso!');
  };

  return (
    <View style={styles.containerPerfilAdv}>

      <View style={{ margin: 20, marginTop: 150 }}>
        <View style={{ alignItems: 'center', }}>
          <TouchableOpacity onPress={toggleModal}>
            <View style={{ height: 120, width: 120, borderRadius: 60, justifyContent: 'center', alignItems: 'center' }}>
              <ImageBackground
                source={{
                  uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0c3c390a53af14d8ca2843178f74ac3a',
                }}
                style={{ height: 120, width: 120, }}
                imageStyle={{ borderRadius: 60, borderWidth:1, borderColor: '#000' }}
              >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="camera" size={35} color="#fff" style={{ opacity: 0.7, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#fff', borderRadius: 10 }} />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={styles.profileTextPerfilAdv}>Perfil</Text>
        </View>
        <ScrollView  showsVerticalScrollIndicator={false}>
          <View style={styles.action}>
            <FontAwesome name="user-o" size={20} />
            <TextInput
              placeholder="Nome completo"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={styles.textInputPerfil}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="envelope-o" size={20} />
            <TextInput
              placeholder="E-mail"
              keyboardType="email-address"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={styles.textInputPerfil}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="phone" size={20} />
            <TextInput
              placeholder="Telefone"
              keyboardType='number-pad'
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={styles.textInputPerfil}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="balance-scale" size={20} />
            <TextInput
              placeholder="UF/ OAB"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={styles.textInputPerfil}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="university" size={20} />
            <TextInput
              placeholder="Instituição onde se formou"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={styles.textInputPerfil}
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={handleSaveData}>
              <Text style={styles.loginButtonText}>SALVAR</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <Modal isVisible={isModalVisible} style={styles.modalPerfil} backdropOpacity={0.3} backdropColor="transparent" onBackdropPress={toggleModal}>
        <View style={styles.modalContentPerfil}>
          <View style={styles.modalHeader} />
          <Text style={styles.panelTitle}>Carregar foto</Text>
          <Text style={styles.panelSubtitle}>Escolha sua Imagem de perfil</Text>
          <TouchableOpacity style={styles.panelButton}>
            <Text style={styles.panelButtonTitle}>Tire uma foto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.panelButton}>
            <Text style={styles.panelButtonTitle}>Importar foto da biblioteca</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.panelButton} onPress={toggleModal}>
            <Text style={styles.panelButtonTitle}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default PefilAdv;