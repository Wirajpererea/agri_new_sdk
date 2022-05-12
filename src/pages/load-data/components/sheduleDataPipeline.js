import React, { useState, useEffect } from "react";
import {
  Select,
  TimePicker,
  Checkbox,
  Form,
  Button,
  Row,
  Col,
  Switch,
} from "antd";
import moment from "moment";
import { MessageAlert } from "../../../components";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import "./sheduleDataPipeline.scss";
import PipelineScheduleSuccessModal from "./pipelineScheduleSuccess";
import { useHistory } from "react-router-dom";

const FormItem = Form.Item;
const { Option } = Select;
const format = "HH:mm";
const options = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
];

const SheduleDataPipeline = ({
  userData,
  pipelineExecutionId,
  selectedPipeline,
  scheduleDataPipeline,
  schedulePipelineStatus,
  dataSource,
  goBackStage,
}) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [activeButton, setActiveButton] = useState(null);
  const [schedulePeriodType, setSchedulePeriodType] = useState(null);
  const [scheduleTime, setScheduleTime] = useState(null);
  const [scheduleDays, setScheduleDays] = useState(null);
  const [scheduleDayOfMonth, setScheduleDayOfMonth] = useState(null);
  const [scheduleMonthCount, setScheduleMonthCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scheduleStatus, setScheduleStatus] = useState(
    dataSource === "csvDetails" ? false : true
  );
  const [scheduleFinishedStatus, setScheduleFinishedStatus] = useState(false);

  const dataSave = () => {
    if (schedulePipelineStatus === "success") {
      setScheduleFinishedStatus(true);
    }
  };
  const onFieldsChange = (values) => {
    const formDataField = values.length > 0 && values[0]["name"][0];
    if (formDataField === "schedulePeriod") {
      setSchedulePeriodType(values[0]["value"]);
    }
    if (formDataField === "scheduleTime") {
      setScheduleTime(moment(values[0]["value"]).format("HHmmss"));
    }

    if (formDataField === "scheduleDays") {
      const dataValues =
        values[0]["value"].length > 0 ? values[0]["value"].join(",") : null;
      setScheduleDays(dataValues);
    }
    if (formDataField === "dayToStart") {
      setScheduleDayOfMonth(values[0]["value"]);
    }
    if (formDataField === "scheduleMonthInterval") {
      setScheduleMonthCount(values[0]["value"]);
    }

    if (schedulePeriodType) {
      if (schedulePeriodType === "Daily" && scheduleTime) {
        setActiveButton(true);
      }
      if (schedulePeriodType === "Weekly" && scheduleTime && scheduleDays) {
        setActiveButton(true);
      }
      if (
        schedulePeriodType === "Monthly" &&
        scheduleTime &&
        scheduleDayOfMonth &&
        scheduleMonthCount
      ) {
        setActiveButton(true);
      }

      if (schedulePeriodType && scheduleTime) {
        if (schedulePeriodType === "Weekly" && !scheduleDays) {
          setActiveButton(false);
        }
        if (
          schedulePeriodType === "Monthly" &&
          !scheduleDayOfMonth &&
          !scheduleMonthCount
        ) {
          setActiveButton(false);
        }
      }

      if (!schedulePeriodType && !scheduleTime) {
        setActiveButton(false);
      }
    } else {
      setActiveButton(false);
    }
  };

  const sheduleDataPipeline = () => {
    const startDate = moment().format("YYYY-MM-DD HH:mm:ss");
    const { DataPipeID } = selectedPipeline;
    const { UserID } = userData;
    const dataObj = {
      startDate: startDate,
      period: schedulePeriodType,
      time: scheduleTime,
      days: scheduleDays,
      dayToStart: scheduleDayOfMonth,
      noOfMonthsContinue: scheduleMonthCount,
      pipelineExecutionId,
      pipelineId: DataPipeID,
      userId: UserID,
    };
    scheduleDataPipeline(dataObj);
  };
  const onScheduleHandler = (value) => {
    if (dataSource !== "csvDetails") {
      setScheduleStatus(value);
    }
  };

  const redirectToDataPipe = () => {
    history.push("/data");
  };

  return (
    <React.Fragment>
      <div className="connect-data-pipe">
        <h3>Schedule Data Pipeline</h3>
        <Row className="schedule-switch">
          <Col span={3}>
            <label className="pipeline-connection-input-label ">Schedule</label>
          </Col>
          <Col span={2}>
            <Switch
              onChange={onScheduleHandler}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked={dataSource === "csvDetails" ? false : true}
              disabled={dataSource === "csvDetails" ? true : false}
            />
          </Col>
        </Row>
        <Form
          ref={form}
          onFinish={!scheduleStatus ? redirectToDataPipe : sheduleDataPipeline}
          onFieldsChange={onFieldsChange}
          className="data-pipe-form"
          layout="vertical"
        >
          <Row>
            <Col span={4}>
              <label className="pipeline-connection-input-label">
                Select Period*
              </label>
              <FormItem
                className="pipeline-connection-input-item"
                name="schedulePeriod"
                rules={[
                  {
                    required: !scheduleStatus ? false : true,
                  },
                ]}
              >
                <Select
                  // placeholder="Select Period"
                  className="datapipe-selection-import-export"
                  size="large"
                  disabled={scheduleStatus ? false : true}
                >
                  <Option value="Daily">Daily</Option>
                  <Option value="Weekly">Weekly</Option>
                  <Option value="Monthly">Monthly</Option>
                </Select>
              </FormItem>
            </Col>

            <Col offset={3} span={4}>
              <label className="pipeline-connection-input-label">Time*</label>
              <FormItem
                className="pipeline-connection-input-item"
                name="scheduleTime"
                rules={[
                  {
                    required: !scheduleStatus ? false : true,
                  },
                ]}
              >
                <TimePicker
                  placeholder=""
                  format={format}
                  className="pipeline-connection-input"
                  disabled={scheduleStatus ? false : true}
                />
              </FormItem>
            </Col>
          </Row>

          {scheduleStatus && schedulePeriodType === "Monthly" && (
            <Row>
              <Col span={4}>
                <label className="pipeline-connection-input-label">
                  Day to start
                </label>
                <FormItem
                  className="pipeline-connection-input-item"
                  name="dayToStart"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    defaultValue=""
                    className="datapipe-selection-import-export"
                    // placeholder="Select day"
                    size="large"
                  >
                    <Option value="end">End of month</Option>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                    <Option value="6">6</Option>
                    <Option value="7">7</Option>
                    <Option value="8">8</Option>
                    <Option value="9">9</Option>
                    <Option value="10">10</Option>
                    <Option value="11">11</Option>
                    <Option value="12">12</Option>
                    <Option value="13">13</Option>
                    <Option value="14">14</Option>
                    <Option value="15">15</Option>
                    <Option value="16">16</Option>
                    <Option value="17">17</Option>
                    <Option value="18">18</Option>
                    <Option value="19">19</Option>
                    <Option value="20">20</Option>
                    <Option value="21">21</Option>
                    <Option value="22">22</Option>
                    <Option value="23">23</Option>
                    <Option value="24">24</Option>
                    <Option value="25">25</Option>
                    <Option value="26">26</Option>
                    <Option value="27">27</Option>
                    <Option value="28">28</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span={3} style={{ textAlign: "center", paddingTop: "32px" }}>
                <label className="pipeline-connection-input-label block-container-item">
                  of every
                </label>
              </Col>
              <Col span={4}>
                <label className="pipeline-connection-input-label">
                  Month(s)
                </label>
                <FormItem
                  className="pipeline-connection-input-item"
                  name="scheduleMonthInterval"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    defaultValue=""
                    className="datapipe-selection-import-export"
                    placeholder="Select month"
                    size="large"
                  >
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                    <Option value="6">6</Option>
                    <Option value="7">7</Option>
                    <Option value="8">8</Option>
                    <Option value="9">9</Option>
                    <Option value="10">10</Option>
                    <Option value="11">11</Option>
                    <Option value="12">12</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          )}

          {scheduleStatus && schedulePeriodType === "Weekly" && (
            <div className="schedule-checkbox-container">
              <FormItem
                name="scheduleDays"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Checkbox.Group options={options} />
              </FormItem>
            </div>
          )}

          {schedulePipelineStatus === "error" && (
            <MessageAlert
              message={`The data pipeline failed to schedule.
            `}
              type={"error"}
            />
          )}

          <Row>
            <Col span={4}>
              <div className="submit-btn-div">
                <Button
                  type="primary"
                  onClick={dataSave}
                  htmlType="submit"
                  disabled={
                    scheduleStatus && !activeButton
                      ? true
                      : scheduleStatus && activeButton
                      ? false
                      : !scheduleStatus
                      ? false
                      : true
                  }
                  className={
                    scheduleStatus && !activeButton
                      ? "form-submit-button"
                      : scheduleStatus && activeButton
                      ? "form-submit-button active"
                      : !scheduleStatus
                      ? "form-submit-button active"
                      : "form-submit-button"
                  }
                >
                  Save
                </Button>
              </div>
            </Col>
          </Row>

          <PipelineScheduleSuccessModal
            modalVisible={scheduleFinishedStatus}
            width={500}
            customClass={"shedule-modal"}
            loading={false}
            handleCancel={() => setScheduleFinishedStatus(false)}
          />
        </Form>
      </div>
    </React.Fragment>
  );
};

export default SheduleDataPipeline;
