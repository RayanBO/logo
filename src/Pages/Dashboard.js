import React, { useState } from "react";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Tooltip, Layout, Menu, Breadcrumb, Empty } from 'antd';

import { GetBreadcrumb, GetItemMenu } from "../components/Navigation";
import VuGlobal from "./VuGlobal";
import GestionRH from "./GestionRH";
import Entreprise from "./Entreprise";

const { Sider } = Layout;

export default function Dashboard() {
  const [menu, setMenu] = useState('acceuil');
  const [collapsed, setCollapsed] = useState(false);

  const items = GetItemMenu('RESPONSABLE RH');
  const url = 'url.com/pdp';
  const tootlipPdp = "NOM PRENOM - Vous avez 1 Notification 😊"

  return (
    <Layout style={{ height: "100vh" }}>
      <div style={{ color: "white", backgroundColor: "#001529", display: "flex", justifyContent: "space-between" }}>
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
            style={{ color: "white" }}
            items={GetBreadcrumb(menu)}
          />
        </div>
        <Tooltip placement="bottomRight" title={tootlipPdp}>
          <div style={{ display: "flex", margin: "10px", alignItems: "center" }}>
            <div>NOM PRENOMS - TITRE</div>
            <div style={{ margin: "5px 20px" }}>
              <Badge count={1}>
                <Avatar shape="square" icon={<UserOutlined />} src={url} />
              </Badge>
            </div>
          </div>
        </Tooltip>
      </div>
      <Layout>
        <Sider
          width={200}
          className="site-layout-background"
          collapsible
          collapsed={collapsed}
          onCollapse={(collapsed) => setCollapsed(collapsed)}
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
          {menu === 'acceuil' ? (
            <VuGlobal />
          ) : menu === 'gest-fiche' ? (
            <GestionRH />
          ) : menu === 'entreprise' ? (
            <Entreprise />
          ) : (
            <div style={{ display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center" , height:"100%"}}>
              <Empty description={false} />
              Dévelopement en cours ...
            </div>
          )}
        </Layout>
      </Layout>
    </Layout>
  );
}
