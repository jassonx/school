import MainLayout from "../../layout/MainLayout";
import MainContainer from "../../layout/MainContainer";
import { Col, Collapse, Row, Table } from "antd";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import TitlePage from "../../components/TitlePage";
import { withAuthSync } from "../../libs/auth";
import { useEffect } from "react";
import WebApiProgram from "../../api/Program";

const Home = () => {
  const { Panel } = Collapse;
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "PROGRAMA",
      key: "name",
      render: (item) => item.name,
    },
    {
      title: "TOTAL DE INSCRITOS",
      key: "company",
      className: "cursor_pointer",
      render: (item) => <div>{item.studentsCount}</div>,
    },
    Table.EXPAND_COLUMN,
  ];

  const students = [
    {
      title: "ALUMNO",
      key: "name",
      render: (item) => item.name,
    },
    {
      title: "FECHA DE INSCRIPCIÓN",
      key: "student",
      render: (item) => item.date,
    },
  ];

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

  const renderTable = (data) => {
    return (
      <>
        <div className="tableGrid">
          <div>ALUMNO</div>
          <div style={{ justifyContent: "end" }}>FECHA DE INGRESO</div>
        </div>
        <div
          style={{
            height: "300px",
            overflow: "auto",
          }}
        >
          {data.map((item) => {
            return (
              <Row
                justify="end"
                style={{
                  background: "#E8F9FE",
                  borderRadius: "10px",
                  padding: "20px",
                  margin: "10px 0px 10px 0px",
                }}
              >
                <Col span={20}>{item.name}</Col>
                <Col span={4}>{item.dateAdmission}</Col>
              </Row>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <MainLayout currentKey={["report"]}>
      <MainContainer>
        <TitlePage title={"Reportes"} />
        <Table
          pagination={false}
          className="table"
          dataSource={programs.map((item) => {
            item.key = item.id;
            return item;
          })}
          columns={columns}
          expandable={{
            expandedRowRender: (item) => renderTable(item.students),
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <DownOutlined onClick={(e) => onExpand(record, e)} />
              ) : (
                <DownOutlined onClick={(e) => onExpand(record, e)} />
              ),
          }}
          hideExpandIcon
          loading={loading}
          locale={{
            emptyText: loading
              ? "Cargando..."
              : "No se encontraron resultados.",
          }}
        />
      </MainContainer>
    </MainLayout>
  );
};

export default withAuthSync(Home);
