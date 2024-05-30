import React, { useState, useEffect } from 'react';
import { Input, Button, Tabs, message, Spin, Form, Typography } from 'antd';
import { checkAdminPassword } from '../components/Db';
import AdminUser from './AdminUser';
import AdminParam from './AdminParam';
import AdminHistorique from './AdminHistorique';
import { PoweroffOutlined } from '@ant-design/icons';



const { TabPane } = Tabs;
const { Title } = Typography;

const Admin = () => {
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [adminInfo, setAdminInfo] = useState(null);
    const [errorTimeout, setErrorTimeout] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleCodeSubmit = async (values) => {
        setLoading(true);
        const { code } = values;
        const result = await checkAdminPassword(code);
        setLoading(false);
        if (result.status) {
            setIsAuthenticated(true);
            setAdminInfo(result.data); // Store the admin information
        } else {
            message.error(result.message);
            setErrorTimeout(true);
            setCountdown(3);
        }
    };

    useEffect(() => {
        let timer;
        if (errorTimeout && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);
        } else if (countdown === 0) {
            setErrorTimeout(false);
        }
        return () => clearTimeout(timer);
    }, [errorTimeout, countdown]);

    return (
        <div>
            {!isAuthenticated ? (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    textAlign: 'center'
                }}>
                    <Form
                        onFinish={handleCodeSubmit}
                        style={{ width: '300px' }}
                    >
                        <Title level={2}>Administrateur</Title>
                        <Form.Item
                            name="code"
                            rules={[{ required: true, message: 'Code obligatoire' }]}
                        >
                            <Input.Password
                                placeholder="Enter code"
                                disabled={errorTimeout}
                                visibilityToggle={{
                                    visible: passwordVisible,
                                    onVisibleChange: setPasswordVisible,
                                }}
                            />
                        </Form.Item>
                        <Form.Item>
                            {errorTimeout ?
                                <p>Réessayer ({countdown}s)</p>
                                :
                                (<Button
                                    type="primary"
                                    htmlType="submit"
                                    disabled={loading || errorTimeout}
                                >
                                    {loading ? <Spin /> : 'Entrer'}
                                </Button>)}

                        </Form.Item>
                    </Form>

                </div>
            ) : (
                <div style={{ padding: '0 20px 20px 20px' }}>
                    <Title level={2}>Administrateur</Title>
                    <Title level={5}>
                        <Button
                            type="primary"
                            style={{marginRight:"8px"}}
                            icon={<PoweroffOutlined />}
                            onClick={() => setIsAuthenticated(false)}
                            danger
                        />
                        # {adminInfo?.nom}
                    </Title>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Utilisateur" key="1">
                            <AdminUser />
                        </TabPane>
                        <TabPane tab="Paramètre" key="2">
                            <AdminParam />
                        </TabPane>
                        <TabPane tab="Historiques" key="3">
                            <AdminHistorique />
                        </TabPane>
                    </Tabs>
                </div>
            )}
        </div>
    );
};

export default Admin;
