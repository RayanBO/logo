import React, { useState } from "react";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Tooltip, Layout, Menu, Breadcrumb, Empty } from 'antd';

import { GetBreadcrumb, GetItemMenu } from "../components/Navigation";
import VuGlobal from "./VuGlobal";
import GestionRH from "./GestionRH";
import Entreprise from "./Entreprise";

const { Sider, Header, Content } = Layout;

export default function Dashboard() {
  const [menu, setMenu] = useState('acceuil');
  const [collapsed, setCollapsed] = useState(false);

  const items = GetItemMenu('RESPONSABLE RH');
  const url = 'url.com/pdp';
  const tooltipPdp = "NOM PRENOM - Vous avez 1 Notification 😊";

  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ color: "white", backgroundColor: "#001529", display: "flex", justifyContent: "space-between", padding: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="logo-text">
            <div>LOGO</div>
          </div>
          <Breadcrumb
            style={{ color: "white", marginLeft: 16 }}
            items={GetBreadcrumb(menu)}
          />
        </div>
        <Tooltip placement="bottomRight" title={tooltipPdp}>
          <div style={{ display: "flex", margin: "10px", alignItems: "center" }}>
            <div>NOM PRENOMS - TITRE</div>
            <div style={{ margin: "5px 20px" }}>
              <Badge count={1}>
                <Avatar shape="square" icon={<UserOutlined />} src={url} />
              </Badge>
            </div>
          </div>
        </Tooltip>
      </Header>
      <Layout>
        <Sider
          width={200}
          className="site-layout-background"
          collapsible
          collapsed={collapsed}
          onCollapse={(collapsed) => setCollapsed(collapsed)}
          style={{ backgroundColor: "#001529" }}
        >
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['docs']}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={items}
            onClick={({ key }) => setMenu(key)}
          />
        </Sider>
        <Layout style={{ padding: '0' }}>
          <Content style={{ margin: 0, overflow: 'auto' }}> {/* Contenu scrollable */}
            {menu === 'acceuil' ? (
              <VuGlobal />
            ) : menu === 'gest-fiche' ? (
              <GestionRH />
            ) : menu === 'entreprise' ? (
              <Entreprise />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <Empty description={false} />
                Développement en cours ...
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
