import React, { useState } from "react";
import { Layout, Menu, List, Card } from "antd";

// ===============================================================

const { Content, Sider } = Layout;

export default function GestionRH() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const services = ["Gestion des fiches", "Pointages", "Fiche de paie"];
  const folders = {
    "Gestion des fiches": ["Fiche A", "Fiche B"],
    "Pointages": ["Dossier 3", "Dossier 4"],
    "Fiche de paie": ["Dossier 5", "Dossier 6"],
  };
  const documents = {
    "Fiche A": ["Document 1", "Document 2"],
    "Fiche B": ["Document 3", "Document 4"],
    // Ajoutez plus de documents pour les autres dossiers
  };
  const documentContent = {
    "Document 1": "Contenu du Document 1",
    "Document 2": "Contenu du Document 2",
    // Ajoutez plus de contenu pour les autres documents
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
            onClick={({ key }) => setSelectedService(key)}
          >
            {services.map((service) => (
              <Menu.Item key={service} style={{ color: "#000" }}>
                {service}
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
            {selectedService && (
              <List
                bordered
                dataSource={folders[selectedService]}
                renderItem={(folder) => (
                  <List.Item
                    onClick={() => setSelectedFolder(folder)}
                    style={{ cursor: "pointer", color: "#000" }}
                  >
                    {folder}
                  </List.Item>
                )}
              />
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
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                {selectedFolder && (
                  <List
                    bordered
                    dataSource={documents[selectedFolder]}
                    renderItem={(document) => (
                      <List.Item
                        onClick={() => setSelectedDocument(document)}
                        style={{ cursor: "pointer", color: "#000" }}
                      >
                        {document}
                      </List.Item>
                    )}
                  />
                )}
              </div>
              <div style={{ flex: 2 }}>
                {selectedDocument && (
                  <Card title={selectedDocument}>
                    <p style={{ color: "#000" }}>
                      {documentContent[selectedDocument]}
                    </p>
                  </Card>
                )}
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
