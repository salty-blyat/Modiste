import { Button, Form, Input, Modal, Radio } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { useAppContext } from '../../Context';
import { useAuthContext } from '../../Context/auth';
import SuccessModal from '../../Modals/successModal';

interface ConfirmCartModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
}



const ConfirmCartModal: React.FC<ConfirmCartModalProps> = ({ isModalOpen, closeModal }) => {
    const { user } = useAuthContext();
    const { handleCheckout } = useAppContext();
    const [selectPaymentMethod, setSelectPaymentMethod] = useState<string>('cash');
    const [form] = useForm();
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // State to control success modal


    const handleFinish = async () => {
        const checkoutResult: any = await handleCheckout();
        if (checkoutResult && checkoutResult.message === 'Stock decremented and cart updated successfully') {
            setIsSuccessModalOpen(true); // Open SuccessModal if checkout is successful
        }
        closeModal(); // Close the payment confirmation modal
        form.resetFields(); // Reset the form fields
    };


    return (
        <>
            <Modal
                title="Confirm Payment"
                open={isModalOpen} // Use 'visible' instead of 'open' 
                onCancel={closeModal}
                footer={[
                    <div className='flex justify-end items-center py-2.5 '>
                        <Button key="cancel" onClick={closeModal}>
                            Cancel
                        </Button>,
                        <Button key="confirm" className=' rounded text-white text-sm font-semibold border-none outline-none bg-[#333] hover:bg-[#222]' onClick={form.submit}>
                            Confirm Payment
                        </Button>
                    </div>,
                ]}
            >
                <Form
                    form={form}
                    onFinish={handleFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="paymentMethod"
                        label="Payment Method"
                    >
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



            <SuccessModal visible={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} />
        </>
    );
};

export default ConfirmCartModal;
