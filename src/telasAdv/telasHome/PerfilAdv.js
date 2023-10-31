import { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ImageBackground, Button, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import ButtonP from '../../BtnImgPicker';
import { getAuth, onAuthStateChanged, verifyBeforeUpdateEmail } from 'firebase/auth';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { styles } from '../../Styles';
import { stylesP } from './StylesPerfil';
import { storage, db } from '../../firebase.config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

import * as FileSystem from 'expo-file-system';

const PerfilAdv = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [files, setFiles] = useState([]);
  const [state, setState] = useState(null);

  const [stateEmail, setStateEmail] = useState('');
  const [stateTelefone, setStateTelefone] = useState('');
  const [hasImage, setHasImage] = useState(false)
  const [userData, setUserData] = useState([])

  useEffect(() => {

    const auth = getAuth();
    async function pegarData() {
      const docRef = doc(db, 'advogados', auth.currentUser.uid)

      await getDoc(docRef).then((doc) => {

        if (doc.data().foto != null) {
          console.log('tem foto')
          setHasImage(true)
          setUserData(doc.data())
        }
      })
    }

    pegarData()
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
      Alert.alert(
        'Confirmação',
        'Tem certeza de que deseja trocar sua foto de perfil?',
        [
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancelado'),
            style: 'cancel',
          },
          {
            text: 'Confirmar',
            onPress: () => {
              upload(setSelectedImage(result.assets[0].uri));
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert('Atenção', 'Você não escolheu nenhuma foto.');
    }


  };

  const tirarFoto = async () => {
    try {
      const cameraResp = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 4],
        quality: 1,
        allowsMultipleSelection: false,
      })
      Alert.alert(
        'Confirmação',
        'Tem certeza de que deseja trocar sua foto de perfil?',
        [
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancelado'),
            style: 'cancel',
          },
          {
            text: 'Confirmar',
            onPress: () => {
              upload( setSelectedImage(cameraResp.assets[0].uri));
            },
          },
        ],
        { cancelable: false }
      );
    } catch (e) {
      Alert.alert('Atenção', 'Você não tirou nenhuma foto.');
    }
  };

  const upload = async () => {
    const auth = getAuth()
    const { uri } = await FileSystem.getInfoAsync(selectedImage);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      }
      xhr.onerror = (e) => {
        reject(new TypeError('Network request failed'));
      }
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    })

    const docUserRef = doc(db, 'advogados', auth.currentUser.uid)

    const fileName = ref(storage, auth.currentUser.uid)

    uploadBytes(fileName, blob).then(async () => {
      getDownloadURL(fileName).then(async (url) => {
        await updateDoc(docUserRef, {
          foto: url
        })
      })
    });
  }

  const deleteFoto = async () => {
    const auth = getAuth()
    const fileName = ref(storage, auth.currentUser.uid)
    deleteObject(fileName).then(() => {
      console.log('Foto deletada com sucesso!')
    }).catch((error) => {
      console.log(error)
    })
  }

  // if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
  //   Alert.alert(
  //     'Atenção',
  //     'Você precisa permitir o acesso à câmera para usar essa função.',
  //     [{ text: 'Permitir', onPress: () => requestPermission() }],);
  // }

  //pegar infos dos advs
  useEffect(() => {
    const getUserData = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = doc(db, 'advogados', user.uid)
          await getDoc(docRef).then((doc) => {
            const userData = {
              nome: doc.data().nome,
              email: user.email,
              telefone: doc.data().telefone,
              oabCompleta: doc.data().oabCompleta,
              faculdade: doc.data().faculdade,

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
  const salvarEmail = useCallback(async () => {
    const auth = getAuth();                          
    await verifyBeforeUpdateEmail(auth.currentUser, stateEmail).then(() => {
      Alert.alert('Atenção', 'Clique no link enviado ao seu novo e-mail para confirmar a alteração!');
    }).catch((error) => {
      console.log(error)
    })
  }, [stateEmail]);

  const salvarTel = useCallback(async () => {
    const auth = getAuth();
    onAuthStateChanged(auth.uid, async (user) => {
      if (user) {
        const docRef = doc(db, 'advogados', user.uid)
        await updateDoc(docRef, {
          telefone: stateTelefone,
        })
        Alert.alert('Novo telefone salvo com sucesso!');
      } else {
        console.log('Erro ao atualizar a informação!');
      }
    });

  }, [stateTelefone]);

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
      <View style={{ margin: 20, marginTop: 150 }}>
        <AntDesign name="left" size={24} color="#1E5A97" onPress={() => navigation.navigate('TabRoutesAdv')} />
        <View style={{ alignItems: 'center', }}>
          <TouchableOpacity onPress={toggleModal}>
            <View style={{ height: 120, width: 120, borderRadius: 60, justifyContent: 'center', alignItems: 'center' }}>
              <ImageBackground
                source={{ uri: hasImage ? userData.foto : 'https://www.pinclipart.com/picdir/big/157-1578186_user-profile-default-image-png-clipart.png' }}
                style={{ height: 120, width: 120, }}
                imageStyle={{ borderRadius: 60, borderWidth: 1, borderColor: '#000' }}
              >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', alignContent: 'center' }}>
                  <Icon name="camera" size={35} color="#fff" style={{ opacity: 0.7, alignSelf: 'center', justifyContent: 'center' }} />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={stylesP.profileTextPerfilAdv}>{state.nome}</Text>
          <Text style={stylesP.profileTextPerfilAdvFacul}>{state.faculdade}</Text>
          <Text style={stylesP.profileTextPerfilAdvOAB}>{state.oabCompleta}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
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
            <AntDesign name="check" size={18} color="#1E5A97" onPress={salvarEmail} />
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
            <AntDesign name="check" size={18} color="#1E5A97" onPress={salvarTel} />
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
            <TouchableOpacity style={styles.loginButton} onPress={''}>
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
          <ButtonP theme="secundary" label="Deletar imagem" onPress={deleteFoto} />
          <TouchableOpacity style={stylesP.panelButton} onPress={toggleModal}>
            <Text style={stylesP.panelButtonTitle}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default PerfilAdv;