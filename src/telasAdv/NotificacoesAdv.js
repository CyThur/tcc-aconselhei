import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeUsu() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Notificações dos Advogados</Text>
      {/*Notificação  indicando a hora da consulta, e caminho para o chat*/}
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
