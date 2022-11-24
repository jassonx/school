import { Layout, Menu, Row } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Brand from "./Brand";
import { useRouter } from "next/router";
import { css, Global } from "@emotion/core";
import { logoutAuth } from "../libs/auth";
import { PoweroffOutlined } from "@ant-design/icons";

const MainSider = ({ currentKey, ...props }) => {
  const { Sider } = Layout;
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (props.user) setUser(props.user);
  }, [props.user]);

  return (
    <>
      <Global
        styles={css`
          .mainMenu {
            margin-top: 50px;
          }

          //////Sider
          .ant-layout-sider {
            background: #263238 !important;
          }

          .ant-layout-sider .ant-menu {
            background: #263238 !important;
            color: white !important;
          }

          .subMainMenu .ant-menu .ant-menu-item {
            padding: 0px 0px 0px 20px !important;
          }

          .mainMenu li:hover {
            background: gray !important;
            border-radius: 10px 10px 10px 10px;
            color: white !important;
          }
          .mainMenu li:hover > div.ant-menu-submenu-title {
            color: white !important;
          }

          .mainMenu li:hover > div.ant-menu-submenu-title > i::before,
          .mainMenu li:hover > div.ant-menu-submenu-title > i::after {
            background: white !important;
          }

          .mainMenu li:hover > ul.ant-menu-sub li.ant-menu-item {
            color: white !important;
          }

          .mainMenu li:hover > ul.ant-menu-sub li.ant-menu-item:hover {
            background: green !important;
            color: white !important;
          }

          .mainMenu li.ant-menu-item-selected {
            background-color: white !important;
            background: white !important;
            border-radius: 10px 10px 10px 10px;
            color: black !important;
          }
        `}
      />
      <Sider width={250}>
        <Brand image={"logo_2"} />

        <Row justify="center" style={{ color: "#FFFFFF" }}>
          Hola {user?.name}
        </Row>

        <Menu
          defaultSelectedKeys={currentKey}
          theme="ligth"
          className="mainMenu"
          mode="inline"
        >
          <Menu.Item
            key={"report"}
            onClick={() => router.push({ pathname: "/home" })}
            icon={
              <img
                src={`/images/${
                  currentKey == "report" ? "report" : "report-white"
                }.png`}
              />
            }
          >
            Reportes
          </Menu.Item>
          {user && user.role == "ADMIN" && (
            <>
              <Menu.Item
                key={"user"}
                onClick={() => router.push({ pathname: "/User" })}
                icon={
                  <img
                    src={`/images/${
                      currentKey == "user" ? "user-black" : "user"
                    }.png`}
                  />
                }
              >
                Usuarios
              </Menu.Item>
              <Menu.Item
                key={"config"}
                onClick={() => router.push({ pathname: "/Configuration" })}
                icon={
                  <img
                    src={`/images/${
                      currentKey == "config" ? "config-black" : "config"
                    }.png`}
                  />
                }
              >
                Configuración
              </Menu.Item>
              <Menu.Item
                key={"exit"}
                onClick={() => logoutAuth()}
                icon={<PoweroffOutlined />}
              >
                Cerrar sesión
              </Menu.Item>
            </>
          )}
        </Menu>
      </Sider>
    </>
  );
};

const mapState = (state) => {
  return {
    user: state.globalStore.user,
  };
};

export default connect(mapState)(MainSider);
