import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, StyleSheet, Modal, Text, ScrollView } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { styles } from '../Styles';




export default function AgendaUsu() {

  const today = new Date();
  const startDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM/DD')
  const [date, setDate] = useState('12/12/2023') //date variable

  function handleChange(propDate) {
    setDate(propDate)
  }

  return (
    <View style={styles.containerAgendaUsu}>


      <View>
        <Modal animationType='slide'>
          <ScrollView>

            <View style={styles.centeredViewAgendaUsu}>
              <View style={styles.modalViewAgendaUsu}>
                <DatePicker
                  mode='calendar'
                  minimumDate={startDate}
                  selected={date}
                  onDateChange={handleChange}
                  style={styles.datePickerAgendaUsu}
                />
              </View>
            </View>

            <View>
              <Text style={styles.agendamentosAgendaUsu}>Meus Agendamentos</Text>
              <View style={styles.navigatorAgendaUsu}></View>
              <View style={styles.appointmentContainerAgendaUsu}>
                <View style={styles.appointmentInfo}>
                  <Text style={styles.dayAgendaUsu}>SEGUNDA</Text>
                  <Text style={styles.dateAgendaUsu}>10/10</Text>
                </View>
                <Text style={styles.timeAgendaUsu}>11:00</Text>
                <Text style={styles.nameAgendaUsu}>Dra. Marina Riboli</Text>
                <Text style={styles.descriptionAgendaUsu}>Direito do consumidor</Text>
              </View>

              <View style={styles.appointmentContainerAgendaUsu}>
                <View style={styles.appointmentInfoAgendaUsu}>
                  <Text style={styles.dayAgendaUsu}>QUARTA</Text>
                  <Text style={styles.dateAgendaUsu}>12/10</Text>
                </View>
                <Text style={styles.timeAgendaUsu}>12:30</Text>
                <Text style={styles.nameAgendaUsu}>Dr. Fabrício Freitas</Text>
                <Text style={styles.descriptionAgendaUsu}>Direito do trabalho</Text>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>

      <StatusBar style='auto' />
    </View >


  );
}