import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { AntDesign } from '@expo/vector-icons';

import { styles } from '../../Styles';


export default function ConsulAgen({ navigation }) {

  const today = new Date();
  const startDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM/DD')
  const [date, setDate] = useState('12/12/2023') //date variable

  function handleChange(propDate) {
    setDate(propDate)
  }

  return (
    <View style={styles.containerAgendaAdv}>

      <View style={styles.logoView}>
        <View style={{
          flexDirection: 'row',
          width: '100%',
          height: '100%',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <AntDesign
            name="left"
            size={20}
            color="#1E5A97"
            style={{ marginRight: '7%' }}
            onPress={() => navigation.navigate('TabRoutesAdv')} />
          <Image
            style={styles.logo2}
            source={require('../../../assets/aconselhei1.png')}
          />
        </View>
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
            <View style={{ width: '70%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', marginTop: '15%', marginBottom: '10%' }}>
              <Text style={styles.txt3}>Ainda não há agendamentos.</Text>
            </View>
            {/* <View style={styles.appointmentInfoAgendaAdv}>
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
                <Text style={styles.descriptionAgendaAdv}>Direitos Humanos</Text> */}
          </View>

          {/* <View style={styles.appointmentContainerAgendaAdv}>
                <View style={styles.appointmentInfoAgendaAdv}>
                  <Text style={styles.dayAgendaAdv}>QUINTA</Text>
                  <Text style={styles.dateAgendaAdv}>12/10</Text>
                </View>
                <Text style={styles.timeAgendaAdv}>15:00</Text>
                <Text style={styles.nameAgendaAdv}>Eliseu L. Sacramento</Text>
                <Text style={styles.descriptionAgendaAdv}>Direito do trabalho</Text>
              </View> */}
        </View>
      </ScrollView>


    </View >
  );
}