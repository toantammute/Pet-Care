import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, SectionListComponent, Modal, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import usePet from '../hooks/usePets'
import usePetSchedule from '../hooks/usePetSchedule';
import { useNavigation } from '@react-navigation/native';

const repeatData = [
  {
    value: 'NONE',
    label: 'None',
  },
  {
    value: 'DAILY',
    label: 'Daily',
  },
  {
    value: 'WEEKLY',
    label: 'Weekly',
  },
  // {
  //   value: 'MONTHLY',
  //   label: 'Monthly',
  // },
  // {
  //   value: 'Yearly',
  //   label: 'Yearly',
  // },
];
interface Pet {
  petid: string;  // or string
  name: string;
  // other properties
}
const CreateReminderScreen = () => {
  const navigation = useNavigation<any>();

  const { createPetSchedule } = usePetSchedule();
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  const { pets, isLoading, getPets } = usePet() as { pets: Pet[], isLoading: boolean, getPets: () => void };
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [repeatValue, setRepeatValue] = useState<string | null>(null);
  const [petChoose, setPetChoose] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [petFocus, setPetFocus] = useState(false);
  const [endOption, setEndOption] = useState<'On' | 'Never'>('Never');
  const [endDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  useEffect(() => {
    getPets();
  }, []);

  const petData = pets?.map((pet) => ({ label: pet.name, value: pet.petid }));

  const renderLabelRepeat = () => {
    if (repeatValue || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Event repeat
        </Text>
      );
    }
    return null;
  };

  const renderLabelPet = () => {
    if (petChoose || petFocus) {
      return (
        <Text style={[styles.label, petFocus && { color: 'blue' }]}>
          For Pet
        </Text>
      );
    }
    return null;
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || date;
      setDate(currentDate);
    }
    setShowDatePicker(false);
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    if (event.type === 'set') {
      const currentTime = selectedTime || time;
      setTime(currentTime);
    }
    setShowTimePicker(false);
  };

  const onEndDateChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || endDate;
      setEndDate(currentDate);
    }
    setShowEndDatePicker(false);
  }

  const formatDateTime = (date: Date | null, time: Date | null): string | null => {
    if (!date || !time) return null;
    const utcDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      time.getSeconds()
    );
    return utcDate.toISOString();
  };

  const formatDate = (date: Date | null): string | null => {
    if (!date) return null;
    const utcDate = new Date(Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    ));
    return utcDate.toISOString().split('T')[0];
  };

  // const formatDateTime = (date: Date | null, time: Date | null) => {
  //   if (!date || !time) return null;
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  //   const day = String(date.getDate()).padStart(2, '0');

  //   const hours = String(time.getHours()).padStart(2, '0');
  //   const minutes = String(time.getMinutes()).padStart(2, '0');
  //   const seconds = String(time.getSeconds()).padStart(2, '0');
  //   return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  // };

  // const formatDate = (date: Date | null): string | null => {
  //   if (!date) return null;
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  //   const day = String(date.getDate()).padStart(2, '0');
  //   return `${year}-${month}-${day}`;
  // };

  const reminder_datetime = formatDateTime(date, time);
  const end_date = formatDate(endDate);


  const handleSubmit = () => {
    // const end_type = endOption === 'On';
    const data = {
      petid: petChoose,
      title: title,
      notes: notes,
      end_type: endOption,
      reminder_datetime,
      event_repeat: repeatValue,
      end_date
    }
    createPetSchedule(data);
    // Clear the form
    setTitle('');
    setNotes('');
    setDate(null);
    setTime(null);
    setEndOption('Never');
    setRepeatValue(null);
    setPetChoose(null);
    setEndDate(null);
  }

  return (
    <View>

      <View style={styles.inputContainer}>
        <Text >Title</Text>
        <TextInput
          value={title}
          style={styles.inputText}
          placeholder='Reminder me to'
          onChangeText={(text) => setTitle(text)}
        >
        </TextInput>
      </View>

      <View style={styles.multiContainer}>
        {/* <View style={{ padding: 10 }}> */}
          {renderLabelPet()}
          <Dropdown
            style={[styles.dropdown, petFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={petData}
            search
            maxHeight={300}
            labelField='label'
            valueField="value"
            placeholder={!petFocus ? 'For pet' : '...'}
            searchPlaceholder="Search..."
            value={petChoose}
            onFocus={() => setPetFocus(true)}
            onBlur={() => setPetFocus(false)}
            onChange={item => {
              setPetChoose(item.value);
              setPetFocus(false);
            }}
            renderLeftIcon={() => (
              <Icon
                style={styles.icon}
                color={petFocus ? 'blue' : 'black'}
                name="event-repeat"
                size={20}
              />
            )}
          />
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.dateContainer}>
          <View style={styles.dateBox}>
            <TouchableOpacity style={{ flexDirection: 'column', gap: 5 }} onPress={() => setShowDatePicker(true)}>
              <Text>
                {`Date:`}
              </Text>
              <Text>
                {` ${date ? date.toLocaleDateString() : ''}`}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date || new Date()}
                mode='date'
                display='default'
                onChange={onDateChange}
              />
            )}
          </View>
        </View>


        <View style={styles.dateContainer}>
          <View style={styles.timeBox}>
            <TouchableOpacity style={{ flexDirection: 'column', gap: 5 }} onPress={() => setShowTimePicker(true)}>
              <Text>
                {`Time:`}
              </Text>
              <Text>
                {`${time ? time.toLocaleTimeString() : ''}`}
              </Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={time || new Date()}
                mode='time'
                display='default'
                onChange={onTimeChange}
              />
            )}
          </View>
        </View>

      </View>



      <View style={{ padding: 10 }}>
        {renderLabelRepeat()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={repeatData}
          search
          maxHeight={300}
          labelField='label'
          valueField="value"
          placeholder={!isFocus ? 'Event repeat' : '...'}
          searchPlaceholder="Search..."
          value={repeatValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setRepeatValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <Icon
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="event-repeat"
              size={20}
            />
          )}
        />
      </View>
      {repeatValue && repeatValue !== 'NONE' && (<View style={styles.endContainer}>
        <Text>Ends</Text>

        <View style={styles.endOptionCon}>
          <TouchableOpacity onPress={() => { setEndOption('Never'); setEndDatePickerVisible(false) }}>
            <Text style={[styles.endOption, endOption === 'Never' && styles.selectedOption]}>Never</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setEndOption('On'); setEndDatePickerVisible(true) }}>
            <Text style={[styles.endOption, endOption === 'On' && styles.selectedOption]}>On</Text>
          </TouchableOpacity>
        </View>

        <View>
          {endDatePickerVisible && (
            <View style={styles.dateEndBox}>
              <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
                <Text>
                  {`End Date:`}
                </Text>
                <Text>
                  {`${endDate ? endDate.toLocaleDateString() : ''}`}
                </Text>
              </TouchableOpacity>
              {showEndDatePicker && (
                <DateTimePicker
                  value={endDate || new Date()}
                  mode='date'
                  display='default'
                  onChange={onEndDateChange}
                />
              )}
            </View>
          )}
        </View>
      </View>)}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputNotes}
          editable
          multiline
          numberOfLines={10}
          maxLength={200}
          placeholder='Notes'
          value={notes}
          onChangeText={(text) => setNotes(text)}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.saveBtn}>Save</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  inputText: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
    width: 'auto',
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 5,
    padding: 10
  },
  dateBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 5,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: 160,
  },
  inputNotes: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
    width: 'auto',
    height: 100,
    textAlignVertical: 'top'
  },

  dateEndBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 5,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: 'auto'
  },
  saveBtn: {
    padding: 10,
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 5,
    width: 100,
    textAlign: 'center'
  },

  timeBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 5,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: 160,
    height: 'auto',
    alignSelf: 'baseline'
  },

  dateContainer: {
    padding: 10,
    // alignItems: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 30,
  },
  endContainer: {
    flexDirection: 'column',
    gap: 10,
    padding: 10,
  },
  endOptionCon: {
    flexDirection: 'row',
    // justifyContent:'space-between',
    gap: 10,
  },
  endOption: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    borderRadius: 8,
    width: 80,
    height: 40,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  selectedOption: {
    backgroundColor: '#C9E6F0',
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    // paddingHorizontal: 8,
  },
  icon: {
    marginRight: 20,
    marginLeft: 10,
  },
  label: {
    // position: 'absolute',
    width: 100,
    backgroundColor: '#F2f2f2',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  selectedInput: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
    color: '#fff',
  },
  unselectedInput: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    color: '#333',
  },
  multiContainer: {
    padding: 10,
  },

  dropdown1: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  placeholderStyle1: {
    fontSize: 16,
  },
  selectedTextStyle1: {
    fontSize: 14,
  },
  iconStyle1: {
    width: 20,
    height: 20,
  },
  inputSearchStyle1: {
    height: 40,
    fontSize: 16,
  },
  icon1: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },

});

export default CreateReminderScreen;