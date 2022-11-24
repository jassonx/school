import { Col, Form, Input, Row, Select } from "antd";
import { useState } from "react";
import { ruleEmail, ruleRequired } from "../utils/rules";
import SelectProgram from "./selectProgram";
import SelectStudent from "./selectStudend";
import SelectUser from "./selectUser";

const GenericForm = ({ form, type }) => {
  const [user, setUser] = useState("ADMIN");
  return (
    <Form form={form} layout="vertical">
      <Row justify="center">
        <Col xxs={14} xl={14}>
          {type == 1 && (
            <Form.Item
              style={{ borderRadius: "10px" }}
              name="role"
              label="Tipo de usuario"
              rules={[ruleRequired]}
            >
              <Select
                allowClear
                onChange={(value) => setUser(value)}
                options={[
                  { key: 1, label: "Administrador", value: "ADMIN" },
                  { key: 2, label: "Profesor", value: "USER" },
                ]}
              />
            </Form.Item>
          )}
          {type == 2 ? (
            <Form.Item
              style={{ borderRadius: "10px" }}
              name="program"
              label="Programa"
              rules={[ruleRequired]}
            >
              <Input size="large" />{" "}
            </Form.Item>
          ) : (
            user == "USER" && <SelectProgram />
          )}

          {type === 3 ? (
            <SelectUser />
          ) : (
            <Form.Item
              style={{ borderRadius: "10px" }}
              name="userName"
              label="Usuario"
              rules={[ruleRequired]}
            >
              <Input size="large" />
            </Form.Item>
          )}
          <Form.Item
            style={{ borderRadius: "10px" }}
            name="name"
            label="Nombre"
            rules={[ruleRequired]}
          >
            <Input size="large" />
          </Form.Item>
          {type === 3 ? (
            <SelectStudent />
          ) : (
            <>
              <Form.Item
                style={{ borderRadius: "10px" }}
                name="email"
                label="Correo"
                rules={[ruleRequired, ruleEmail]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                style={{ borderRadius: "10px" }}
                name="password"
                label="Contraseña"
                rules={[ruleRequired]}
              >
                <Input size="large" />
              </Form.Item>
            </>
          )}
        </Col>
      </Row>
    </Form>
  );
};

export default GenericForm;
