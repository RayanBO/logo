import React, { useState, useEffect } from 'react';
import { List, Form, Input, Button, Row, Col, Typography, DatePicker, Select, message, Spin } from 'antd';
import dayjs from 'dayjs';
import { getAllUsers, signupUser, updateUser, deleteUser } from '../components/Db';

const { Title } = Typography;
const { Option } = Select;

const AdminUser = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const usersData = await getAllUsers();
            setUsers(usersData);
            setLoading(false);
        };
        fetchUsers();
    }, []);

    const onUserSelect = (user) => {
        setSelectedUser(user);
        form.setFieldsValue({
            ...user,
            datenais: dayjs(user.datenais),
        });
    };

    const onFinish = async (values) => {
        setLoading(true);
        const userData = { ...values, datenais: values.datenais.format('YYYY-MM-DD') };
        if (selectedUser) {
            await updateUser(selectedUser.id, userData);
        } else {
            await signupUser(userData);
        }
        setLoading(false);
        form.resetFields();
        setSelectedUser(null);
        const usersData = await getAllUsers();
        setUsers(usersData);
    };

    const onDelete = async (userId) => {
        setLoading(true);
        await deleteUser(userId);
        setLoading(false);
        const usersData = await getAllUsers();
        setUsers(usersData);
    };

    const onNewUser = () => {
        form.resetFields();
        setSelectedUser(null);
    };

    return (
        <Row gutter={16}>
            <Col span={8}>
                <Title level={4}>Liste des utilisateurs</Title>
                {loading ? <Spin /> : (
                    <List
                        bordered
                        dataSource={users}
                        renderItem={(user) => (
                            <List.Item
                                onClick={() => onUserSelect(user)}
                                style={{ cursor: 'pointer', backgroundColor: selectedUser?.id === user.id ? '#e6f7ff' : 'white' }}
                            >
                                <div>
                                    <strong>{user.nomprenom}</strong>
                                    <div>{user.datenais}</div>
                                    <div>{user.service}</div>
                                </div>
                                <Button type="link" onClick={() => onDelete(user.id)}>Supprimer</Button>
                            </List.Item>
                        )}
                        style={{ maxHeight: '400px', overflowY: 'auto' }}
                    />
                )}
            </Col>
            <Col span={16}>
                <Title level={4}>{selectedUser ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur'}</Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {selectedUser ? 'Mettre à jour' : "Valider l'Ajouter"}
                        </Button>
                        <Button type="default" onClick={onNewUser} style={{ marginLeft: '10px' }}>
                            Nouvel utilisateur
                        </Button>
                        {selectedUser && (
                            <Button danger onClick={() => onDelete(selectedUser.id)} style={{ marginLeft: '10px' }}>
                                Supprimer l'utilisateur
                            </Button>
                        )}
                    </Form.Item>
                    <Form.Item
                        name="nomprenom"
                        label="Nom complet"
                        rules={[{ required: true, message: 'Veuillez entrer le nom complet' }]}
                    >
                        <Input placeholder="Entrez le nom complet" />
                    </Form.Item>
                    <Form.Item
                        name="datenais"
                        label="Date de naissance"
                        rules={[{ required: true, message: 'Veuillez sélectionner la date de naissance' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="service"
                        label="Service"
                        rules={[{ required: true, message: 'Veuillez sélectionner le service' }]}
                    >
                        <Select placeholder="Sélectionnez un service">
                            <Option value="RH">RH</Option>
                            <Option value="IT">IT</Option>
                            <Option value="Finance">Finance</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="login"
                        label="Identifiant"
                        rules={[{ required: true, message: 'Veuillez entrer l\'identifiant' }]}
                    >
                        <Input placeholder="Entrez l'identifiant" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Veuillez entrer l\'email' }]}
                    >
                        <Input placeholder="Entrez l'email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Mot de passe"
                        rules={[{ required: true, message: 'Veuillez entrer le mot de passe' }]}
                    >
                        <Input.Password placeholder="Entrez le mot de passe" />
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default AdminUser;
