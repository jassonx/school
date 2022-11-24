import { Row } from "antd";

const TitlePage = ({ title }) => {
  return (
    <Row justify="center">
      <span
        style={{
          fontSize: "50px",
          fontWeight: "bold",
          fontFamily: "monospace",
        }}
      >
        {title}
      </span>
    </Row>
  );
};

export default TitlePage;
