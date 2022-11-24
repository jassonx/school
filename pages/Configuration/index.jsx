import { Alert, Button, Form, message, Row, Table } from "antd";
import { useEffect, useState } from "react";
import WebApiProgram from "../../api/Program";
import GenericForm from "../../components/genericForm";
import GenericModal from "../../components/genericModal";
import TitlePage from "../../components/TitlePage";
import MainContainer from "../../layout/MainContainer";
import MainLayout from "../../layout/MainLayout";
import { withAuthSync } from "../../libs/auth";
import { messageError } from "../../utils/message";

const Configuration = () => {
  const [form] = Form.useForm();
  const [infoGenericModal, setInfoGenericModal] = useState(null);
  const [modal, setModal] = useState(false);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    getPrograms();
  }, []);

  const getPrograms = async () => {
    try {
      setPrograms([]);
      const programs = await WebApiProgram.getPrograms();
      setPrograms(programs.data);
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "PROGRAMA",
      key: "program",
      render: (item) => item.name,
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
        titleActionButton: "Eliminar programa",
        action: () => deleteProgram(data),
        children: (
          <Alert
            message="Eliminar programa"
            description="¿Esta seguro de eliminar este programa?"
            type="warning"
            showIcon
          />
        ),
      };
    } else {
      params = {
        title: "Crear programa",
        titleActionButton: "Crear programa",
        action: () => newProgram(),
        children: <GenericForm form={form} type={3} />,
      };
    }
    setInfoGenericModal(params);
    setModal(true);
  };

  const newProgram = async () => {
    try {
      const valid = await validateForms();
      if (!valid) return;
      const new_user = await WebApiProgram.createProgram(form.getFieldsValue());
      getPrograms();
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

  const deleteProgram = async (id) => {
    try {
      const program = await WebApiProgram.deleteProgram(id);
      setPrograms(programs.filter((item) => item.id != id));
    } catch (error) {
      console.log(error);
      message.error(messageError);
    } finally {
      setModal(false);
    }
  };

  return (
    <>
      <MainLayout currentKey={["config"]}>
        <MainContainer>
          <TitlePage title={"Configuración"} />
          <Row justify="end" style={{ padding: "10px" }}>
            <Button
              size="large"
              className="button-blue"
              type="primary"
              onClick={() => setModalType()}
            >
              Nuevo programa
            </Button>
          </Row>
          <Row>
            <Table
              style={{ width: "100%" }}
              columns={columns}
              dataSource={programs}
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

export default withAuthSync(Configuration);
