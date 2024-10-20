// HighRiskSummary.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Install via npm if needed

const HighRiskSummary = () => {
    return (
        <View style={styles.summaryBox}>
            <View style={styles.header}>
                <Text style={styles.incidentText}>14 High Risk Incidents this month</Text>
                <Icon name="long-arrow-down" size={24} color="red" style={styles.arrowIcon} />
            </View>
            <Text style={styles.percentageText}>-8% from last month</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    summaryBox: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        width: "90%",
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5, // Android shadow
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    incidentText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    percentageText: {
        fontSize: 16,
        color: "gray",
        marginTop: 10,
    },
    arrowIcon: {
        transform: [{ rotate: "45deg" }], // Squiggly arrow effect

    },
});

export default HighRiskSummary;
