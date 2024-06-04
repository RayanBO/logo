import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Form, Input, Button } from 'antd';
// import { Chart } from '@antv/g2';

const { Content } = Layout;

const initialData = {
    name: "Entreprise ABC",
    address: "123 Rue Principale",
    code: "12345",
    raisonSocial: "Fourniture de services",
    nifStat: "987654321",
};

export default function Entreprise() {
    const [form] = Form.useForm();
    const [data, setData] = useState(initialData);

    // useEffect(() => {
    //     // Prepare data
    //     const dataChart = [
    //         { genre: 'Sports', sold: 275 },
    //         { genre: 'Strategy', sold: 115 },
    //         { genre: 'Action', sold: 120 },
    //         { genre: 'Shooter', sold: 350 },
    //         { genre: 'Other', sold: 150 },
    //     ];

    //     // Initialize chart instance
    //     const chart = new Chart({
    //         container: 'graph1',
    //         width: 600,
    //         height: 400,
    //     });

    //     // Declare visualization
    //     chart
    //         .interval() // Create an Interval tag
    //         .data(dataChart) // Bind data
    //         .encode('x', 'genre') // Encode x channel
    //         .encode('y', 'sold'); // Encode y channel

    //     // Render visualization
    //     chart.render();
    // }, []);

    const handleFormSubmit = (values) => {
        setData(values);
    };

    return (
        <Layout>
            <Content style={{ padding: '20px' }}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card title="Carte de visite">
                            <p><strong>Nom: </strong>{data.name}</p>
                            <p><strong>Adresse: </strong>{data.address}</p>
                            <p><strong>Code: </strong>{data.code}</p>
                            <p><strong>Raison Sociale: </strong>{data.raisonSocial}</p>
                            <p><strong>NIF/STAT: </strong>{data.nifStat}</p>
                        </Card>
                        <Card title="Statistiques de l'entreprise" style={{ marginTop: '20px' }}>
                            <div id="graph1">
                                GRAPHIQUE
                            </div>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="Détails de l'entreprise">
                            <Form form={form} layout="vertical" initialValues={data} onFinish={handleFormSubmit}>
                                <Form.Item name="name" label="Nom">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="address" label="Adresse">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="code" label="Code">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="raisonSocial" label="Raison Sociale">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="nifStat" label="NIF/STAT">
                                    <Input />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">Enregistrer</Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}
