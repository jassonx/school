import React, { useEffect, useLayoutEffect, useState } from "react";
import { Layout, Row, Col, Drawer, Typography, Divider } from "antd";

import MainSider from "../components/MainSider";
import { connect } from "react-redux";

const { Content } = Layout;

const MainLayout = ({ currentKey, ...props }) => {
  return (
    <>
      <Layout className="layout" style={{ minHeight: "100vh" }}>
        <Layout>
          <Layout>
            <MainSider currentKey={currentKey} />
            <Content>
              <div className="div-main-layout">{props.children}</div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

const mapState = (state) => {
  return {
    user: state.globalStore.user,
  };
};

export default connect(mapState)(MainLayout);
