import React, { useState } from "react";
import { Layout, Menu, Card, Form, Input, Button, Modal , List } from "antd";
import { FileAddOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;

export default function Entreprise() {
    const [selectedEnterprise, setSelectedEnterprise] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newEnterprise, setNewEnterprise] = useState({
        code: "",
        raisonSociale: "",
        nif: "",
        stat: "",
    });

    const [enterprises, setEnterprises] = useState([
        { code: "E1", raisonSociale: "Entreprise 1", nif: "NIF1", stat: "STAT1" },
        { code: "E2", raisonSociale: "Entreprise 2", nif: "NIF2", stat: "STAT2" },
        { code: "E3", raisonSociale: "Entreprise 3", nif: "NIF3", stat: "STAT3" }
    ]);

    const options = ["Details", "Départements", "Employees", "Activities", "Inventaires"];
    const employees = {
        "Entreprise 1": ["Employee 1", "Employee 2"],
        "Entreprise 2": ["Employee 3", "Employee 4"],
        "Entreprise 3": ["Employee 5", "Employee 6"],
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setEnterprises([...enterprises, { ...newEnterprise }]);
        setNewEnterprise({ code: "", raisonSociale: "", nif: "", stat: "" });
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEnterprise({ ...newEnterprise, [name]: value });
    };

    return (
        <Layout style={{ height: "100%" }}>
            <Layout>
                <Sider
                    width={200}
                    className="site-layout-background"
                    style={{ backgroundColor: "#f0f2f5" }}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        style={{ height: "100%",  display: "flex", alignItems: "center", flexDirection: "column" }}
                        onClick={({ key }) => setSelectedEnterprise(enterprises.find(ent => ent.raisonSociale === key))}
                    >
                        {enterprises.map((enterprise) => (
                            <Menu.Item key={enterprise.raisonSociale} style={{ color: "#000" }}>
                                {enterprise.raisonSociale}
                            </Menu.Item>
                        ))}
                        <Button type="dashed" style={{ marginTop: "16px" }} icon={<FileAddOutlined />} onClick={showModal}>
                            Nouveau entreprise
                        </Button>
                    </Menu>
                </Sider>
                <Layout style={{ padding: "0" }}>
                    <Sider
                        width={200}
                        className="site-layout-background"
                        style={{ backgroundColor: "#fafafa" }}
                    >
                        {selectedEnterprise && (
                            <Menu
                                mode="inline"
                                style={{ height: "100%" , backgroundColor:"#fafafa" }}
                                onClick={({ key }) => setSelectedOption(key)}
                            >
                                {options.map((option) => (
                                    <Menu.Item key={option} style={{ color: "#000" }}>
                                        {option}
                                    </Menu.Item>
                                ))}
                            </Menu>
                        )}
                    </Sider>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            backgroundColor: "#fff",
                        }}
                    >
                        {selectedOption === "Details" && selectedEnterprise && (
                            <div>
                                <Form layout="vertical">
                                    <Form.Item label="Code">
                                        <Input value={selectedEnterprise.code} readOnly />
                                    </Form.Item>
                                    <Form.Item label="Raison Sociale">
                                        <Input value={selectedEnterprise.raisonSociale} readOnly />
                                    </Form.Item>
                                    <Form.Item label="NIF">
                                        <Input value={selectedEnterprise.nif} readOnly />
                                    </Form.Item>
                                    <Form.Item label="STAT">
                                        <Input value={selectedEnterprise.stat} readOnly />
                                    </Form.Item>
                                </Form>
                                <Card title={selectedEnterprise.raisonSociale}>
                                    <p style={{ color: "#000" }}>
                                        Code: {selectedEnterprise.code}<br />
                                        NIF: {selectedEnterprise.nif}<br />
                                        STAT: {selectedEnterprise.stat}
                                    </p>
                                </Card>
                            </div>
                        )}
                        {selectedOption === "Employees" && selectedEnterprise && (
                            <List
                                bordered
                                dataSource={employees[selectedEnterprise.raisonSociale]}
                                renderItem={(employee) => (
                                    <List.Item style={{ color: "#000" }}>
                                        {employee}
                                    </List.Item>
                                )}
                            />
                        )}
                        {selectedOption === "Activities" && selectedEnterprise && (
                            <div>
                                <p style={{ color: "#000" }}>No activities available.</p>
                            </div>
                        )}
                    </Content>
                </Layout>
            </Layout>

            <Modal title="Add Enterprise" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form layout="vertical">
                    <Form.Item label="Code">
                        <Input name="code" value={newEnterprise.code} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="Raison Sociale">
                        <Input name="raisonSociale" value={newEnterprise.raisonSociale} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="NIF">
                        <Input name="nif" value={newEnterprise.nif} onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item label="STAT">
                        <Input name="stat" value={newEnterprise.stat} onChange={handleInputChange} />
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
}
