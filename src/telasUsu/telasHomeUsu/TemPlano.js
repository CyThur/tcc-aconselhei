import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function TemPlano({navigation}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
      onPress={()=> navigation.navigate('CancelarPlano')}>
        <Text style={styles.titulo}>Caso o beneficiado já tenha contratado o plano (clicável)</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold'
  },
});