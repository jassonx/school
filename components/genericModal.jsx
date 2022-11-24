import { Button, Col, Modal, Row, Space } from "antd";

const GenericModal = ({
  setVisible,
  visible = false,
  width = "50%",
  title = "Ejemplo",
  children,
  actionButton,
  titleActionButton = "Aceptar",
  viewActionButton = true,
  closeButton = "Cancelar",
  maskClosable = true,
}) => {
  return (
    <Modal
      maskClosable={maskClosable}
      visible={visible}
      footer={
        <Col>
          <Space>
            <Button
              type="link"
              size="large"
              htmlType="button"
              onClick={() => setVisible(false)}
              style={{ paddingLeft: 50, paddingRight: 50 }}
            >
              {closeButton}
            </Button>

            {viewActionButton && (
              <Button
                size="large"
                htmlType="button"
                className="button-blue"
                onClick={actionButton}
                style={{ paddingLeft: 50, paddingRight: 50 }}
              >
                {titleActionButton}
              </Button>
            )}
          </Space>
        </Col>
      }
      width={width}
      centered={true}
      onCancel={() => setVisible(false)}
      title={
        <Row justify="center">
          <span className="title-modal">{title}</span>
        </Row>
      }
    >
      {children}
    </Modal>
  );
};

export default GenericModal;
