import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { AntDesign } from '@expo/vector-icons';

import { styles } from '../Styles';


export default function AgendaUsu() {

  const today = new Date();
  const startDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM/DD')
  const [date, setDate] = useState('12/12/2023') //date variable

  function handleChange(propDate) {
    setDate(propDate)
  }

  return (
    <View style={styles.containerAgendaAdv}>
      <View style={styles.logoView}>
        <Image
          style={styles.logo2}
          source={require('../../assets/aconselhei1.png')}
        />
      </View>


      <ScrollView style={{ height: '100%', marginTop: '-3%' }} showsVerticalScrollIndicator={false}>
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
          <Text style={[styles.navOption, { marginBottom: 20 }]}>AGENDAMENTOS</Text>
          <View style={styles.containerTelas}>
            <View style={{ width: '70%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', marginTop: '10%', marginBottom: '10%' }}>
              <Text style={styles.txt3}>Você ainda não agendou nenhuma consultoria.</Text>
            </View>
            {/* <View style={styles.appointmentContainerAgendaUsu}>
            <View style={styles.appointmentInfoAgendaUsu}>
              <Text style={styles.dayAgendaUsu}>SEGUNDA</Text>
              <Text style={styles.dateAgendaUsu}>10/10</Text>
            </View>
            <Text style={styles.timeAgendaUsu}>11:00</Text>
            <Text style={styles.nameAgendaUsu}>Dra. Marina Riboli</Text>
            <Text style={styles.descriptionAgendaUsu}>Direito do consumidor</Text>
          </View> */}
          </View>
          {/* <View style={styles.appointmentContainerAgendaUsu}>
            <View style={styles.appointmentInfoAgendaUsu}>
              <Text style={styles.dayAgendaUsu}>QUARTA</Text>
              <Text style={styles.dateAgendaUsu}>12/10</Text>
            </View>
            <Text style={styles.timeAgendaUsu}>12:30</Text>
            <Text style={styles.nameAgendaUsu}>Dr. Fabrício Freitas</Text>
            <Text style={styles.descriptionAgendaUsu}>Direito do trabalho</Text>
          </View> */}


        </View>
      </ScrollView>
    </View >


  );
}