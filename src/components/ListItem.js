import React from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

const styles = StyleSheet.create({
    thumb: {
        width: 60,
        height: 80,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd',
    },
    title: {
        fontSize: 20,
        color: '#656565',
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10,
    },
});

const ListItem = props => (
    <TouchableHighlight
      onPress={() => props.onPress}
      underlayColor="#dddddd"
    >
        <View>
            <View style={styles.rowContainer}>
                <Image style={styles.thumb} resizeMode="contain" source={{uri: props.rowData.image_url}}/>
                <View style={styles.textContainer}>
                    <Text
                      style={styles.title}
                      numberOfLines={1}
                    >{props.rowData.name}</Text>
                    <Text style={styles.price}>ABV: {props.rowData.abv}; IBU: {props.rowData.ibu}</Text>
                    <Text style={styles.price} numberOfLines={1}>{props.rowData.description}</Text>
                </View>
            </View>
            <View style={styles.separator}/>
        </View>
    </TouchableHighlight>
);

export default ListItem;
