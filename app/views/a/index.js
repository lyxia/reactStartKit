import React, {Component} from 'react'
import {render} from 'react-dom';
import { DatePicker } from 'antd';

class Greeter extends Component{
    render() {
        return (
            <div>
                <DatePicker/>
            </div>
        );
    }
}

render(<Greeter />, document.getElementById('root'));