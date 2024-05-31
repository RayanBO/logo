import React, { useState, useEffect } from 'react';
import { List, Form, Input, Button, Row, Col, Typography, DatePicker, Select, Skeleton } from 'antd';
import dayjs from 'dayjs';
import { getAllUsers, signupUser, updateUser, deleteUser } from '../components/Db';

const { Title } = Typography;
const { Option } = Select;

const villesMadagascar = [
    "Antananarivo", "Toamasina", "Antsirabe", "Fianarantsoa", "Mahajanga",
    "Toliara", "Antsiranana", "Ambovombe", "Ambatondrazaka", "Manakara",
    "Nosy Be", "Sambava", "Antanifotsy", "Farafangana", "Moramanga",
    "Ambositra", "Antalaha", "Amparafaravola", "Tolanaro", "Ambanja",
    // Ajoutez d'autres villes ici
];

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
        var noReload = false;
        const userData = {
            ...values,
            datenais: values.datenais.format('DD/MM/YYYY'),
            telephone2: values.telephone2 || "",
            ref_salarie: values.ref_salarie || "",
            observation: values.observation || ""
        };
        if (selectedUser) {
            await updateUser(selectedUser.id, userData);
            noReload = true;
        } else {
            await signupUser(userData);
        }
        setLoading(false);
        if (noReload) {
            setUsers(users.map(user => user.id === selectedUser.id ? { ...user, ...userData } : user));
            return;
        };
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
        form.setFieldsValue({
            datenais: dayjs().subtract(20, 'year')
        });
        setSelectedUser(null);
    };

    return (
        <Row gutter={16}>
            <Col span={8}>
                <Title level={4}>Liste des utilisateurs</Title>
                <Skeleton loading={loading}>
                    <List
                        bordered
                        dataSource={users}
                        renderItem={(user) => (
                            <List.Item
                                onClick={() => onUserSelect(user)}
                                style={{ cursor: 'pointer', backgroundColor: selectedUser?.id === user.id ? '#e6f7ff' : 'white' }}
                            >
                                <div>
                                    <strong>{user.nomprenom}</strong> | {user.datenais} {user.ref_salarie ? (' | ' + user.ref_salarie) : ('')}
                                    <div>{user.service}</div>
                                    <div>{user.telephone1}, {user.telephone2 && (user.telephone2 + ', ')} {user.email}</div>
                                    <div>{user.ville} , {user.address}</div>
                                    <div>{user.observation}</div>
                                </div>
                                <Button type="link" onClick={(e) => { e.stopPropagation(); onDelete(user.id); }}>Supprimer</Button>
                            </List.Item>
                        )}
                        style={{ maxHeight: '400px', overflowY: 'auto' }}
                    />
                </Skeleton>
            </Col>
            <Col span={16}>
                <Title level={4}>{selectedUser ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur'}</Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item>
                        <Button type="default" onClick={onNewUser}>
                            Nouvel utilisateur
                        </Button>
                        <Button type="primary" htmlType="submit" loading={loading} style={{ marginLeft: '10px' }}>
                            {selectedUser ? 'Mettre à jour' : "Valider l'Ajouter"}
                        </Button>
                        {selectedUser && (
                            <Button danger onClick={() => onDelete(selectedUser.id)} style={{ marginLeft: '10px' }}>
                                Supprimer l'utilisateur
                            </Button>
                        )}
                    </Form.Item>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item
                                name="nomprenom"
                                label="Nom complet"
                                rules={[{ required: true, message: 'Veuillez entrer le nom complet' }]}
                            >
                                <Input placeholder="Entrez le nom complet" />
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                            <Form.Item
                                name="datenais"
                                label="Date de naissance"
                                rules={[{ required: true, message: 'Veuillez sélectionner la date de naissance' }]}
                            >
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                            <Form.Item
                                name="ref_salarie"
                                label="Référence salarié"
                            >
                                <Input placeholder="Entrez la référence salarié" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{ required: true, message: 'Veuillez entrer l\'email' }]}
                            >
                                <Input placeholder="Entrez l'email" />
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                            <Form.Item
                                name="telephone1"
                                label="Téléphone 1"
                                rules={[{ required: true, message: 'Veuillez entrer le numéro de téléphone' }]}
                            >
                                <Input placeholder="Entrez le numéro de téléphone 1" />
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                            <Form.Item
                                name="telephone2"
                                label="Téléphone 2"
                            >
                                <Input placeholder="Entrez le numéro de téléphone 2" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={12}>
                        <Col span={18}>
                            <Form.Item
                                name="address"
                                label="Adresse"
                                rules={[{ required: true, message: 'Veuillez entrer l\'adresse' }]}
                            >
                                <Input placeholder="Entrez l'adresse" />
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                            <Form.Item
                                name="ville"
                                label="Ville"
                                rules={[{ required: true, message: 'Veuillez entrer la ville' }]}
                            >
                                <Select placeholder="Sélectionnez une ville">
                                    {villesMadagascar.map(ville => (
                                        <Option key={ville} value={ville}>{ville}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={12}>
                        <Col span={6}>
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
                        </Col>
                        <Col span={6} >
                            <Form.Item
                                name="login"
                                label="Login / Identifiant"
                                rules={[{ required: true, message: 'Veuillez entrer l\'identifiant' }]}
                            >
                                <Input placeholder="Entrez l'identifiant" />
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                            <Form.Item
                                name="password"
                                label="Mot de passe"
                                rules={[{ required: true, message: 'Veuillez entrer le mot de passe' }]}
                            >
                                <Input.Password placeholder="Entrez le mot de passe" />
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                            <Form.Item
                                name="observation"
                                label="Observation"
                            >
                                <Input.TextArea placeholder="Entrez les observations" />
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </Col>
        </Row>
    );
};

export default AdminUser;
