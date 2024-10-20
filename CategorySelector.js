import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Menu } from 'react-native-paper';

const CategorySelector = () => {
    const [visible, setVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Select a Category');

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const categories = ['PPE', 'Traffic Control', 'Personal Safety', 'Job Briefing', 'THA', 'Safety Violation', 'Electrical Hazard', 'Fall Hazard', 'Fire Hazard', 'Chemical Hazard', 'Other'];

    return (
        <View style={styles.container}>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    <Button mode="outlined" onPress={openMenu} style={styles.input}>
                        {selectedCategory}
                    </Button>
                }>
                <ScrollView style={styles.scrollView}>
                    {categories.map((category) => (
                        <Menu.Item
                            key={category}
                            onPress={() => {
                                setSelectedCategory(category);
                                closeMenu();
                            }}
                            title={category}
                        />
                    ))}
                </ScrollView>
            </Menu>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        margin: 10,
    },

    scrollView: {
        maxHeight: 200, // Limit the height to make it scrollable if content exceeds this height
    },
    container: {
        marginBottom: 20,
    },
});

export default CategorySelector;
