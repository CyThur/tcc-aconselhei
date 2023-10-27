import { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ImageBackground, Button, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import ButtonP from '../../BtnImgPicker';
import ImageViewer from '../../ImgPickerViewer';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDoc, doc, updateDoc } from 'firebase/firestore';
import { styles } from '../../Styles';
import { stylesP } from '../../telasAdv/telasHome/StylesPerfil';
import { storage, db, listFiles, uploadToFirebase } from '../../firebase.config';

import TesteFotoLista from "../../testeListaFotos";


const PerfilUsu = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [image, setImage] = useState(null);
  const [files, setFiles] = useState([]);
  const [state, setState] = useState(null);

  const [stateEmail, setStateEmail] = useState('');
  const [stateTelefone, setStateTelefone] = useState('');

  const placeholderImage = '../../../assets/userSemFoto.png';

  useEffect(() => {
    listFiles().then((listResp) => {
      const files = listResp.map((value) => {
        return { name: value.fullPath };
      });

      setFiles(files);
    });
  }, []);

  /**
   *
   */

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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

  /**
   *
   */

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
        const { uri } = cameraResp.assets[0];
        const fileName = uri.split("/").pop();
        const uploadResp = await uploadToFirebase(uri, fileName, (v) =>
          console.log(v)
        );
        console.log(uploadResp);

        listFiles().then((listResp) => {
          const files = listResp.map((value) => {
            return { name: value.fullPath };
          });

          setFiles(files);
        });
      }
    } catch (e) {
      Alert.alert('Erro', 'A imagem não foi carregada' + e.message);
    }
  };

  // if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
  //   Alert.alert(
  //     'Atenção',
  //     'Você precisa permitir o acesso à câmera para usar essa função.',
  //     [{ text: 'Permitir', onPress: () => requestPermission() }],);
  // }

  //pegar infos dos beneficiados
  useEffect(() => {
    const getUserData = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = doc(db, 'usuarios', user.uid)
          await getDoc(docRef).then((doc) => {
            const userData = {
              nome: doc.data().nome,
              email: user.email,
              telefone: doc.data().telefone,
            };
            console.log(doc.data())
            console.log(userData)
            setState(userData)
          })
        } else {
          console.log('Erro: Usuário não autenticado!');
        }
      });
    };
    getUserData();
  }, []);

  // salvar as infos
  const handleSaveData = useCallback(async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'usuarios', user.uid)
        await updateDoc(docRef, {
          email: stateEmail,
          telefone: stateTelefone,
        })
        Alert.alert('Dado salvo com sucesso!');
      } else {
        console.log('Erro ao atualizar as informações!');
      }
    });

  }, [stateEmail, stateTelefone]);

  if (state == null) {
    return (
      <Image
        style={{ width: '100%', height: '100%' }}
        source={require('../../../assets/splash.png')}
      />
    )
  }

  return (
    <View style={stylesP.containerPerfilAdv}>
      <View style={{ margin: 20, marginTop: -150 }}>
        <TesteFotoLista files={files} />
        <AntDesign name="left" size={24} color="#1E5A97" onPress={()=> navigation.navigate('TabRoutesUsu')}/>
        <View style={{ alignItems: 'center', }}>
          <TouchableOpacity onPress={toggleModal}>
            <View style={{ height: 120, width: 120, borderRadius: 60, justifyContent: 'center', alignItems: 'center' }}>
              <ImageBackground
                source={require(placeholderImage)}
                style={{ height: 120, width: 120, }}
                imageStyle={{ borderRadius: 60, borderWidth: 1, borderColor: '#000' }}
              >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', alignContent: 'center' }}>
                  <Icon name="camera" size={35} color="#fff" style={{ opacity: 0.7, alignSelf: 'center', justifyContent: 'center' }} />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={stylesP.profileTextPerfilUsu}>{state.nome}</Text>
        </View>

        <View style={stylesP.action}>
          <FontAwesome name="envelope-o" size={20} />
          <TextInput
            placeholder={state.email}
            keyboardType="email-address"
            placeholderTextColor="#1E5A97"
            autoCorrect={false}
            value={stateEmail}
            onChangeText={(text) => setStateEmail(text)}
            style={stylesP.textInputPerfil}
          />
        </View>
        <View style={stylesP.action}>
          <FontAwesome name="phone" size={20} />
          <TextInput
            placeholder={String(state.telefone)}
            placeholderTextColor="#1E5A97"
            keyboardType='number-pad'
            autoCorrect={false}
            value={stateTelefone}
            style={stylesP.textInputPerfil}
            onChangeText={(text) => setStateTelefone(text)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleSaveData}>
            <Text style={styles.loginButtonText}>SALVAR</Text>
          </TouchableOpacity>
        </View>

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

export default PerfilUsu;