import * as React from 'react';
import ChartSettings from './ChartSettings';
import ChartStore from '../store/ChartStore';
import ChartActionTypes from '../actionTypes/ChartActionTypes';

import {
    Card,
    message,
} from 'antd';


class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: null,
        }
        this.onFetchStart = this.onFetchStart.bind(this);
        this.onFetchError = this.onFetchError.bind(this);
        this.onFetchSuccess = this.onFetchSuccess.bind(this);
    }

    onFetchStart() {
        let actionMessage = message.loading('Action in progress..', 0);
        setTimeout(actionMessage, 2500);
    }

    onFetchError() {
        message.error(ChartStore.chartState.errorMessage, 10);
    }

    onFetchSuccess() {
        this.setState({
            chartData: ChartStore.chartState.chartData,
        });
    }

    componentDidMount() {
        ChartStore.addChangeListener(ChartActionTypes.CHART_FETCH_START, this.onFetchStart);
        ChartStore.addChangeListener(ChartActionTypes.CHART_FETCH_ERROR, this.onFetchError);
        ChartStore.addChangeListener(ChartActionTypes.CHART_FETCH_SUCCESS, this.onFetchSuccess);
    }

    componentWillUnmount() {
        ChartStore.removeChangeListener(ChartActionTypes.CHART_FETCH_START, this.onFetchStart);
        ChartStore.removeChangeListener(ChartActionTypes.CHART_FETCH_ERROR, this.onFetchError);
        ChartStore.removeChangeListener(ChartActionTypes.CHART_FETCH_SUCCESS, this.onFetchSuccess);
    }

    render() {
        const cardStyle = { 
            margin: '0px 0px 30px 0px',
            padding: '0px 0px 0px 0px',
        }
        return <div> 
            <Card
                title='Chart Settings' 
                style={cardStyle}>
                <ChartSettings/>
            </Card>
            <Card
                title='Chart' 
                style={cardStyle}>
                Chart
            </Card>
        </div>
    }
}

export default Chart;