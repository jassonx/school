import { Form, Select } from "antd";
import { useEffect, useState } from "react";
import WebApiProgram from "../api/Program";
import WebApiUser from "../api/User";
import { ruleRequired } from "../utils/rules";

const SelectUser = () => {
  const { Option } = Select;

  const [options, setOptions] = useState([]);
  const getUsers = async () => {
    try {
      const users = await WebApiUser.getUsers();
      setOptions(users.data);
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Form.Item style={{ borderRadius: "10px" }} name="userId" label="Usuario">
      <Select
        allowClear
        notFoundContent={"No se encontraron resultados."}
        showSearch
        optionFilterProp="children"
      >
        {options &&
          options.map((item) => {
            return (
              <>
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
                ;
              </>
            );
          })}
      </Select>
    </Form.Item>
  );
};

export default SelectUser;
