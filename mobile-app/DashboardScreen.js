import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Card } from "react-native-elements";
import HighRiskSummary from '../components/HighRiskSummary'; // Import the high risk summary component
import PercentageCircleBox from '../components/PercentageCircleBox'; // Import the circle box component


const DashboardScreen = () => {
    const [expanded, setExpanded] = useState(false); // Drop-down visibility
    const [selectedReport, setSelectedReport] = useState(null); // Modal state
    const [modalVisible, setModalVisible] = useState(false); // Modal visibility

    const categoryData = [
        { category: "Electrical", incidents: 10 },
        { category: "Toxic", incidents: 7 },
        { category: "Fire Hazard", incidents: 5 },
        { category: "Fall Hazard", incidents: 8 },
        { category: "Safety Violation", incidents: 6 },
    ];

    // Dummy data for high-risk reports
    const reports = [
        {
            id: 1,
            name: "John Doe",
            comment: "Unsafe working conditions near power lines.",
            date: "2024-10-18",
            category: "Electrical Hazard",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 2,
            name: "Jane Smith",
            comment: "Improper safety gear being used.",
            date: "2024-10-19",
            category: "Safety Violation",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 3,
            name: "Alice Johnson",
            comment: "No safety barriers near construction site.",
            date: "2024-10-20",
            category: "Fall Hazard",
            image: "https://via.placeholder.com/150",
        },
    ];

    // Toggle drop-down
    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    // Open modal with selected report details
    const openReportModal = (report) => {
        setSelectedReport(report);
        setModalVisible(true);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>




            {/* Recent High Risk Reports */}
            <TouchableOpacity style={styles.box} onPress={toggleExpand}>
                <View style={styles.logoContainer}>
                    <Icon name="exclamation-triangle" size={30} color="red" />
                    <Text style={styles.text}>Recent High Risk Reports</Text>
                </View>
            </TouchableOpacity>

            {/* Drop-down content */}
            {expanded && (
                <View style={styles.dropDown}>
                    {reports.map((report) => (
                        <TouchableOpacity key={report.id} onPress={() => openReportModal(report)}>
                            <Card containerStyle={styles.card}>
                                <Text style={styles.reportDate}>Date: {report.date}</Text>
                                <Text style={styles.reportCategory}>Category: {report.category}</Text>
                            </Card>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {/* Modal for detailed report */}
            {selectedReport && (
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Report Details</Text>
                            <Image source={{ uri: selectedReport.image }} style={styles.image} />
                            <Text style={styles.modalText}>Name: {selectedReport.name}</Text>
                            <Text style={styles.modalText}>Comment: {selectedReport.comment}</Text>
                            <Text style={styles.modalText}>Date: {selectedReport.date}</Text>
                            <Text style={styles.modalText}>Category: {selectedReport.category}</Text>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}

            {/* High Risk Summary Box */}
            {/* <HighRiskSummary /> */}

            {/* <Text style={styles.heading}>This Year:</Text> */}

            {/* Row of Percentage Circle Boxes */}
            {/* <View style={styles.row}>
                <PercentageCircleBox
                    percentage={78}
                    description="78% decrease in electrical incidents"
                    color="green"
                />
                <PercentageCircleBox
                    percentage={26}
                    description="26% increase in toxic incidents"
                    color="red"
                />
            </View> */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 30,
        marginBottom: 0,
        alignSelf: "start",
        marginLeft: 30,
    },
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: "start",
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        marginTop: 20,
    },
    box: {
        width: "90%",
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#f9f9f9",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: "bold",
    },
    dropDown: {
        marginTop: 10,
        width: "90%",
    },
    card: {
        borderRadius: 10,
    },
    reportDate: {
        fontSize: 16,
        fontWeight: "bold",
    },
    reportCategory: {
        fontSize: 14,
        color: "gray",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 5,
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 15,
    },
    closeButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        marginTop: 15,
    },
    closeButtonText: {
        closeButtonText: {
            color: "white",
            fontSize: 16,
        },
    },
});
export default DashboardScreen;
