import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import usePet from '../hooks/usePets';
import { useRoute } from '@react-navigation/native';
import useLog from '../hooks/useLog';


interface Pet {
    petid: string;
    name: string;
}


const CreateLogsScreen = () => {
    const route = useRoute();
    const { petid } = route.params as { petid: string };
    console.log(petid);

    const { pets, isLoading, getPets } = usePet() as { pets: Pet[], isLoading: boolean, getPets: () => void };
    const { createPetLog } = useLog();

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        // Set the date state to the current local date when the component mounts
        setDate(new Date());
    }, []);

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

    const formatDateTime = (date: Date | null, time: Date | null): string | null => {
        if (!date || !time) return null;
        const utcDate = new Date(Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            time.getUTCHours(),
            time.getUTCMinutes(),
            time.getUTCSeconds()
        ));
        return utcDate.toISOString();
    };
    const date_time = formatDateTime(date, time);

    const handleSubmit = () => {
        const data = {
            pet_id: petid,
            time,
            notes,
            date_time,
        }
        createPetLog(data);
    };

    return (
        <View>
            <View style={styles.inputContainer}>
                <Text>Title</Text>
                <TextInput
                    style={styles.inputText}
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                    placeholder='Title'
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
                <TouchableOpacity
                    onPress={handleSubmit}>
                    <Text style={styles.saveBtn}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
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
    saveBtn: {
        padding: 10,
        backgroundColor: 'blue',
        color: 'white',
        borderRadius: 5,
        width: 100,
        textAlign: 'center'
    },

    dateContainer: {
        padding: 10,
        // alignItems: 'center'
    },
    rowContainer: {
        flexDirection: 'row',
        gap: 30,
    },
});
export default CreateLogsScreen;