import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function TermosUso() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.texto}>
                Termos de uso
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    texto: {
        fontSize: 18,
        textAlign: 'justify',
        marginBottom: 10,
    }
})