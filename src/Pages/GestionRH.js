import React, { useState } from "react";
import { Layout, Menu, List, Card, Button, Skeleton } from "antd";

const { Content, Sider } = Layout;

export default function GestionRH() {
  const [selectedEnterprise, setSelectedEnterprise] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  const enterprises = ["Entreprise 1", "Entreprise 2", "Entreprise 3"];
  const categories = ["Fiche", "Pointage", "Conger", "Fiche de paie"];
  const [employees, setEmployees] = useState({
    "Entreprise 1": [
      { id: 1, nomprenom: "Employee 1", datenais: "01/01/1980", ref_salarie: "REF001", service: "Service A", telephone1: "123456789", telephone2: "987654321", email: "employee1@example.com", ville: "City A", address: "Address A", observation: "Observation 1" },
      { id: 2, nomprenom: "Employee 2", datenais: "02/02/1985", ref_salarie: "REF002", service: "Service B", telephone1: "123456789", telephone2: "987654321", email: "employee2@example.com", ville: "City B", address: "Address B", observation: "Observation 2" }
    ],
    "Entreprise 2": [
      { id: 3, nomprenom: "Employee 3", datenais: "03/03/1990", ref_salarie: "REF003", service: "Service C", telephone1: "123456789", telephone2: "987654321", email: "employee3@example.com", ville: "City C", address: "Address C", observation: "Observation 3" },
      { id: 4, nomprenom: "Employee 4", datenais: "04/04/1995", ref_salarie: "REF004", service: "Service D", telephone1: "123456789", telephone2: "987654321", email: "employee4@example.com", ville: "City D", address: "Address D", observation: "Observation 4" }
    ],
    "Entreprise 3": [
      { id: 5, nomprenom: "Employee 5", datenais: "05/05/2000", ref_salarie: "REF005", service: "Service E", telephone1: "123456789", telephone2: "987654321", email: "employee5@example.com", ville: "City E", address: "Address E", observation: "Observation 5" },
      { id: 6, nomprenom: "Employee 6", datenais: "06/06/2005", ref_salarie: "REF006", service: "Service F", telephone1: "123456789", telephone2: "987654321", email: "employee6@example.com", ville: "City F", address: "Address F", observation: "Observation 6" }
    ]
  });

  const onDelete = (id) => {
    setSelectedEmployee(null);
    const updatedEmployees = { ...employees };
    for (const enterprise in updatedEmployees) {
      updatedEmployees[enterprise] = updatedEmployees[enterprise].filter(employee => employee.id !== id);
    }
    setEmployees(updatedEmployees);
  };

  const onUserSelect = (user) => {
    setSelectedEmployee(user);
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
            style={{ height: "100%", borderRight: 0 }}
            onClick={({ key }) => setSelectedEnterprise(key)}
          >
            {enterprises.map((enterprise) => (
              <Menu.Item key={enterprise} style={{ color: "#000" }}>
                {enterprise}
              </Menu.Item>
            ))}
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
                style={{ height: "100%" }}
                onClick={({ key }) => setSelectedCategory(key)}
              >
                {categories.map((category) => (
                  <Menu.Item key={category} style={{ color: "#000" }}>
                    {category}
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
            {selectedCategory && selectedEnterprise && (
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  {selectedCategory === "Fiche" && (
                    <Skeleton loading={loading}>
                      <List
                        bordered
                        dataSource={employees[selectedEnterprise]}
                        renderItem={(employee) => (
                          <List.Item
                            onClick={() => onUserSelect(employee)}
                            style={{
                              cursor: 'pointer',
                              backgroundColor: selectedEmployee?.id === employee.id ? '#e6f7ff' : 'white'
                            }}
                          >
                            <div>
                              <strong>{employee.nomprenom}</strong> | {employee.datenais} {employee.ref_salarie ? (' | ' + employee.ref_salarie) : ''}
                              <div>{employee.service}</div>
                              <div>{employee.telephone1}, {employee.telephone2 && (employee.telephone2 + ', ')} {employee.email}</div>
                              <div>{employee.ville}, {employee.address}</div>
                              <div>{employee.observation}</div>
                            </div>
                            <Button type="link" onClick={(e) => { e.stopPropagation(); onDelete(employee.id); }}>Supprimer</Button>
                          </List.Item>
                        )}
                        style={{ maxHeight: '400px', overflowY: 'auto' }}
                      />
                    </Skeleton>
                  )}
                  {selectedCategory !== "Fiche" && (
                    <div>
                      <p style={{ color: "#000" }}>Content for {selectedCategory}</p>
                    </div>
                  )}
                </div>
                {selectedCategory === "Fiche" && (
                  <div style={{ flex: 2 }}>
                    {selectedEmployee && (
                      <Card title={selectedEmployee.nomprenom}>
                        <p style={{ color: "#000" }}>
                          {selectedEmployee[selectedCategory.toLowerCase()]}
                        </p>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
