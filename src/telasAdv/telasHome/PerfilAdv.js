import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ImageBackground, Button, Image } from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import ButtonP from '../../BtnImgPicker';
import { getAuth, onAuthStateChanged, verifyBeforeUpdateEmail } from 'firebase/auth';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { styles } from '../../Styles';
import { stylesP } from '../../StylesPerfil';
import { storage, db } from '../../firebase.config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import * as FileSystem from 'expo-file-system';
import DiasDisponiveis from './DiasDisponiveis';

const PerfilAdv = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [state, setState] = useState(null);

  const [stateEmail, setStateEmail] = useState('');
  const [stateNumCelular, setStateNumCelular] = useState('');
  const [stateEspecialidade, setStateEspecialidade] = useState([]);
  const [hasImage, setHasImage] = useState(false)
  const [userData, setUserData] = useState([])
  const [editandoEspecialidade, setEditandoEspecialidade] = useState(false);
  const [categories, setCategories] = useState([]);
  const [boxStyles, setBoxStyles] = useState({
    borderRadius: 18,
    borderColor: '#1E5A97',
    padding: 10,
    backgroundColor: '#E1E1DE',
    width: 320,
    alignSelf: 'center',
  });

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //campo das especialidades que também não atualiza no banco de dados, possui a mesma estrutura da atualização dos números de celular
  const salvarEspecialidade = useCallback(async () => {
    const auth = getAuth();
    onAuthStateChanged(auth.uid, async (user) => {
      if (user) {
        const docRef = doc(db, 'advogados', user.uid)
        await updateDoc(docRef, {
          categorias: stateEspecialidade,
        })
        Alert.alert('Especialidades salvas com sucesso!');
      } else {
        console.log('Erro ao atualizar a informação!');
      }
    });

  }, [stateEspecialidade]);

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

              upload(setSelectedImage(cameraResp.assets[0].uri));
            },
          },
        ],
        { cancelable: false }
      );
    } catch (e) {
      Alert.alert('Atenção', 'Você não tirou nenhuma foto.');
    }
  };

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//A foto não está mais querendo ir para o banco de dados
//Acredita-se que o maior problema seja no upload
  const upload = async () => {
    const auth = getAuth()
    const { uri } = await FileSystem.getInfoAsync(selectedImage);
    const docUserRef = doc(db, 'advogados', auth.currentUser.uid)
    const fileName = ref(storage, auth.currentUser.uid)

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// if para deletar a foto antes de dar o upload está dando erro
    if (doc.data().foto != null) {
      deleteFoto();
    } else {
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
      });
      uploadBytes(fileName, blob).then(async () => {
        getDownloadURL(fileName).then(async (url) => {
          await updateDoc(docUserRef, {
            foto: url
          })
        })
      });
    }
  }

  const deleteFoto = async () => {
    const auth = getAuth()
    const fileName = ref(storage, auth.currentUser.uid)
    deleteObject(fileName).then(() => {
      console.log('Foto deletada com sucesso!')
    }).catch((error) => {
      console.log(error)
    });

    const docRef = doc(db, 'advogados', auth.currentUser.uid);
    const userData = await getDoc(docRef).then((doc) => doc.data());
    await updateDoc(docRef, {
      foto: null
    }).then(() => {
      setHasImage(false);
      setUserData({ ...userData, foto: null });
    }).catch((error) => {
      console.error(error);
    });
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
              numeroCelular: doc.data().numeroCelular,
              oabCompleta: doc.data().oabCompleta,
              faculdade: doc.data().faculdade,
              categorias: doc.data().categorias || [],
              dias: doc.data().dias || [],
            };
            console.log(doc.data())
            console.log(userData)
            console.log(doc.data().numeroCelular)
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

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //o número de celular não está sendo atualizado no banco de dados, um problema parecido com o uplaod da foto, o mesmo acontece 
  //quando tentamos atualizar as especialidades
  const salvarTel = useCallback(async () => {
    const auth = getAuth();
    onAuthStateChanged(auth.uid, async (user) => {
      if (user) {
        const docRef = doc(db, 'advogados', user.uid)
        await updateDoc(docRef, {
          numeroCelular: stateNumCelular,
        })
        Alert.alert('Novo telefone salvo com sucesso!');
      } else {
        console.log('Erro ao atualizar a informação!');
      }
    });

  }, [stateNumCelular]);

  if (state == null) {
    return (
      <Image
        style={{ width: '100%', height: '100%' }}
        source={require('../../../assets/splash.png')}
      />
    )
  }

  //Edição das especialidades
  const ativarEdicaoEspecialidade = () => {
    setEditandoEspecialidade(!editandoEspecialidade); //inverte o valor do estado
  };

  const areas = [
    { key: 'Direito Ambiental', value: 'Direito Ambiental' },
    { key: 'Direito Civil', value: 'Direito Civil' },
    { key: 'Direito do Consumidor', value: 'Direito do Consumidor' },
    { key: 'Direito Contratual', value: 'Direito Contratual' },
    { key: 'Direito Desportivo', value: 'Direito Desportivo' },
    { key: 'Direito Digital', value: 'Direito Digital' },
    { key: 'Direito Eleitoral', value: 'Direito Eleitoral' },
    { key: 'Direito Empresarial', value: 'Direito Empresarial' },
    { key: 'Direito da Família', value: 'Direito da Família' },
    { key: 'Direitos Humanos', value: 'Direitos Humanos' },
    { key: 'Direito Imobiliário', value: 'Direito Imobiliário' },
    { key: 'Direito Penal', value: 'Direito Penal' },
    { key: 'Direito da Propriedade Intelectual', value: 'Direito da Propriedade Intelectual' },
    { key: 'Defensoria Pública', value: 'Defensoria Pública' },
    { key: 'Direito Trabalhista', value: 'Direito Trabalhista' },
    { key: 'Direito Tributário', value: 'Direito Tributário' },
];
  

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
                  <Icon name="camera" size={35} color="#fff" style={{ opacity: 0.3, alignSelf: 'center', justifyContent: 'center' }} />
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
            <FontAwesome name="envelope" size={20} color="#1E5A97"/>
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
            <FontAwesome name="phone" size={20} color="#1E5A97"/>
            <TextInput
              placeholder={String(state.numeroCelular)}
              placeholderTextColor="#1E5A97"
              keyboardType='number-pad'
              autoCorrect={false}
              value={stateNumCelular}
              style={stylesP.textInputPerfil}
              onChangeText={(text) => setStateNumCelular(text)}
            />
            <AntDesign name="check" size={18} color="#1E5A97" onPress={salvarTel} />
          </View>

          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[stylesP.labelPerfilAdv, {width: '93%'}]}>Área de atuação:</Text>
              <Text style={[stylesP.labelPerfilAdv, {alignSelf: 'flex-end'}]}><AntDesign name="form" size={20} color="#1E5A97" onPress={ativarEdicaoEspecialidade}/></Text>
            </View>
            
            {editandoEspecialidade ? (
              <View>
              <MultipleSelectList
              setSelected={setStateEspecialidade}
              data={areas}
              placeholder="Áreas de atuação"
              label="Áreas de atuação"
              notFoundText="Área não encontrada"
              searchPlaceholder="Pesquisar"
              labelStyles={{ color: '#1E5A97' }}
              badgeStyles={{ backgroundColor: '#1E5A97' }}
              boxStyles={boxStyles}
            />

            <TouchableOpacity onPress={salvarEspecialidade}>
              <Text>aa</Text>
            </TouchableOpacity>
            </View>
            ) : (
              <Text style={{ marginBottom: 30 }}>{state.categorias}</Text>
            )}

          </View>
          <View>
            <Text style={stylesP.labelPerfilAdv}>Dias disponíveis para consultoria:</Text>
            <Text style={{ marginBottom: 30 }}>{state.dias}</Text>
            <View>
            <DiasDisponiveis />
            </View>
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