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
    const { log_id, title: initialTitle, notes: initialNotes, date_time: initialDateTime } = route.params as { petid: string; log_id: string; title: string; notes: string; date_time: string; };

    const { pets, isLoading, getPets } = usePet() as { pets: Pet[], isLoading: boolean, getPets: () => void };
    const { createPetLog, updatePetLog } = useLog();

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [title, setTitle] = useState(initialTitle || '');
    const [notes, setNotes] = useState(initialNotes || '');
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<Date | null>(null);
    const isEditing = !!log_id;

    // useEffect(() => {
    //     // Set the date state to the current local date when the component mounts
    //     setDate(new Date());
    // }, []);
    useEffect(() => {
        if (initialDateTime) {
            const dateTime = new Date(initialDateTime);
            setDate(dateTime);
            setTime(dateTime);
        } else {
            // Default to the current date and time if no initialDateTime is provided
            const now = new Date();
            setDate(now);
            setTime(now);
        }
    }, [initialDateTime]);

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
    const date_time = formatDateTime(date, time);

    const handleSubmit = () => {
        console.log('Submitting new log:', { title, notes, date_time });
        const data = {
            pet_id: petid,
            title,
            notes,
            date_time,
        }
        if (log_id) {
            updatePetLog(log_id, data); // Call update function if log_id exists
        } else {
            createPetLog(data); // Otherwise, create a new log
        }
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
                        <Text>Date:</Text>
                        {isEditing ? (
                            <Text>{date ? date.toLocaleDateString() : ''}</Text>
                        ) : (
                            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                <Text>{date ? date.toLocaleDateString() : 'Select Date'}</Text>
                            </TouchableOpacity>
                        )}
                        {showDatePicker && (
                            <DateTimePicker
                                value={date || new Date()}
                                mode='date'
                                display='default'
                                onChange={onDateChange}
                                maximumDate={new Date()}
                            />
                        )}
                    </View>
                </View>

                <View style={styles.dateContainer}>
                    <View style={styles.timeBox}>
                        <Text>Time:</Text>
                        {isEditing ? (
                            <Text>{time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</Text>
                        ) : (
                            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                                <Text>{time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select Time'}</Text>
                            </TouchableOpacity>
                        )}
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