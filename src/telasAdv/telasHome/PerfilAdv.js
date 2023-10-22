import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, ImageBackground, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import ButtonP from './BtnImgPicker';
import ImageViewer from './ImgPickerViewer';
// import CameraImgPicker from './CameraImgPicker';
import { styles } from '../../Styles';
import { stylesP } from './StylesPerfil';
import { auth, db, uploadToFirebase } from '../../firebase.config';
// import { collection, doc, query, getDoc, where } from 'firebase/firestore'


const PefilAdv = () => {
  // const colRef = collection(db, 'advogados');
  // const q = query(colRef, where('foto', 'null'));

  // const [list, setList] = useState([]);

  // async function pegarDadosAdvs(user) {

  //   const docRef = doc(db, 'advogados', user.uid)
  //   await getDoc(docRef, {
  //     nome: nomeadv,
  //     faculdade: instituicao,
  //     ufOab: ufOab,
  //     oab: oab,
  //     categorias: categories,
  //     dias: selected,
  // })

  //   const snapshot = await getDoc(docRef)

  //   if (snapshot.exists()) {
  //     console.log('Documentos encontrados:', snapshot.data());
  //   }
  //   else {
  //     Alert.alert('Atenção', 'Você não é advogado.');
  //   }
  // }

  // useEffect(() => {
  //   pegarDadosAdvs()
  // }, [])

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSaveData = () => {
    // Implemente a lógica para salvar todos os dados aqui
    // Pode ser uma chamada à API ou outra lógica de armazenamento de dados
    Alert.alert('Dados salvos com sucesso!');
  };

  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  const tirarFoto = async () => {
    try {
      const cameraResp = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 4],
        quality: 1,
        allowsMultipleSelection: false,
      })
      if (!cameraResp.canceled) {
        console.log(cameraResp.assets[0].uri);

        const { uri, fileName } = cameraResp.assets[0];
        const uploadResp = await uploadToFirebase(uri, fileName, (v) =>
          console.log(v)
        );
        console.log(uploadResp);
      }
    } catch (e) {
      Alert.alert('Erro', 'A imagem não foi carregada. ' + e.message);
    }
  };

  if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    Alert.alert(
      'Atenção',
      'Você precisa permitir o acesso à câmera para usar essa função.',
      [{ text: 'Permitir', onPress: () => requestPermission() }],);
  }

  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      Alert.alert('Atenção', 'Você não tirou nenhuma foto.');
    }
  };

  const PlaceholderImage = require('../../../assets/userSemFoto.png');

  return (
    <View style={stylesP.containerPerfilAdv}>

      <View style={{ margin: 20, marginTop: 150 }}>
        <View style={{ alignItems: 'center', }}>
          <TouchableOpacity onPress={toggleModal}>
            <View style={{ height: 120, width: 120, borderRadius: 60, justifyContent: 'center', alignItems: 'center' }}>
              <ImageViewer
                placeholderImageSource={PlaceholderImage}
                selectedImage={selectedImage}
                style={{ height: 120, width: 120, }}
                imageStyle={{ borderRadius: 60, borderWidth: 1, borderColor: '#000' }}
              >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="camera" size={35} color="#fff" style={{ opacity: 0.7, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#fff', borderRadius: 10 }} />
                </View>
              </ImageViewer>
            </View>
          </TouchableOpacity>
          <Text style={stylesP.profileTextPerfilAdv}>Perfil</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={stylesP.action}>
            <FontAwesome name="user-o" size={20} />
            <TextInput
              placeholder="Nome completo"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={stylesP.textInputPerfil}
            />
          </View>
          <View style={stylesP.action}>
            <FontAwesome name="envelope-o" size={20} />
            <TextInput
              placeholder="E-mail"
              keyboardType="email-address"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={stylesP.textInputPerfil}
            />
          </View>
          <View style={stylesP.action}>
            <FontAwesome name="phone" size={20} />
            <TextInput
              placeholder="Telefone"
              keyboardType='number-pad'
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={stylesP.textInputPerfil}
            />
          </View>
          <View style={stylesP.action}>
            <FontAwesome name="balance-scale" size={20} />
            <TextInput
              placeholder="UF/ OAB"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={stylesP.textInputPerfil}
            />
          </View>
          <View style={stylesP.action}>
            <FontAwesome name="university" size={20} />
            <TextInput
              placeholder="Instituição onde se formou"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={stylesP.textInputPerfil}
            />
          </View>

          <View>
            <Text style={stylesP.labelPerfilAdv}>Área de atuação:</Text>
            <Text style={{ marginBottom: 30 }}>Arrumar</Text>
          </View>

          <View>
            <Text style={stylesP.labelPerfilAdv}>Dias disponíveis para consultoria:</Text>
            <Text style={{ marginBottom: 30 }}>Arrumar</Text>
          </View>

          <View>
            <Text style={stylesP.labelPerfilAdv}>
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
      <Modal isVisible={isModalVisible} style={stylesP.modalPerfil} backdropOpacity={0.8} backdropColor="#fff" onBackdropPress={toggleModal}>
        <View style={stylesP.modalContentPerfil}>
          <View style={stylesP.modalHeader} />
          <Text style={stylesP.panelTitle}>Carregar foto</Text>
          <Text style={stylesP.panelSubtitle}>Escolha sua Imagem de perfil</Text>
          <ButtonP label="Tire uma foto" onPress={tirarFoto} />
          <ButtonP theme="primary" label="Importar foto da biblioteca" onPress={pickImageAsync} />
          <TouchableOpacity style={stylesP.panelButton} onPress={toggleModal}>
            <Text style={stylesP.panelButtonTitle}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default PefilAdv;