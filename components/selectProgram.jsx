import { Form, Select } from "antd";
import { useEffect, useState } from "react";
import WebApiProgram from "../api/Program";
import { ruleRequired } from "../utils/rules";

const SelectProgram = () => {
  const { Option } = Select;

  const [options, setOptions] = useState([]);
  const getPrograms = async () => {
    try {
      const programs = await WebApiProgram.getPrograms();
      setOptions(programs.data);
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  useEffect(() => {
    getPrograms();
  }, []);
  return (
    <Form.Item
      style={{ borderRadius: "10px" }}
      name="programId"
      label="Programa"
    >
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

export default SelectProgram;
