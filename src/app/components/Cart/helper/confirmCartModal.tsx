import { Button, Form, Input, Modal, Radio } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { useAppContext } from '../../Context';
import { useAuthContext } from '../../Context/auth';

interface ConfirmCartModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    confirmPayment: (paymentMethod: string) => void;
}

const ConfirmCartModal: React.FC<ConfirmCartModalProps> = ({ isModalOpen, closeModal }) => {
    const { user } = useAuthContext();
    const { handleCheckout } = useAppContext();
    const [selectPaymentMethod, setSelectPaymentMethod] = useState<string>('cash');
    const [form] = useForm();

    const handleFinish = (values: any) => {
        console.log('Received values:', values);
        handleCheckout();
        closeModal(); // Update transaction success state
        form.resetFields(); // Clear the form fields
    };

    return (
        <Modal
            title="Confirm Payment"
            visible={isModalOpen}
            onCancel={closeModal}
            footer={[
                <Button key="cancel" onClick={closeModal}>
                    Cancel
                </Button>,
                <Button key="confirm" type="primary" onClick={form.submit}>
                    Confirm Payment
                </Button>,
            ]}
        >
            <Form
                form={form}
                onFinish={handleFinish}
                layout="vertical"
            >
                <Form.Item
                    name="paymentMethod"
                    label="Payment Method"  >
                    <Radio.Group defaultValue="cash" onChange={(e) => setSelectPaymentMethod(e.target.value)}>
                        <Radio value="cash">Cash on Hand</Radio>
                        <Radio value="creditCard">Credit Card</Radio>
                    </Radio.Group>
                </Form.Item>
                {selectPaymentMethod === 'creditCard' && (
                    <>
                        <Form.Item
                            name="cardNumber"
                            label="Card Number"
                            rules={[{ required: true, message: 'Please enter your card number' }]}
                        >
                            <Input placeholder="Enter card number" />
                        </Form.Item>
                        <Form.Item
                            name="cardHolder"
                            label="Card Holder"
                            initialValue={user?.user_name}
                            rules={[{ required: true, message: 'Please enter the card holder name' }]}
                        >
                            <Input placeholder="Enter card holder name" />
                        </Form.Item>
                        <Form.Item
                            name="expirationDate"
                            label="Expiration Date"
                            rules={[{ required: true, message: 'Please enter the expiration date' }]}
                        >
                            <Input placeholder="Enter expiration date" />
                        </Form.Item>
                    </>
                )}
            </Form>
        </Modal>
    );
};

export default ConfirmCartModal;
