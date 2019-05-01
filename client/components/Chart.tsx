import * as React from 'react';
import ChartSettings from './ChartSettings';
import ChartStore from '../store/ChartStore';
import ChartActionTypes from '../actionTypes/ChartActionTypes';
import {VictoryLine, VictoryChart, VictoryTheme, VictoryLegend, VictoryGroup, VictoryAxis} from 'Victory';

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
        console.log(ChartStore.chartState.chartData);
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
        let optins = ChartStore.chartState.chartData ? ChartStore.chartState.chartData.optins: null;
        let recipients = ChartStore.chartState.chartData? ChartStore.chartState.chartData.recipients: null;

        return <div> 
            <Card
                title='Chart Settings' 
                style={cardStyle}>
                <ChartSettings/>
            </Card>
            <Card
                title='Chart' 
                style={cardStyle}>
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={10}
                    scale={{ x: "date", y: "linear" }}
                    style={{fontSize:8}}
                >
                    <VictoryLegend
                        centerTitle
                        orientation="horizontal"
                        data={[
                            { name: 'optins', symbol: { fill: "blue" }},
                            { name: 'recipients', symbol: { fill: "red" }}
                        ]}
                    />
                    <VictoryAxis
                        style={{ axis: { stroke: '#E0F2F1' },
                            tickLabels: { fontSize: 5},
                        }} 
                        dependentAxis
                    />
                    <VictoryAxis
                        style={{ axis: { stroke: '#E0F2F1' },
                            tickLabels: { fontSize: 5}
                        }}
                    />
                    <VictoryGroup>
                        { optins ? <VictoryLine
                            style={{
                                data: { stroke: "blue", strokeWidth: 1}
                            }}
                            data={optins}
                            x="date"
                            y="count"/> : null}

                        { recipients ? <VictoryLine
                            style={{
                                data: { stroke: "red", strokeWidth: 1 }
                            }}
                            data={recipients}
                            x="date"
                            y="count"/>: null}
                    </VictoryGroup>
                </VictoryChart>
            </Card>
        </div>
    }
}

export default Chart;