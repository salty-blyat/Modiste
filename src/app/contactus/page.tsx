'use client';
import { UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import { Suspense, useState } from "react";
import dynamic from 'next/dynamic';
import Loading from "../Loading";

const Cart = dynamic(() => import("../components/Cart/cart"), { loading: () => <div>Loading...</div> });
const Navbar = dynamic(() => import("../components/Navbar/navbar"), { loading: () => <div>Loading...</div> });

interface FormData {
    name: string;
    message: string;
}

const ContactUs = () => {
    const [form] = Form.useForm<FormData>();
    const [formData, setFormData] = useState<FormData>({
        name: "",
        message: "",
    });
    const [loading, setLoading] = useState<boolean>(false); // State for form submission loading

    const handleSubmit = async (values: FormData) => {
        try {
            setLoading(true); // Set loading state to true during form submission
    
            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: values.name,
                    message: values.message
                }),
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Success:', data); 
    
            // Provide feedback to the user that their message was sent successfully 
            // This could be a success message or any other appropriate feedback
    
        } catch (error) {
            console.error('Error:', error);
            // Provide feedback to the user that there was an error sending the message
            // You can display an error message or retry option
        } finally {
            setLoading(false); // Reset loading state after form submission
        }
    };

    const handleFormChange = (changedValues: any, allValues: FormData) => {
        setFormData(allValues);
    };

    return (
        <Suspense fallback={<Loading />}>
            <Navbar />
            <Cart />
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <Card title="Contact Us" className="w-full max-w-2xl p-8 rounded-lg shadow-lg">
                    <Form
                        layout="vertical"
                        form={form}
                        onFinish={handleSubmit}
                        onValuesChange={handleFormChange}
                        initialValues={formData}
                        className="space-y-4"
                    >
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: "Please enter your full name" }]}
                            className="input"
                        >
                            <Input
                                prefix={<UserOutlined className="text-gray-500" />}
                                placeholder="Full Name"
                                className="input-style"
                            />
                        </Form.Item>

                        <Form.Item
                            name="message"
                            rules={[{ required: true, message: "Please enter your message" }]}
                            className="input"
                        >
                            <Input.TextArea
                                placeholder="Message"
                                rows={4}
                                className="input-style"
                            />
                        </Form.Item>
                        <Form.Item shouldUpdate className="input">
                            {() => (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full bg-gray-600 text-white font-semibold rounded-md focus:outline-none"
                                    loading={loading} // Show loading indicator while form is submitting
                                    disabled={
                                        !form.isFieldsTouched(true) ||
                                        !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                    }
                                >
                                    Send Message
                                </Button>
                            )}
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </Suspense>
    );
};

export default ContactUs;
