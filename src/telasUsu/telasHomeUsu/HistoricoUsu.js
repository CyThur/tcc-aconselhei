import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { styles } from '../../Styles';

export default function App() {
  return (
    <View style={styles.containerHistUsu}>
      <Text style={styles.titleHistUsu}>Meus Agendamentos</Text>
      <View style={styles.navigatorHistUsu}>
        <TouchableOpacity>
          <Text style={styles.navOptionHistUsu}>Próximas</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.navOption2HistUsu}>Histórico</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollViewHistUsu}>
        <View style={styles.labelContainerHistUsu}>
          <View style={{ paddingRight: 15 }}>
            <Text style={styles.dateHistUsu}>05/11/2023</Text>
            <Text style={styles.timeHistUsu}>17:00</Text>
          </View>

          <View>
            <Text style={styles.categoryHistUsu}>Direito do consumidor</Text>
            <Text style={styles.sourceHistUsu}>Realizada por chat</Text>
          </View>
        </View>

        <View style={styles.labelContainerHistUsu}>
          <View style={{ paddingRight: 15 }}>
            <Text style={styles.dateHistUsu}>05/11/2023</Text>
            <Text style={styles.timeHistUsu}>17:00</Text>
          </View>

          <View>
            <Text style={styles.categoryHistUsu}>Direito do consumidor</Text>
            <Text style={styles.sourceHistUsu}>Realizada por chat</Text>
          </View>
        </View>

        <View style={styles.labelContainerHistUsu}>
          <View style={{ paddingRight: 15 }}>
            <Text style={styles.dateHistUsu}>05/11/2023</Text>
            <Text style={styles.timeHistUsu}>17:00</Text>
          </View>

          <View>
            <Text style={styles.categoryHistUsu}>Direito do consumidor</Text>
            <Text style={styles.sourceHistUsu}>Realizada por chat</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}