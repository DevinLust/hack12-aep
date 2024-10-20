import React, { useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';


import {
    View,
    StyleSheet,
    Animated,
    Easing,
    Dimensions,
    Text,
    Keyboard,
    TouchableWithoutFeedback,
    Modal,
    Pressable,
    Image,
} from 'react-native';
import { Button, TextInput, Title } from 'react-native-paper';
import CategorySelector from '../components/CategorySelector';
import * as ImagePicker from 'expo-image-picker';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const FormScreen = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false); // Initialize showDatePicker state
    const [freeText, setFreeText] = useState('');
    const [image, setImage] = useState(null); // Store the image URI
    const [imageName, setImageName] = useState(''); // Store the image name
    const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
    const [isSubmitted, setIsSubmitted] = useState(false); // State to handle submission
    const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current; // Start red screen off-screen below
    const checkmarkAnim = useRef(new Animated.Value(0)).current; // Checkmark animation reference

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false); // Close the date picker once the date is selected
        setDate(currentDate);
    };

    const openCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // Ensure the image is selected and not canceled
        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            const imageName = imageUri.split('/').pop(); // Extract the image name from the URI
            setImage(imageUri); // Set the image URI
            setImageName(imageName); // Set the image name
        }
    };

    // Handle form submission
    const handleSubmit = () => {
        Keyboard.dismiss(); // Hide the keyboard when submitting the form

        // Start slide animation and display checkmark
        Animated.sequence([
            // Slide the red background in from the bottom (off-screen to on-screen)
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            // Animate the checkmark after red screen slides in
            Animated.timing(checkmarkAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.delay(1000), // Pause for checkmark to be visible
            // Slide the red background back out
            Animated.timing(slideAnim, {
                toValue: SCREEN_HEIGHT, // Slide the red screen back down off-screen
                duration: 500,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            // Reset the checkmark animation
            Animated.timing(checkmarkAnim, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Reset form and state after animation completes
            setName('');
            setDate(new Date());
            setFreeText('');
            setImage(null); // Reset the image as well
            setImageName('');
            setIsSubmitted(false);
        });

        // Trigger the checkmark animation
        setIsSubmitted(true);
    };

    // Show the modal with the image
    const showImageModal = () => {
        setIsModalVisible(true);
    };

    // Remove the image
    const removeImage = () => {
        setImage(null);
        setImageName('');
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/* Form Content */}
                <Title style={styles.title}>Worker Safety Form</Title>

                {/* Name Field */}
                <TextInput
                    label="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={[styles.input, styles.inputBg]}
                />

                {/* Date Selector */}
                <Button onPress={() => setShowDatePicker(true)} style={styles.input}>
                    Select Date: {date.toLocaleDateString()}
                </Button>
                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}

                {/* Category Selector */}
                <CategorySelector />

                {/* Free-form Text Box */}
                <TextInput
                    label="Comments"
                    value={freeText}
                    onChangeText={(text) => setFreeText(text)}
                    multiline
                    numberOfLines={4}
                    style={[styles.input, styles.inputBg]}
                />

                {/* Camera Input */}
                <Button mode="contained" onPress={openCamera} style={styles.input}>
                    Add a photo
                </Button>

                {/* Show bar with image name and an "X" */}
                {image && (
                    <View style={styles.imageBar}>
                        <Pressable style={styles.imageBarTextContainer} onPress={showImageModal}>
                            <Text style={styles.imageBarText}>Image Uploaded</Text>
                        </Pressable>
                        <Pressable onPress={removeImage}>
                            <Ionicons name="close" size={24} color="gray" />
                        </Pressable>
                    </View>
                )}

                {/* Submit Button */}
                <Button mode="contained" onPress={handleSubmit} style={{ marginTop: 24 }}>
                    Submit
                </Button>

                {/* Modal to show the image */}
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Pressable style={styles.modalOverlay} onPress={() => setIsModalVisible(false)} />
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{imageName}</Text>
                            <Image source={{ uri: image }} style={styles.modalImage} />
                        </View>
                    </View>
                </Modal>

                {/* Sliding Red Screen (Initially Hidden Off-Screen) */}
                <Animated.View
                    style={[
                        styles.animatedBackground,
                        {
                            transform: [
                                {
                                    translateY: slideAnim, // Slide from bottom to top
                                },
                            ],
                        },
                    ]}
                >
                    {/* Checkmark Animation */}
                    {isSubmitted && (
                        <View style={styles.checkmarkContainer}>
                            <View style={styles.circle}>
                                <Animated.Text style={styles.checkmarkText}>
                                    ✓
                                </Animated.Text>
                            </View>
                        </View>
                    )}
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        position: 'relative',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        marginBottom: 20,
    },
    inputBg: {
        backgroundColor: '#f0f0f0',
    },
    imageBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#e0e0e0',
        marginVertical: 10,
        borderRadius: 5,
    },
    imageBarTextContainer: {
        flex: 1,
    },
    imageBarText: {
        fontSize: 16,
        color: 'black',
    },
    removeText: {
        color: 'red',
        fontSize: 18,
        marginLeft: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalOverlay: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    modalImage: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    animatedBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: 'darkred',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkContainer: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.2,
    },
    circle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'darkred',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 5,
    },
    checkmarkText: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    },
});

export default FormScreen;
