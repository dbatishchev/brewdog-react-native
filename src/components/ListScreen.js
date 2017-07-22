import React, {Component} from 'react';
import {ActivityIndicator, ListView, View} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import BrewdogAPI from './../api/brewdog';
import ListItem from './ListItem';

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

        state.promise = BrewdogAPI.getBrewList(page, countPerPage).then((res) => {
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

        state.isLoading = true;
        this.setState(state);
    }

    rowPressed(beerId) {
        this.props.navigation.navigate('Details', {id: beerId});
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
                  renderRow={rowData => <ListItem rowData={rowData} onPress={() => this.rowPressed(rowData.id)} />}
                />
                {isLoading && (
                    <ActivityIndicator
                      animating
                      style={[{height: 80}]}
                      size="large"
                    />
                )}
            </View>
        );
    }
}
