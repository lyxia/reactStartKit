// Greeter.js
import React, {Component} from 'react'
import { DatePicker } from 'antd';
import styles from './Greeter.css';//导入
import config from './config.json';

class Greeter extends Component{
    render() {
        return (
            <div>
                <div className={styles.root}>
                    {config.greetText}
                </div>
                <DatePicker/>
            </div>
        );
    }
}

export default Greeter