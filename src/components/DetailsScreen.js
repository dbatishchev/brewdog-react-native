import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import BrewdogAPI from './../api/brewdog';
import BeerDetails from './BeerDetails';

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginBottom: 10,
    },
});

export default class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: null,
        };
    }

    componentWillMount() {
        const id = this.props.navigation.state.params.id;
        BrewdogAPI.getBrewDetails(id).then((res) => {
            this.setState({
                isLoading: false,
                data: res.data,
            });
        });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <BeerDetails data={this.state.data} />
            </ScrollView>
        );
    }
}
