import React from 'react';
import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
    heading: {
        backgroundColor: '#F8F8F8',
    },
    separator: {
        height: 1,
        backgroundColor: '#DDDDDD',
    },
    image: {
        height: 200,
        marginTop: 20,
        marginBottom: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        margin: 5,
        color: '#656565',
    },
    description: {
        fontSize: 18,
        margin: 5,
        color: '#656565',
    },
    numbers: {
        fontWeight: 'bold',
        fontSize: 18,
        margin: 5,
        color: '#656565',
    },
    malt: {
        fontSize: 18,
        margin: 5,
        color: '#656565',
    },
    hops: {
        fontSize: 18,
        margin: 5,
        color: '#656565',
    },
    food: {
        fontSize: 18,
        margin: 5,
        color: '#656565',
    },
});

const BeerDetails = () => {
    const data = this.props.data;

    if (!data) {
        return (
            <ActivityIndicator
              animating
              style={[styles.centering, {height: 80}]}
              size="large"
            />
        );
    }

    let food = '';
    let malt = '';
    let hops = '';

    if (data) {
        food = data.food_pairing.join(', ');
        malt = data.ingredients.malt.map(item => `${item.name}, ${item.amount.value} ${item.amount.unit}`).join('; ');
        hops = data.ingredients.hops.map(item => `${item.name}, ${item.amount.value} ${item.amount.unit}`).join('; ');
    }

    return (
        <ScrollView style={styles.container}>
            {data ? (
                <View style={styles.container}>
                    <Text style={styles.title}>{data.name}</Text>
                    <Text style={styles.description}>{data.description}</Text>
                    <Text style={styles.numbers}>ABV: {data.abv}; IBU: {data.ibu}</Text>
                    <Image
                      resizeMode="contain"
                      style={styles.image}
                      source={{uri: data.image_url}}
                    />
                    <Text style={styles.malt}>Malt: {malt}</Text>
                    <Text style={styles.hops}>Hops: {hops}</Text>
                    <Text style={styles.food}>Food: {food}</Text>
                </View>
                ) : (
                    <ActivityIndicator
                      animating
                      style={[styles.centering, {height: 80}]}
                      size="large"
                    />
                )}
        </ScrollView>
    );
};

export default BeerDetails;
