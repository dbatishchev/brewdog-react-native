import React, {Component} from 'react';
import {ActivityIndicator, Image, ListView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import BrewdogAPI from './../api/brewdog';

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

export default class BeerList extends Component {

    static navigationOptions = {
        title: 'Brewdog Beers List',
    };

    constructor(props) {
        super(props);
        this.beers = [];
        this.state = {
            page: 1,
            isLoading: true,
            promise: null,
            ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id}),
            canLoadMore: true,
        };
        this.fetch = this.fetch.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    componentWillMount() {
        this.fetch();
    }

    fetch() {
        const state = this.state;
        const page = state.page;
        const countPerPage = 20;

        if (state.promise || state.canLoadMore === false) {
            return;
        }

        const promise = BrewdogAPI.getBrewList(page, countPerPage).then((res) => {
            if (!res || !res.data || res.data.length === 0) {
                state.canLoadMore = false;
                this.setState(state);
                return;
            }
            this.beers = this.beers.concat(res.data);
            this.setState({
                ds: this.state.ds.cloneWithRows(this.beers),
                isLoading: false,
                page: page + 1,
                promise: null,
                canLoadMore: true,
            });
        }).catch(() => {
            state.canLoadMore = false;
            this.setState(state);
        });

        state.promise = promise;
        state.isLoading = true;
        this.setState(state);
    }

    rowPressed(beerId) {
        const {navigate} = this.props.navigation;
        navigate('Details', {id: beerId});
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight
              onPress={() => this.rowPressed(rowData.id)}
              underlayColor="#dddddd"
            >
                <View>
                    <View style={styles.rowContainer}>
                        <Image style={styles.thumb} resizeMode="contain" source={{uri: rowData.image_url}}/>
                        <View style={styles.textContainer}>
                            <Text
                              style={styles.title}
                              numberOfLines={1}
                            >{rowData.name}</Text>
                            <Text style={styles.price}>ABV: {rowData.abv}; IBU: {rowData.ibu}</Text>
                            <Text style={styles.price} numberOfLines={1}>{rowData.description}</Text>
                        </View>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        const isLoading = this.state.isLoading;

        return (
            <View>
                <ListView
                  renderScrollComponent={props => <InfiniteScrollView {...props} />}
                  canLoadMore={this.state.canLoadMore}
                  onLoadMoreAsync={this.fetch}
                  dataSource={this.state.ds}
                  renderRow={this.renderRow}
                />
                {isLoading &&
                <ActivityIndicator
                  animating
                  style={[styles.centering, {height: 80}]}
                  size="large"
                />
                }
            </View>
        );
    }
}
