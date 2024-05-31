'use client';
import { CloseCircleOutlined, HomeOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Typography, Result } from "antd";
import dynamic from 'next/dynamic';
import { Suspense, useState } from "react";
import Loading from "../Loading";

const Cart = dynamic(() => import("../components/Cart/cart"), { loading: () => <div>Loading...</div> });
const Navbar = dynamic(() => import("../components/Navbar/navbar"), { loading: () => <div>Loading...</div> });
const { Paragraph, Text } = Typography;

interface FormData {
    name: string;
    message: string;
    email: string;
}

const ContactUs = () => {
    const [form] = Form.useForm<FormData>();
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [showError, setShowError] = useState<string>('');
    const [formData, setFormData] = useState<FormData>({
        name: "",
        message: "",
        email: "",
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
                    message: values.message,
                    email: values.email
                }),
            });

            const data = await response.json();
            if (data.message === "Email sent successfully") {
                setShowSuccess(true);
            } else {
                setShowError(data.message || "Submission Failed");
            }

        } catch (error) {
            console.error('Error:', error);

        } finally {
            setFormData({
                name: "",
                message: "",
                email: "",
            })
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
            <section className="transition-all mx-4 transform ease-in delay-100 sm:container sm:mx-auto mt-32 bg-white border rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 p-4">
                        <div className="mb-4">
                            <HomeOutlined />
                            <span className="font-bold text-base ml-3">Address</span>
                            <div>Surkhet, NP12</div>
                            <div>Birendranagar 06</div>
                        </div>
                        <div className="mb-4">
                            <PhoneOutlined />
                            <span className="font-bold text-base ml-3">Phone</span>
                            <div>+0098 9893 5647</div>
                            <div>+0096 3434 5678</div>
                        </div>
                        <div className="mb-4">
                            <MailOutlined />
                            <span className="font-bold text-base ml-3">Email</span>
                            <div>codinglab@gmail.com</div>
                            <div>info.codinglab@gmail.com</div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 p-4">
                        <div className="text-lg font-bold mb-4">Send us a message</div>
                        <p className="mb-4 text-sm">
                            Visit the Modiste.com Help Center to find answers to common questions, use our online chat and more.
                            You may also contact our customer service team at +855 123 342.
                        </p>
                        <Form
                            layout="vertical"
                            form={form}
                            onFinish={handleSubmit}
                            onValuesChange={handleFormChange}
                            initialValues={formData}
                            className="space-y-4"
                        >
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: "Please enter your full name" }]}
                                className="input">
                                <Input
                                    prefix={<MailOutlined className="text-gray-500" />}
                                    type="email"
                                    placeholder="Email"
                                    className="input-style"
                                />
                            </Form.Item>

                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: "Please enter your full name" }]}
                                className="input">
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
                    </div>
                </div>
            </section>
            {showError && (
                <Modal
                    open={true}
                    okText="OK"
                    onOk={() => setShowError('')}
                >
                    <Result
                        status="error"
                        title="Submission Failed"
                        subTitle="Please check and modify the following information before resubmitting.">

                    </Result>
                </Modal>
            )}

            
            {showSuccess && (
                <Modal
                    open={!!showSuccess}
                    title="Success"
                    okText="OK"
                    onOk={() => setShowSuccess(false)}>
                    <Result
                        status="success"
                        title="Successfully Purchased Cloud Server ECS!"
                        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."

                    />
                </Modal>
            )}
        </Suspense>

    );
};

export default ContactUs;
