import { Form, Select } from "antd";
import { useEffect, useState } from "react";
import WebApiStudent from "../api/Student";
import { ruleRequired } from "../utils/rules";

const SelectStudent = () => {
  const { Option } = Select;

  const [options, setOptions] = useState([]);
  const getStudents = async () => {
    try {
      const students = await WebApiStudent.getStudents();
      setOptions(students.data);
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  useEffect(() => {
    getStudents();
  }, []);
  return (
    <Form.Item
      style={{ borderRadius: "10px" }}
      name="students"
      label="Estudiantes"
    >
      <Select
        mode="multiple"
        allowClear
        notFoundContent={"No se encontraron resultados."}
        showSearch
        optionFilterProp="children"
        ruleRequired={[ruleRequired]}
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

export default SelectStudent;
