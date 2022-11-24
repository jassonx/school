import { Row } from "antd";

const Brand = ({ image, width, ...props }) => {
  return (
    <Row justify="center" style={{ padding: "5%" }}>
      <img width={180} src={`/images/${image}.png`} />
    </Row>
  );
};

export default Brand;
