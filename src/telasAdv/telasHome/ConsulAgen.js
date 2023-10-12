import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, StyleSheet, Modal, Text, ScrollView } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { styles } from '../../Styles';


export default function ConsulAgen() {

  const today = new Date();
  const startDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM/DD')
  const [date, setDate] = useState('12/12/2023') //date variable

  function handleChange(propDate) {
    setDate(propDate)
  }

  return (
    <View style={styles.containerAgendaAdv}>
      <View>
        <Modal animationType='slide'>
          <ScrollView>

            <View style={styles.centeredViewAgendaAdv}>
              <View style={styles.modalViewAgendaAdv}>
                <DatePicker
                  mode='calendar'
                  minimumDate={startDate}
                  selected={date}
                  onDateChange={handleChange}
                  style={styles.datePickerAgendaAdv}
                />
              </View>
            </View>

            <View>
              <Text style={styles.agendamentosAgendaAdv}>Agendamentos</Text>
              <View style={styles.navigatorAgendaAdv}></View>
              <View style={styles.appointmentContainerAgendaAdv}>
                <View style={styles.appointmentInfoAgendaAdv}>
                  <Text style={styles.dayAgendaAdv}>SEGUNDA</Text>
                  <Text style={styles.dateAgendaAdv}>10/10</Text>
                </View>
                
                <Text style={styles.timeAgendaAdv}>11:00</Text>
                <Text style={styles.nameAgendaAdv}>Ana D. Ignácio</Text>
                <Text style={styles.descriptionAgendaAdv}>Direito do consumidor</Text>

                <Text style={styles.time2AgendaAdv}>12:30</Text>
                <Text style={styles.nameAgendaAdv}>Mariana S. F. Afonso</Text>
                <Text style={styles.descriptionAgendaAdv}>Direito do consumidor</Text>

                <Text style={styles.time2AgendaAdv}>18:00</Text>
                <Text style={styles.nameAgendaAdv}>Donisete Fernandes</Text>
                <Text style={styles.descriptionAgendaAdv}>Direitos Humanos</Text>
              </View>

              <View style={styles.appointmentContainerAgendaAdv}>
                <View style={styles.appointmentInfoAgendaAdv}>
                  <Text style={styles.dayAgendaAdv}>QUINTA</Text>
                  <Text style={styles.dateAgendaAdv}>12/10</Text>
                </View>
                <Text style={styles.timeAgendaAdv}>15:00</Text>
                <Text style={styles.nameAgendaAdv}>Eliseu L. Sacramento</Text>
                <Text style={styles.descriptionAgendaAdv}>Direito do trabalho</Text>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>

      <StatusBar style='auto' />
    </View >
  );
}