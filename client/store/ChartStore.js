import { EventEmitter } from 'events';
import Dispatcher from '../actionCreator/Dispatcher';
import ActionTypes from '../actionTypes/ChartActionTypes';

class ChartStore extends EventEmitter {
    
    constructor() {
        super();
        this.chartState = {
            errorMessage: true,
            chartParams: {
                startDate: null, 
                endDate: null, 
                showOpts: true, 
                showRecepients: true,
            },
            chartData: null
        }
        this.chartData = null;
        Dispatcher.register(this.registerToActions.bind(this));
    }

    registerToActions(action) {
        switch(action.actionType) {
            case ActionTypes.CHART_FETCH_START:
                this.chartState.chartParams = action.payload;
                this.chartState.errorMessage = null;
                this.emit(action.actionType);
            break;
            case ActionTypes.CHART_FETCH_ERROR:
                this.chartState.errorMessage = actions.payload;
                this.emit(action.actionType);
            break;
            case ActionTypes.CHART_FETCH_SUCCESS:
                this.chartData = action.payload;
                this.emit(action.actionType);
            break;
        }
    }

     // Hooks a React component's callback to the CHANGED event.
    addChangeListener(event, callback) {
        this.on(event, callback);
    }
 
    // Removes the listener from the CHANGED event.
    removeChangeListener(event, callback) {
        this.removeListener(event, callback);
    }
}

export default new ChartStore();