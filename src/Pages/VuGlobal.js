import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Button, Input, Select, Row, Col, Divider } from 'antd';
import { ClearOutlined } from '@ant-design/icons';

const { Option } = Select;

const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Designation',
        dataIndex: 'designation',
        key: 'designation',
        render: (text, record) => <Button type="link" href={record.url} target="_blank">{text}</Button>,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Service',
        key: 'service',
        dataIndex: 'service',
        render: (_, { service }) => (
            <>
                {service.map((tag) => {
                    let color = tag === 'service1' ? 'green' : 'geekblue';
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Button type="link" href={record.url} target="_blank">Visualiser</Button>
            </Space>
        ),
    },
];

const initialData = [
    {
        key: '1',
        designation: 'Document 1',
        date: '2023-05-01',
        description: 'Description of Document 1',
        service: ['service1', 'service2'],
        url: 'https://example.com/document1',
    },
    {
        key: '2',
        designation: 'Document 2',
        date: '2023-05-02',
        description: 'Description of Document 2',
        service: ['service3'],
        url: 'https://example.com/document2',
    },
    {
        key: '3',
        designation: 'Document 3',
        date: '2023-05-03',
        description: 'Description of Document 3',
        service: ['service4', 'service5'],
        url: 'https://example.com/document3',
    },
];

const VuGlobal = () => {
    const [tableHeight, setTableHeight] = useState(0);
    const [filteredData, setFilteredData] = useState(initialData);
    const [searchText, setSearchText] = useState('');
    const [selectedService, setSelectedService] = useState('');

    useEffect(() => {
        const updateTableHeight = () => {
            setTableHeight(window.innerHeight - 300); // Adjust the offset as needed
        };

        updateTableHeight();
        window.addEventListener('resize', updateTableHeight);

        return () => window.removeEventListener('resize', updateTableHeight);
    }, []);

    const handleSearch = (value) => {
        setSearchText(value);
        filterData(value, selectedService);
    };

    const handleServiceChange = (value) => {
        setSelectedService(value);
        filterData(searchText, value);
    };

    const resetServiceFilter = () => {
        setSelectedService('');
        filterData(searchText, '');
    };

    const filterData = (search, service) => {
        let filtered = initialData;

        if (search) {
            filtered = filtered.filter(item =>
                item.designation.toLowerCase().includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (service) {
            filtered = filtered.filter(item => item.service.includes(service));
        }

        setFilteredData(filtered);
    };

    const uniqueServices = Array.from(new Set(initialData.flatMap(item => item.service)));

    return (
        <div style={{ marginLeft: '16px', marginRight: '16px', marginBottom: '16px', marginTop: '16px' }}>
            <Row>
                <div style={{
                    color: "rgba(0, 0, 0, 0.88)", fontWeight: "600",
                    fontSize: "20px", lineHeight: "1.4"
                }}>
                    Visualisation globale des docuemnts</div>
            </Row>
            <Divider orientation="left" plain style={{ borderColor: "#8c8c8c" }}>
                <div style={{ color: "#8c8c8c" }}>Liste de tout les documents </div>

            </Divider>
            <Row gutter={[0, 16]} style={{ marginBottom: '16px', marginTop: '10px' }}>
                <Col>
                    <Input.Search
                        placeholder="Search"
                        value={searchText}
                        onChange={e => handleSearch(e.target.value)}
                        style={{ width: 200 }}
                    />
                </Col>
                <Col style={{ marginLeft: '16px' }}>
                    <Select
                        placeholder="Service"
                        value={selectedService}
                        onChange={handleServiceChange}
                        style={{ width: 200 }}
                    >
                        {uniqueServices.map(service => (
                            <Option key={service} value={service}>{service}</Option>
                        ))}
                    </Select>
                </Col>
                <Col>
                    <Button icon={<ClearOutlined />} onClick={resetServiceFilter}></Button>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={filteredData}
                scroll={{ y: tableHeight }}
            />
        </div>
    );
};

export default VuGlobal;
