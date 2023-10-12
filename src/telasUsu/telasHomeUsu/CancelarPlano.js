import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { styles } from '../../Styles';

export default function CancelSubscriptionScreen() {
  const [motivoCancelamento, setMotivoCancelamento] = useState('');
  const [switchValue, setSwitchValue] = useState(false);

  const handleCancellation = () => {
    if (switchValue) {
      // Lógica para cancelar a assinatura
      // Pode incluir chamadas a APIs, atualização de estado no servidor, etc.
      Alert.alert('Assinatura Cancelada com Sucesso!');
    } 
  };

  return (
    <View style={styles.containerCancelarPlano}>
      <View style={styles.headerCancelarPlano}>
        <Image
          style={styles.logoCancelarPlano}
          source={{ uri: 'https://i.postimg.cc/fRqmtRqn/aconselhei.png' }}
        />
      </View>

      <Text style={styles.titleCancelarPlano}>Deseja cancelar a assinatura?</Text>

      <Text style={styles.subtitleCancelarPlano}>Motivo do Cancelamento:</Text>
      <View style={styles.inputContainerCancelarPlano}>
        <TextInput
          style={styles.inputCancelarPlano}
          placeholder="Digite o motivo do cancelamento aqui"
        />
      </View>

      <Text style={styles.warningCancelarPlano}>Aviso!</Text>
      <View style={styles.switchContainerCancelarPlano}>
        <Switch
          value={switchValue}
          onValueChange={(value) => setSwitchValue(value)}
        />
        <Text style={styles.switchLabelCancelarPlano}>
          Estou ciente de que o cancelamento da consultoria agendada resultará na redução do meu saldo total de consultorias.
        </Text>
      </View>

      <View style={styles.buttonContainerCancelarPlano}>
        <TouchableOpacity
          style={[styles.buttonCancelarPlano, !switchValue && styles.disabledButtonCancelarPlano]}
          onPress={handleCancellation}
          disabled={!switchValue}
        >
          <Text style={styles.buttonTextCancelarPlano}>CONFIRMAR CANCELAMENTO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}