import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const CustomRating = ({ rating }) => {
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(
                    <Image
                        key={i}
                        source={{ uri: 'https://i.postimg.cc/0N3xMyTN/image.png' }}
                        style={styles.star}
                    />
                );
            } else {
                stars.push(
                    <Image
                        key={i}
                        source={{ uri: 'https://i.postimg.cc/k5hMQcbq/image.png' }}
                        style={styles.star}
                    />
                );
            }
        }
        return stars;
    };

    return (
        <View style={styles.ratingContainer}>
            {renderStars()}
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    star: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    ratingText: {
        fontSize: 18,
    },
});

export default CustomRating;
