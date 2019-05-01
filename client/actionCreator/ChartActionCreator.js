import Dispatcher from './Dispatcher';
import ChartActionTypes from '../actionTypes/ChartActionTypes';
import Q from 'q';

class ChartActions {
    fetchChatData(paramsObj) {
        let success = (data) => {
            let output = {};
            for(let i = 0; i < data.length; i++) {
                let response = data[i];
                if(response.optins) {
                    output.optins = data[i].optins;
                } else if(response.recipients){
                    output.recipients = data[i].recipients;
                }
            }
            Dispatcher.dispatch({
                actionType: ChartActionTypes.CHART_FETCH_SUCCESS,
                payload: output
            });
        }

        let error = (err) => {
            Dispatcher.dispatch({
                actionType: ChartActionTypes.CHART_FETCH_ERROR,
                payload: err
            });
        }
        
        let promiseArr = [];
        if(paramsObj.showOptins === true) {
            promiseArr.push(fetch(`api/reports/optins.json?from=${paramsObj.startDate}&to=${paramsObj.endDate}`)
            .then((response) => {
                return response.json().then(data => {
                    return {optins: data}
                });
            }));
        }

        if(paramsObj.showRecepients) {
            promiseArr.push(fetch(`api/reports/recipients.json?from=${paramsObj.startDate}&to=${paramsObj.endDate}`)
            .then((response) => {
                return response.json().then(data => {
                    return {recipients: data}
                });
            }));
        }

        if(promiseArr.length > 0) {
            Q.all(promiseArr).then(success).catch(error);
            Dispatcher.dispatch({
                actionType: ChartActionTypes.CHART_FETCH_START,
                payload: paramsObj,
            });
        } else {
            Dispatcher.dispatch({
                actionType: ChartActionTypes.CHART_FETCH_SUCCESS,
                payload: {}
            });
        }
    }
}


export default new ChartActions;