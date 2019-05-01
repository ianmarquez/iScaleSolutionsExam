import * as React from 'react';
import {
    DatePicker,
    Switch,
    Form
} from 'antd';
import ChartActionCreator from '../actionCreator/ChartActionCreator';

const { RangePicker } = DatePicker;
const defaultDateFormat = 'YYYY-MM-DD';

class ChartSettings extends React.Component {
    state = {
        startDate: null,
        endDate: null,
        showOptins: true,
        showRecepients: true,
    };

    constructor(props) {
        super(props);
        this.onDateChange = this.onDateChange.bind(this);
        this.onOptionsChange = this.onOptionsChange.bind(this);
        this.onRecepientsChange = this.onRecepientsChange.bind(this);
    }

    onDateChange(e) {
        this.setState({
            startDate: e[0].format(defaultDateFormat),
            endDate: e[1].format(defaultDateFormat),
        },() => {
            ChartActionCreator.fetchChatData(this.state);
        });
    }
    
    onOptionsChange(e) {
        this.setState({
            showOptins: e
        },() => {
            if(this.state.startDate !== null && this.state.endDate !== null) {
                ChartActionCreator.fetchChatData(this.state);
            }
        })
    }

    onRecepientsChange(e) {
        this.setState({
            showRecepients: e
        },() => {
            if(this.state.startDate !== null && this.state.endDate !== null) {
                ChartActionCreator.fetchChatData(this.state);
            }
        })
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        }
        const controlSize = 'small';
        return <Form layout={'horizontal'}> 
            <Form.Item label="Date Range" {...formItemLayout}>
                <RangePicker onChange={this.onDateChange} size={controlSize}/>
            </Form.Item>
            <Form.Item label="Show Optins" {...formItemLayout}>
                <Switch defaultChecked onChange={this.onOptionsChange} />
            </Form.Item>
            <Form.Item label="Show Receipients" {...formItemLayout}>
                <Switch defaultChecked onChange={this.onRecepientsChange} />
            </Form.Item>
        </Form>
    }
}

export default ChartSettings;