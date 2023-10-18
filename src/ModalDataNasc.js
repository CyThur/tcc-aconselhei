import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
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
    <View style={{ flexDirection: 'row', width: '105%' }}>
      <View style={styles.txtViewInput2}>
        <Text style={styles.txtInput2}>
          {selectedDate.toISOString().split('T')[0]}
        </Text>
        <TouchableOpacity onPress={showDatePickerModal}>
          <AntDesign
            name="calendar"
            size={20}
            color="#113E6B"
          />
        </TouchableOpacity>
      </View>

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