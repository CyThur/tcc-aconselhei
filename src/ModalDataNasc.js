import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './Styles.js';

const Calendario = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const dataMin = new Date('1913-01-02');
  const dataMax = new Date();

  return (
      <View style={{ width:'100%', flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
        <TouchableOpacity onPress={showDatePickerModal}>
          <FontAwesome name="calendar" size={25} color="#1E5A97" style={[{ marginRight: 10 }, {marginBottom: 16}]}/>
        </TouchableOpacity>
          <Text 
            style={[
            styles.inputLogin, {
              //validador do calendario
            }]}>
            {selectedDate.toISOString().split('T')[0]}
          </Text>
      

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={dataMin}
          maximumDate={dataMax}
        />
      )}
    </View>
  );
};

export default Calendario;