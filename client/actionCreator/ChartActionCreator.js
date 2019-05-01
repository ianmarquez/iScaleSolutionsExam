import Dispatcher from './Dispatcher';
import ChartActionTypes from '../actionTypes/ChartActionTypes';

class ChartActions {
    fetchChatData(paramsObj) {
        let success = (data) => {
            Dispatcher.dispatch({
                actionType: ChartActionTypes.CHART_FETCH_SUCCESS,
                payload: data
            });
        }

        let error = (err) => {
            Dispatcher.dispatch({
                actionType: ChartActionTypes.CHART_FETCH_ERROR,
                payload: err
            });
        }

        fetch(`api/reports/optins.json?from=${paramsObj.startDate}&to=${paramsObj.endDate}`)
        .then((response) => {
            return response.json();
        }).then(success)
        .catch(error);

        Dispatcher.dispatch({
            actionType: ChartActionTypes.CHART_FETCH_START,
            payload: paramsObj,
        });
    }
}


export default new ChartActions;