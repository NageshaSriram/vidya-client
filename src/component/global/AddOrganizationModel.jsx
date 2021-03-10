import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import Uploader from '../upload/UploadComponent';

const AddOrganizationForm = ({ visible, onCancel, addOrganization }) => {
    const [form] = Form.useForm();
    const [fileId, setFileId] = useState("");
    const getFileId = (fileId) => {
        setFileId(fileId)
    }
    return (
        <Modal
            visible={visible}
            title="Add Organization"
            okText="Add Organization"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.setFieldsValue({
                    "logo": fileId
                })
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        addOrganization(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                labelCol={{
                    span: 4
                }}
                wrapperCol={{
                    span: 14
                }}
                layout="horizontal"
                initialValues={{
                    size: "large"
                }}
                size="large"
            >
                <Form.Item label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input organization name!' }]}>
                    <Input name="name" />
                </Form.Item>
                <Form.Item label="Logo" name="logo">
                    <Uploader getFileId={getFileId} name="logo" />
                </Form.Item>
            </Form>

        </Modal>
    );
};

const AddOrganizationPage = ({ getFileId, addOrganization }) => {
    const [visible, setVisible] = useState(false);

    const onCreate = (values) => {
        addOrganization(values);
        setVisible(false);
    };

    const setFileId = (fileId) => {
        getFileId(fileId);
    };

    return (
        <div>
            <Button
                type="primary"
                size="large"
                onClick={() => {
                    setVisible(true);
                }}
            >
                Add Organization
        </Button>
            <AddOrganizationForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
                setFileId={setFileId}
                addOrganization={onCreate}
            />
        </div>
    );
};

export default AddOrganizationPage;