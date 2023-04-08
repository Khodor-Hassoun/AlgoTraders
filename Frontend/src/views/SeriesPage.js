import { useEffect, useState } from "react";
import { CreateSeries, FetchMovieGenres, FetchSeries } from "../api/series";
import {
  Form,
  Button,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Row,
  Col,
  message,
  List,
} from "antd";
import "antd/dist/antd.css";
import { DeleteSeries } from "../api/delete";

const { Option } = Select;
function SeriesPage() {
  const [genres, setGenres] = useState(null);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    FetchMovieGenres().then((fetchedGenres) => setGenres(fetchedGenres));
    FetchSeries().then((fetchedSeries) => setSeries(fetchedSeries));
  }, []);

  return (
    <div>
      <Row type="flex" align="middle" style={{ margin: "auto" }}>
        <Col span={12}>
          <h2>Create series here</h2>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={(newSeriesInfo) =>
              CreateSeries(newSeriesInfo)
                .then((responseMessage) => {
                  setSeries([...series, newSeriesInfo]);
                  message.success(responseMessage);
                })
                .catch((err) => message.error("Creation failed."))
            }
            autoComplete="off"
            layout="vertical"
            style={{ width: "40vw" }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input series name." }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Start Date:"
              name="series_startDate"
              rules={[
                {
                  required: true,
                  message: "Please input series first episode date.",
                },
              ]}
            >
              <DatePicker
                format={(momentInstance) => momentInstance.format("YYYY-MM-DD")}
              />
            </Form.Item>
            <Form.Item
              label="Number of Episodes:"
              name="series_numOfEpisodes"
              rules={[
                {
                  required: true,
                  message: "Please input series number of episodes.",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Genre:"
              name="series_genre"
              rules={[
                { required: true, message: "Please input series category." },
              ]}
            >
              <Select
                style={{
                  width: 120,
                }}
              >
                {genres &&
                  genres.map((genre) => (
                    <Option value={genre.id} key={genre.id}>
                      {genre.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <List bordered header={<strong>Registered Series</strong>}>
            {series.length ? (
              series.map(({ id, name, attribs }) => (
                <List.Item key={id || ""} onClick={() => DeleteSeries(id)}>
                  {name}
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => DeleteSeries(id)}
                  >
                    Delete
                  </Button>
                </List.Item>
              ))
            ) : (
              <List.Item>No series registered currently</List.Item>
            )}
          </List>
        </Col>
      </Row>
    </div>
  );
}

export default SeriesPage;
