import { useRouter } from "next/router";
import { connect } from "react-redux";
import Brand from "../components/Brand";
import { Login } from "../redux/webDuck";
import { ruleRequired } from "../utils/rules";
import { Form, Input, Button, Alert, Typography, Row, Image } from "antd";
import { useState } from "react";
import { loginAuth } from "../libs/auth";

const LoginForm = ({ ...props }) => {
  const { Text } = Typography;
  const router = useRouter();
  const [loginForm] = Form.useForm();
  const [error, setError] = useState(false);

  const onFinish = (value) => {
    if (value.userName.trim() == "") return;
    if (value.password.trim() == "") return;
    console.log("llega", props);
    props
      .Login(value)
      .then((result) => {
        if (result) {
          loginAuth(result);
          router.push({ pathname: "/home" });
        } else {
          setError(false);
        }
      })
      .catch((err) => {
        setError(true);
      });
  };
  return (
    <div className="login">
      <Brand image={"logo_1"} />
      <Form
        name="normal_login"
        className="login-form"
        form={loginForm}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item name="userName" rules={[ruleRequired]}>
          <Input
            style={{ marginTop: "5px" }}
            placeholder="Usuario"
            onBlur={(value) =>
              loginForm.setFieldsValue({
                email: value.target.value.toLowerCase(),
              })
            }
          />
        </Form.Item>
        <Text></Text>
        <Form.Item name="password" rules={[ruleRequired]}>
          <Input.Password
            style={{ marginTop: "5px" }}
            type="password"
            placeholder="Contraseña"
          />
        </Form.Item>

        {error && (
          <Alert
            message="Error al iniciar sesión."
            description="La contraseña y/o correo electrónico son incorrectos."
            type="error"
            style={{ textAlign: "center", marginBottom: "10px" }}
            closable
          />
        )}

        <Form.Item>
          <Button
            style={{ width: "100%", background: "#FDCA3D", color: "#FFFF" }}
            htmlType="submit"
          >
            Iniciar sesión
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
const mapState = (state) => {
  return {};
};
export default connect(mapState, { Login })(LoginForm);
