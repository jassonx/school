import { Alert, Button, Col, Form, message, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import WebApiUser from "../../api/User";
import GenericForm from "../../components/genericForm";
import GenericModal from "../../components/genericModal";
import TitlePage from "../../components/TitlePage";
import MainContainer from "../../layout/MainContainer";
import MainLayout from "../../layout/MainLayout";
import { withAuthSync } from "../../libs/auth";
import { messageError } from "../../utils/message";

const User = ({ ...props }) => {
  const [form] = Form.useForm();
  const [currentButton, setCurrentButton] = useState(1);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [infoGenericModal, setInfoGenericModal] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const users = await WebApiUser.getUsers();
      setUsers(users.data);
    } catch (error) {
      console.log(error);
    }
  };

  const user = [
    {
      title: "USUARIO",
      key: "user",
      render: (item) => item.name,
    },
    {
      title: "NOMBRE",
      key: "name",
      render: (item) => item.name,
    },
    {
      title: "CORREO",
      align: "center",

      key: "email",
      render: (item) => item.email,
    },
    {
      title: "ROL",
      align: "center",

      key: "rol",
      align: "center",

      render: (item) => (item.role == "ADMIN" ? "Admin" : "Profesor"),
    },
    {
      key: "id",
      align: "center",
      render: (item) => (
        <div onClick={() => setModalType(item.id)}>
          <img src="/images/delete.png" />
        </div>
      ),
    },
  ];

  const setModalType = (data = null) => {
    let params = {};
    if (data) {
      params = {
        title: "Eliminar",
        titleActionButton: "Eliminar usuario",
        action: () => deleteUser(data),
        children: (
          <Alert
            message="Eliminar usuario"
            description="¿Esta seguro de eliminar este usuario?"
            type="warning"
            showIcon
          />
        ),
      };
    } else {
      params = {
        title: "Crear usuario",
        titleActionButton: "Crear usuario",
        action: () => newUser(),
        children: <GenericForm form={form} type={1} />,
      };
    }
    setInfoGenericModal(params);
    setModal(true);
  };

  const newUser = async () => {
    try {
      const valid = await validateForms();
      if (!valid) return;
      const new_user = await WebApiUser.createUser(form.getFieldsValue());
      getUsers();
      form.resetFields();
      setModal(false);
    } catch (error) {
      console.log(error);
      setModal(false);
    }
  };

  const validateForms = async () => {
    return await form
      .validateFields()
      .then((result) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      const user = await WebApiUser.deleteUser(id);
      setUsers(users.filter((item) => item.id != id));
    } catch (error) {
      console.log(error);
      message.error(messageError);
    } finally {
      setLoading(false);
      setModal(false);
    }
  };

  const Filter = (data) => {
    if (!data) return;
    setCurrentButton(data);
    switch (data) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;

      default:
        break;
    }
  };

  return (
    <>
      <MainLayout currentKey={["user"]}>
        <MainContainer>
          <TitlePage title={"Usuarios"} />
          <Row gutter={16} style={{ marginBottom: "20px" }}>
            <Col className="gutter-row" span={4}>
              <Button
                type="text"
                style={{
                  color: `${currentButton === 1 ? "#28ABE7" : "black"}`,
                }}
                onClick={() => Filter(1)}
              >
                TODOS
              </Button>
            </Col>
            <Col className="gutter-row" span={4}>
              <Button
                type="text"
                style={{
                  color: `${currentButton === 2 ? "#28ABE7" : "black"}`,
                }}
                onClick={() => Filter(2)}
              >
                PROFESORES
              </Button>
            </Col>
            <Col className="gutter-row" span={4}>
              <Button
                type="text"
                style={{
                  color: `${currentButton === 3 ? "#28ABE7" : "black"}`,
                }}
                onClick={() => Filter(3)}
              >
                ADMINISTRADORES
              </Button>
            </Col>
            <Col className="gutter-row" span={4} offset={8}>
              <Button
                size="large"
                className="button-blue"
                type="primary"
                onClick={() => setModalType()}
              >
                Nuevo usuario
              </Button>
            </Col>
          </Row>
          <Row>
            <Table
              loading={loading}
              style={{ width: "100%" }}
              columns={user}
              dataSource={users}
              rowClassName={"table-row-light"}
              locale={{
                emptyText: "No se encontraron resultados.",
              }}
            />
          </Row>
        </MainContainer>
      </MainLayout>
      {modal && (
        <GenericModal
          title={infoGenericModal.title}
          visible={modal}
          onCancel
          setVisible={() => {
            setModal(false), form.resetFields();
          }}
          actionButton={infoGenericModal.action}
          titleActionButton={infoGenericModal.titleActionButton}
        >
          {infoGenericModal.children}
        </GenericModal>
      )}
    </>
  );
};

const mapState = (state) => {
  return {
    user: state.globalStore.user,
  };
};

export default connect(mapState)(withAuthSync(User));
