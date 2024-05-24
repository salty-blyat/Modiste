'use client'
import {
    UserOutlined
} from "@ant-design/icons";
import { Button, DatePicker, Form, Input, TimePicker } from "antd";
import moment from 'moment';
import { useState } from "react";
import Cart from "../components/Cart/cart";
import Navbar from "../components/Navbar/navbar";


const ContactUs = () => {
    const [form] = Form.useForm<FormData>();
    const [formData, setFormData] = useState<FormData>({
        name: "",
        message: "",
        date: null,
        time: ""
    });


    const handleSubmit = async (values: FormData) => {
        try {
            // Ensure values.date and values.time are valid moment objects before formatting
            const formattedDate = values.date ? moment(values.date).format('DD/MM/YYYY') : '';

            let hourOnly = '';
            let minuteOnly = '';
            if (values.time) { // Check if values.time is not null
                // Create a Date object from the string
                const dateTime = new Date(values.time);
                const timeString = dateTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
                const [hours, minutes] = timeString.split(":"); // Split time into hours and minutes
                hourOnly = hours;
                minuteOnly = minutes;
            }

            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: values.name,
                    message: values.message,
                    date: formattedDate,
                    time: `${hourOnly}:${minuteOnly}`, // Sending the time in HH:mm format
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            console.log(data)
            // Additional logic for success response
        } catch (error) {
            console.error('Error:', error);
            // Additional logic for error handling
        }
    };




    const handleFormChange = (changedValues: any, allValues: FormData) => {
        setFormData(allValues);
    };


    return (
        <>
            <Navbar />
            <Cart />
            <div
                id="contact-us"
                className="mt-[20rem]" >
                <div className="custom-screen  md:grid md:grid-cols-2 gap-12">
                    <Form
                        layout="vertical"
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
                                className="bg-gray-200 text-gray-600 placeholder-gray-400 rounded-md py-3 px-4 focus:outline-none"
                                style={{ borderColor: 'transparent', boxShadow: 'none' }}
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
                                className="bg-gray-200 text-gray-600 placeholder-gray-400 rounded-md py-3 px-4 focus:outline-none"
                                style={{ borderColor: 'transparent', boxShadow: 'none' }}
                            />
                        </Form.Item>

                        <Form.Item name="date" className="input">
                            <DatePicker
                                className="w-full bg-gray-200 text-gray-600 rounded-md py-3 px-4 focus:outline-none"
                                inputReadOnly
                                style={{ borderColor: 'transparent', boxShadow: 'none' }}
                            />
                        </Form.Item>

                        <Form.Item name="time" className="input">
                            <TimePicker
                                className="w-full bg-gray-200 text-gray-600 rounded-md py-3 px-4 focus:outline-none"
                                inputReadOnly
                                format="HH:mm"
                                minuteStep={30}
                                onChange={(timeString) => {
                                    // Update the form state with the first element of the timeString array
                                    setFormData({ ...formData, time: Array.isArray(timeString) ? timeString[0] : timeString });
                                }}
                                style={{ borderColor: 'transparent', boxShadow: 'none' }}
                            />
                        </Form.Item>

                        <Form.Item shouldUpdate className="input">
                            {() => (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full bg-gray-600 text-white font-semibold rounded-md focus:outline-none"
                                    disabled={
                                        !form.isFieldsTouched(true) ||
                                        !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                    }
                                    style={{ boxShadow: 'none' }}
                                >
                                    Send Message
                                </Button>
                            )}
                        </Form.Item>
                    </Form>
                </div>
            </div>

        </>

    );

};

export default ContactUs;
