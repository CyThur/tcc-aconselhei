import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../../Styles.js'
import { storage, db } from '../../firebase.config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc, updateDoc } from 'firebase/firestore';

const DiasDisponiveis = () => {
    const [state, setState] = useState(null);
    const [userData, setUserData] = useState([])

    useEffect(() => {
        const getUserData = async () => {
          const auth = getAuth();
          onAuthStateChanged(auth, async (user) => {
            if (user) {
              const docRef = doc(db, 'advogados', user.uid)
              await getDoc(docRef).then((doc) => {
                const userData = {
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

    return (
        <View>
            <Text>oi</Text> {/* está dando erro ao tentar passar state.dias, aparentemente dias é retornado como nulo*/}
        </View>
    );
};

export default DiasDisponiveis;