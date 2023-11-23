import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ImageBackground, Image, StyleSheet } from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import ButtonP from '../../BtnImgPicker';
import { getAuth, onAuthStateChanged, verifyBeforeUpdateEmail } from 'firebase/auth';
import { getDoc, doc, updateDoc, deleteField, deleteDoc } from 'firebase/firestore';
import { stylesP } from '../../StylesPerfil';
import { storage, db } from '../../firebase.config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import * as FileSystem from 'expo-file-system';

const PerfilAdv = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [state, setState] = useState(null);

  const [stateEmail, setStateEmail] = useState('');
  const [stateEspecialidade, setStateEspecialidade] = useState([]);
  const [stateHorarios, setStateHorarios] = useState([]);
  const [horariosSelecionados, setHorariosSelecionados] = useState([]);
  const [botaoHorarioPressionado, setBotaoHorarioPressionado] = useState({});
  const [hasImage, setHasImage] = useState(false)
  const [userData, setUserData] = useState([])
  const [editandoEspecialidade, setEditandoEspecialidade] = useState(false);
  const [editandoHorario, setEditandoHorario] = useState(false);
  const [categories, setCategories] = useState([]);
  const [diaSelecionado, setDiaSelecionado] = useState(null);

  const [boxStyles, setBoxStyles] = useState({
    borderRadius: 18,
    borderColor: '#1E5A97',
    padding: 10,
    backgroundColor: '#E1E1DE',
    width: 320,
    alignSelf: 'center',
  });

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //campo das especialidades não atualiza no banco de dados
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

  const excluirConta = async () => {
    Alert.alert(
      "Excluir Conta",
      "Tem certeza de que deseja excluir sua conta? Esta ação é irreversível.",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Excluir", 
          onPress: async () => {
            const auth = getAuth();
            const user = auth.currentUser;
  
            if (user) {
              // Excluir dados do Firestore
              const userDoc = doc(db, "advogados", user.uid);
              await deleteDoc(userDoc);
  
              // Excluir conta do Firebase Authentication
              await user.delete();
  
              Alert.alert('Conta excluída com sucesso!');
              navigation.navigate('Inicio');
            } else {
              Alert.alert('Erro ao excluir conta!');
            }
          } 
        }
      ]
    );
  }

  /**
   *
   */

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const pickImageAsync = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.status !== 'granted') {
      Alert.alert(
        'Atenção',
        'Você precisa permitir o acesso à galeria para usar essa função.',
        [{ text: 'Permitir', onPress: () => ImagePicker.requestMediaLibraryPermissionsAsync() }],
      );
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      allowsMultipleSelection: false,
    });
    if (!result.canceled) {
      Alert.alert(
        'Atenção',
        'Tem certeza de que deseja trocar sua foto de perfil?',
        [
          { text: 'Não', style: 'cancel' },
          {
            text: 'Sim',
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
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permission.status !== 'granted') {
        Alert.alert(
          'Atenção',
          'Você precisa permitir o acesso à câmera para usar essa função.',
          [{ text: 'Permitir', onPress: () => ImagePicker.requestMediaLibraryPermissionsAsync() }],
        );
        return;
      }

      const cameraResp = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 4],
        quality: 1,
        allowsMultipleSelection: false,
      })
      if (cameraResp.canceled) {
        Alert.alert('Aviso', 'Nenhuma foto tirada');
      } else {
        Alert.alert(
          'Atenção',
          'Tem certeza de que deseja trocar sua foto de perfil?',
          [
            { text: 'Não', style: 'cancel' },
            {
              text: 'Sim',
              onPress: () => { upload(setSelectedImage(cameraResp.assets[0].uri)); },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (e) {
      Alert.alert('Erro', 'Algo deu errado.', e);
    }
  };


  const upload = async () => {
    const auth = getAuth()
    const { uri } = await FileSystem.getInfoAsync(selectedImage);
    const docUserRef = doc(db, 'advogados', auth.currentUser.uid)
    const fileName = ref(storage, auth.currentUser.uid)

    await updateDoc(docUserRef, {
      foto: null
    });

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
            setState(userData)
          })
        } else {
          console.log('Erro: Usuário não autenticado!');
        }
      });
    };
    getUserData();
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchHorarios = async () => {
          const advogadoDoc = doc(db, "advogados", user.uid);
          const advogadoDocData = await getDoc(advogadoDoc);
          console.log(doc(db, "advogados", user.uid));
          if (advogadoDocData.exists()) {
            setStateHorarios({
              Segunda: advogadoDocData.data().horarioSegunda,
              Terça: advogadoDocData.data().horarioTerça,
              Quarta: advogadoDocData.data().horarioQuarta,
              Quinta: advogadoDocData.data().horarioQuinta,
              Sexta: advogadoDocData.data().horarioSexta,
              Sábado: advogadoDocData.data().horarioSábado,
              Domingo: advogadoDocData.data().horarioDomingo,
            })
            console.log(stateHorarios);
            // SE PRECISAR TESTAR
            //  console.log(`${dias[0]}: ${stateHorariosSegunda}`)
            //  console.log(`${dias[1]}: ${stateHorariosTerca}`);
            //  console.log(`${dias[2]}: ${stateHorariosQuarta}`);
            //  console.log(`${dias[3]}: ${stateHorariosQuinta}`);
            //  console.log(`${dias[4]}: ${stateHorariosSexta}`);
            //  console.log(`${dias[5]}: ${stateHorariosSabado}`);
          }
        }
        fetchHorarios();
      }
    });

    return () => unsubscribe();
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

  const horarios = [
    '7:00', '7:15', '7:30', '7:45', '8:00', '8:15', '8:30', '8:45',
    '9:00', '9:15', '9:30', '9:45', '10:00', '10:15', '10:30', '10:45',
    '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45',
    '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45',
    '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45',
    '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30',
  ];

  //apreseta todas as categorias escolhidas pelo advogado no cadastro
  const especialidadesSelecionadas = () => {
    return state.categorias.map((especialidade, index) => (
      <View key={index} style={{ backgroundColor: '#1E5A97', borderRadius: 25, width: '70%', alignSelf: 'flex-start', margin: 3, alignItems: 'center', justifyContent: 'center' }}>
        {/* PRECISA DEIXAR OS BOTÕES COM A MESMA LARGURA */}
        <Text style={{ margin: 10, textAlign: 'center', color: 'white', fontSize: 15 }}>{especialidade}</Text>
      </View>
    ))
  }

  //botões para poder escolher os DIAS dos horários de disponibilidade
  const botaoPraCadaDia = () => {
    return state.dias.map((dia, index) => (
      <View key={index}>
        <TouchableOpacity
          style={{ backgroundColor: '#1E5A97', borderRadius: 25, width: '85%', alignSelf: 'center', margin: 10, alignItems: 'center' }}
          //PRECISA DEIXAR OS BOTÕES COM A MESMA LARGURA
          onPress={() => botaoDiaSelecionado(index, dia)}
        >
          <Text style={{ margin: 10, textAlign: 'center', color: 'white', fontSize: 15 }}>{dia}</Text>
        </TouchableOpacity>
      </View>
    ))
  }

  const botaoDiaSelecionado = (index, dia) => {
    setDiaSelecionado(dia);
    setEditandoHorario(false);
    console.log(diaSelecionado, horariosSelecionados)
  }

  //botões para poder escolher os HORÁRIOS de disponibilidade
  const botoesPorLinha = 4;
  const botaoPraCadaHorario = () => {
    const botoes = [];
    for (let i = 0; i < horarios.length; i += botoesPorLinha) {
      const linhaBotoes = horarios.slice(i, i + botoesPorLinha);
      const botoesLinha = linhaBotoes.map((horario, index) => (
        <TouchableOpacity
          key={i + index}
          style={[
            stylesPA.botaoHorario,
            index > 0 && { marginLeft: 15 },
            botaoHorarioPressionado[horario] && { backgroundColor: 'green' }
          ]}
          onPress={() => botaoHorarioSelecionado(horario)}
        >
          <Text style={{ margin: 10, textAlign: 'center', color: 'white', fontSize: 15 }}>{horario}</Text>
        </TouchableOpacity>
      ));

      botoes.push(
        <View key={i} style={{ flexDirection: 'row', justifyContent: 'center', }}>
          {botoesLinha}
        </View>
      );
    }

    return botoes;
  };

  const botaoHorarioSelecionado = (horario) => {
    const horarioJaSelecionado = horariosSelecionados.includes(horario);
    setBotaoHorarioPressionado(prevState => ({ ...prevState, [horario]: !prevState[horario] }));

    if (horariosSelecionados.length === 0) {
      setHorariosSelecionados([horario]);
    } else if (horarioJaSelecionado) {
      setHorariosSelecionados(horariosSelecionados.filter((h) => h !== horario));
    } else {
      setHorariosSelecionados([...horariosSelecionados, horario]);
    }
    console.log(diaSelecionado, ...horariosSelecionados, horario);
  };


  const salvarHorarios = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const userDoc = doc(db, "advogados", user.uid);
      if (horariosSelecionados.length > 0) {
        await updateDoc(userDoc, {
          [`horario${diaSelecionado}`]: horariosSelecionados,
        });
        Alert.alert('Horários salvos com sucesso!', 'Em breve seus horários de disponibilidade para esse dia serão atualizados');
        setEditandoHorario(false);
        navigation.navigate('TabRoutesAdv');
      } else {
        Alert.alert('Nenhum horário foi selecionado!');
      }
      console.log(horariosSelecionados);
    }
  }

  const apagarHorarios = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const userDoc = doc(db, "advogados", user.uid);
      const docData = await getDoc(userDoc);
      if (docData.data().hasOwnProperty(`horario${diaSelecionado}`)) {
        Alert.alert("Confirmação", "Tem certeza de que deseja apagar os horários?",
          [
            {
              text: "Cancelar",
              onPress: () => console.log("Cancelado"),
              style: "cancel"
            },
            {
              text: "Confirmar",
              onPress: async () => {
                await updateDoc(userDoc, {
                  [`horario${diaSelecionado}`]: deleteField(),
                });
                Alert.alert(`Os horários de disponibilidade no dia de ${diaSelecionado} foram apagados!`);
                setHorariosSelecionados([]);
                setEditandoHorario(false);
              }
            }
          ]
        );
      } else {
        Alert.alert(`Não há horários no dia de ${diaSelecionado} para serem apagados!`);
      }
    }
  }

  const fraseProBotao = () => {
    let variacaoDaFrase = null;
    if (diaSelecionado) {
      variacaoDaFrase = `Editar horários de ${diaSelecionado.toLowerCase()}`;
      return (
        <TouchableOpacity
          style={{ backgroundColor: '#1E5A97', borderRadius: 5, width: '80%', alignSelf: 'flex-start', margin: 10, marginLeft: 0, padding: 5, alignItems: 'center' }}
          onPress={() => trocarEstadoEdicao()}
        >
          <Text style={{ color: 'white', fontSize: 16, padding: 3 }}>{variacaoDaFrase}</Text>
        </TouchableOpacity>
      )
    } else {
      variacaoDaFrase = 'Selecione um dia para ver seus horários de disponibilidade';
      return (
        <View style={{ backgroundColor: '#DDDDDD', borderRadius: 5, borderWidth: 1, borderColor: '#1E5A97', width: '80%', alignSelf: 'flex-start', margin: 10, padding: 5, alignItems: 'center' }}>
          <Text style={{ fontSize: 15 }}>{variacaoDaFrase}</Text>
        </View>
      )
    }
  }

  const trocarEstadoEdicao = () => {
    setEditandoHorario(true);
    setHorariosSelecionados([]);
    console.log(diaSelecionado, horariosSelecionados)
  }

  return (
    <View style={stylesP.containerPerfilAdv}>
      <View style={{ margin: 20, marginTop: 200 }}>
        <AntDesign name="left" size={24} color="#1E5A97" onPress={() => navigation.navigate('TabRoutesAdv')} />
        <View style={{ alignItems: 'center', }}>
          <TouchableOpacity onPress={toggleModal}>
            <View style={{ height: 120, width: 120, borderRadius: 60, justifyContent: 'center', alignItems: 'center' }}>
              <ImageBackground
                source={{ uri: hasImage ? userData.foto : 'https://www.pinclipart.com/picdir/big/157-1578186_user-profile-default-image-png-clipart.png' }}
                style={{ height: 120, width: 120, }}
                imageStyle={{ borderRadius: 60, borderWidth: 1, borderColor: '#000' }}
              />
            </View>
          </TouchableOpacity>
          <Text style={stylesP.profileTextPerfilAdv}>{state.nome}</Text>
          <Text style={stylesP.profileTextPerfilAdvFacul}>{state.faculdade}</Text>
          <Text style={stylesP.profileTextPerfilAdvOAB}>{state.oabCompleta}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={stylesP.action}>
            <FontAwesome name="envelope" size={20} color="#1E5A97" />
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

          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[stylesP.labelPerfilAdv, { width: '93%' }]}>Área de atuação:</Text>
              <Text style={[stylesP.labelPerfilAdv, { alignSelf: 'flex-end' }]}><AntDesign name="form" size={20} color="#1E5A97" onPress={ativarEdicaoEspecialidade} /></Text>
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
                  <Text>Em teoria seria o botão de salvar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ flexDirection: 'column' }}>
                {especialidadesSelecionadas()}
              </View>
            )}
          </View>

          <View>
            <Text style={stylesP.labelPerfilAdv}>Dias disponíveis para consultoria:</Text>
            <View style={{ flexDirection: 'row' }}>
              {botaoPraCadaDia()}
            </View>
          </View>

          <View>
            <Text style={stylesP.labelPerfilAdv}>Horários disponíveis para consultoria:</Text>

            {diaSelecionado !== null && stateHorarios[diaSelecionado] !== undefined ? (
              <Text style={stylesPA.textStateHorarios}>
                Seus horários de disponibilidade no dia de {diaSelecionado.toLowerCase()} são: {`${stateHorarios[diaSelecionado].join(' | ')}`}
              </Text>
            ) : (
              <Text style={stylesPA.textStateHorarios}>Você ainda não escolheu um dia para visualizar, ou não possui horários para este dia</Text>
            )}

            {/* botão pra apresentar os horários de disponibilidade */}
            {editandoHorario === false ? (
              <View style={{ marginBottom: 20 }}>
                {fraseProBotao()}
              </View>
            ) : (

              <View style={{ flexDirection: 'column' }}>
                {botaoPraCadaHorario()}

                {horariosSelecionados.length > 0 ? (
                  <Text style={[stylesPA.textStateHorarios, { marginTop: 15, marginLeft: 10 }]}>
                    Horários selecionados: {horariosSelecionados.join(' | ')}
                  </Text>
                ) : (
                  <Text style={[stylesPA.textStateHorarios, { marginTop: 15, marginLeft: 10 }]}>
                    Horários selecionados: nenhum
                  </Text>
                )}

                <TouchableOpacity
                  style={{ backgroundColor: '#1E5A97', padding: 10, borderRadius: 5, alignItems: 'center', justifyContent: 'center', margin: 10, marginTop: 30, }}
                  onPress={salvarHorarios}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>SALVAR HORÁRIOS DE {diaSelecionado.toUpperCase()}-FEIRA</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ backgroundColor: '#E40000', padding: 10, borderRadius: 5, alignItems: 'center', justifyContent: 'center', margin: 10, marginTop: 0, marginBottom: 130 }}
                  onPress={apagarHorarios}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>APAGAR HORÁRIOS DE {diaSelecionado.toUpperCase()}-FEIRA</Text>
                </TouchableOpacity>
              </View>
            )}

          </View>

          <TouchableOpacity onPress={excluirConta} style={stylesPA.deleteButton}>
            <Icon name="trash" size={20} color="#f23535" />
            <Text style={stylesPA.deleteButtonText}>Excluir conta</Text>
          </TouchableOpacity>

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


const stylesPA = StyleSheet.create({
  textStateHorarios: {
    fontSize: 15,
    color: '#505050',
    marginVertical: 7
  },
  botaoHorario: {
    backgroundColor: '#1E5A97',
    borderRadius: 25,
    width: '18%',
    alignSelf: 'center',
    margin: 5,
    marginHorizontal: 7,
    alignItems: 'center'
  },
  deleteButton: {
    bottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 120,
    width: '100%',
    justifyContent: 'flex-end',
  },
  deleteButtonText: {
    color: '#f23535',
    fontSize: 16,
    marginLeft: 5,
  },
})