import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React from "react";

const { confirm } = Modal;

function Confirm() {
    confirm({
        title: 'Do you Want to delete these items?',
        icon: <ExclamationCircleOutlined />,
        content: 'Some descriptions',
        // onOk() {
        //     console.log('OK');
        // },
        onCancel() {
            console.log('Cancel');
        },
    });
}

export default Confirm
