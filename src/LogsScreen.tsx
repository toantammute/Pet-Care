import { View, Text, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useLog from '../hooks/useLog';
import PetPlanCard from '../components/pet/PetPlanCard';
import SplashScreen from './SplashScreen';
import { useFocusEffect, useRoute } from '@react-navigation/native';

interface Log {
    pet_id: string;
    log_id: string;
    date_time: string; // ISO 8601 format
    title: string;
    notes: string;
}

// Define a type for the sections
interface LogSection {
    date: string;
    items: Log[];
}

const LogsScreen = () => {
    const route = useRoute();
    const { petid } = route.params as { petid: string };

    // Adjust the types according to your useLog hook
    const { getLogsbyPet, logLoading, logs, deletePetLog, updatePetLog } = useLog();
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        useCallback(() => {
            console.log('Screen focused, fetching logs');
            getLogsbyPet(petid, null, null);
        }, [])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await getLogsbyPet(petid, null, null);
        setRefreshing(false);
    };

    // Memoized sectioning logic
    const sections: LogSection[] = useMemo(() => {
        if (!logs) return [];

        const sectionsMap: Record<string, Log[]> = logs.reduce((acc, item) => {
            const date = new Date(item.date_time).toLocaleDateString(); // Get 'YYYY-MM-DD'
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(item);
            return acc;
        }, {} as Record<string, Log[]>);

        return Object.entries(sectionsMap)
            .map(([date, items]) => ({
                date,
                items,
            }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [logs]);

    if (logLoading) {
        return (
            <SplashScreen />
        );
    }

    return (
        <ScrollView style={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh} />
            }>
            {sections.map(section => (
                <View key={section.date} style={styles.section}>
                    <Text style={styles.dateHeader}>{section.date}</Text>
                    {section.items.map(item => (
                        <PetPlanCard
                            key={item.log_id}
                            log={item}
                            deletePetLog={deletePetLog}
                            refreshLogs={onRefresh}
    
                        />
                    ))}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 12,
        paddingRight: 12,
        // padding: 12,
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    section: {
        // marginBottom: 15,
    },
    dateHeader: {
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 10,
    },
    logItem: {
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#f4f4f4',
        borderRadius: 8,
    },
});

export default LogsScreen;

function setRefreshing(arg0: boolean) {
    throw new Error('Function not implemented.');
}
