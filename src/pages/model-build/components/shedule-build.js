import React, { useState } from "react";
import { Select, TimePicker, Checkbox, Form, Button, Row, Col } from "antd";
import { buildModelStartApi } from "../services/services";
import { connect } from "react-redux";
import SheduleModal from "./shedule-modal";
import BulidSuccessModal from "./build-success-modal";
import moment from "moment";
import { MessageAlert } from "../../../components";

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

const SheduleBuild = ({
  executionId,
  modalBuildFinished,
  selectedModelTypeData,
}) => {
  const [form] = Form.useForm();
  const [activeButton, setActiveButton] = useState(null);
  const [sheduleSuccess, setSheduleSuccess] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  //Production
  const [sheduleName, setSheduleName] = useState(null);
  //Development
  const [developmentSheduleName, setDevelopmenetSheduleName] = useState(null);
  // Production
  const [schedulePeriodType, setSchedulePeriodType] = useState(null);
  const [scheduleTime, setScheduleTime] = useState(null);
  const [scheduleDays, setScheduleDays] = useState(null);
  const [scheduleDayOfMonth, setScheduleDayOfMonth] = useState(null);
  const [scheduleMonthCount, setScheduleMonthCount] = useState(null);

  // Development
  const [developmentSchedulePeriodType, setDevelopmentSchedulePeriodType] =
    useState(null);
  const [developmentScheduleTime, setDevelopmentScheduleTime] = useState(null);
  const [developmentScheduleDays, setDevelopmentScheduleDays] = useState(null);
  const [developmentScheduleDayOfMonth, setDevelopmentScheduleDayOfMonth] =
    useState(null);
  const [developmentScheduleMonthCount, setDevelopmentScheduleMonthCount] =
    useState(null);

  const [loading, setLoading] = useState(false);
  const [modalBuildFinishedStatus, setModalBuildFinishedStatus] =
    useState(false);
  const [sheduleFail, setSheduleFail] = useState(false);

  const onFieldsChange = (values) => {
    //Production

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

    //Development 1

    const developmentFormDataField = values.length > 0 && values[0]["name"][0];
    if (developmentFormDataField === "developmentSchedulePeriod") {
      setDevelopmentSchedulePeriodType(values[0]["value"]);
    }
    if (developmentFormDataField === "developmentScheduleTime") {
      setDevelopmentScheduleTime(moment(values[0]["value"]).format("HHmmss"));
    }

    if (developmentFormDataField === "developmentScheduleDays") {
      const dataValues =
        values[0]["value"].length > 0 ? values[0]["value"].join(",") : null;
      setDevelopmentScheduleDays(dataValues);
    }
    if (developmentFormDataField === "developmentDayToStart") {
      setDevelopmentScheduleDayOfMonth(values[0]["value"]);
    }
    if (developmentFormDataField === "developmentScheduleMonthInterval") {
      setDevelopmentScheduleMonthCount(values[0]["value"]);
    }

    //Production

    if (schedulePeriodType) {
      if (schedulePeriodType === "NoSchedule") {
        setActiveButton(true);
      }
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

    //Development

    if (developmentSchedulePeriodType) {
      if (developmentSchedulePeriodType === "NoSchedule") {
        setActiveButton(true);
      }
      if (
        developmentSchedulePeriodType === "Daily" &&
        developmentScheduleTime
      ) {
        setActiveButton(true);
      }
      if (
        developmentSchedulePeriodType === "Weekly" &&
        developmentScheduleTime &&
        developmentScheduleDays
      ) {
        setActiveButton(true);
      }
      if (
        developmentSchedulePeriodType === "Monthly" &&
        developmentScheduleTime &&
        developmentScheduleDayOfMonth &&
        developmentScheduleMonthCount
      ) {
        setActiveButton(true);
      }

      if (developmentSchedulePeriodType && developmentScheduleTime) {
        if (
          developmentSchedulePeriodType === "Weekly" &&
          !developmentScheduleDays
        ) {
          setActiveButton(false);
        }
        if (
          developmentSchedulePeriodType === "Monthly" &&
          !developmentScheduleDayOfMonth &&
          !developmentScheduleMonthCount
        ) {
          setActiveButton(false);
        }
      }

      if (!developmentSchedulePeriodType && !developmentScheduleTime) {
        setActiveButton(false);
      }
    } else {
      setActiveButton(false);
    }
  };
  //production
  const sheduleModel = async () => {
    const sheduleData = moment().format("YYYY-MM-DD HH:mm:ss");
    setSheduleName(sheduleData);
    setModalVisible(true);
  };

  const handleBuildNameSave = async (modelBuildName) => {
    const dataObj = {
      //production
      startDate: sheduleName,
      excutionId: executionId.Value,
      userId: selectedModelTypeData.UserID,
      sp: selectedModelTypeData.Sp_BuildPipeLine,
      modelId: selectedModelTypeData.ModelID,
      period: schedulePeriodType,
      time: scheduleTime,
      days: scheduleDays,
      dayToStart: scheduleDayOfMonth,
      noOfMonthsContinue: scheduleMonthCount,
      modelBuildName: modelBuildName,
      //development

      developmentStartDate: developmentSheduleName,
      developmentPeriod: developmentSchedulePeriodType,
      developmentTime: developmentScheduleTime,
      developmentDays: developmentScheduleDays,
      developmentDayToStart: developmentScheduleDayOfMonth,
      developmentMonths: developmentScheduleMonthCount,
    };
    setLoading(true);
    try {
    const response = await buildModelStartApi(dataObj);
      const data = response.data.body[0];
      if (data) {
        setSheduleSuccess(true);
        setLoading(false);
        setModalVisible(false);
        setModalBuildFinishedStatus(true);
      }
    } catch (error) {
      setLoading(false);
      setSheduleSuccess(false);
      setSheduleFail(true);
      setModalVisible(false);
    }
  };

  return (
    <div className="model-build-container">
      <div className="form-container">
        <span className="header-section"> Schedule your model</span>
        <span className="header-message">
          Select period and time to run your model
        </span>

        <Form
          ref={form}
          onFinish={sheduleModel}
          onFieldsChange={onFieldsChange}
          className="build-form"
        >
          <Row>
            <Col span={4} offset={2}>
              <h2 style={{ marginTop: "35px", float: "left" }}>Production</h2>
            </Col>
            <Col span={12}>
              <FormItem
                className="build-input-item-left"
                name="schedulePeriod"
                rules={[
                  {
                    required: true,
                  },
                ]}
                label="Occurs*"
              >
                <Select
                  defaultValue=""
                  className="schedule-period-select"
                  placeholder="Select period"
                >
                  <Option value="NoSchedule">No Schedule</Option>
                  <Option value="Daily">Daily</Option>
                  <Option value="Weekly">Weekly</Option>
                  <Option value="Monthly">Monthly</Option>
                </Select>
              </FormItem>

              {schedulePeriodType !== "NoSchedule" && (
                <FormItem
                  className="build-input-item-right"
                  name="scheduleTime"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  label="Time*"
                >
                  <TimePicker
                    format={format}
                    className="schedule-time-select"
                  />
                </FormItem>
              )}

              {schedulePeriodType === "Monthly" && (
                <div className="schedule-input-container">
                  <Row align={"middle"}>
                    <Col span={1} className="schedule-monthly-text">
                      Day*
                    </Col>
                    <Col span={5}>
                      <FormItem
                        className="build-input-item-center"
                        name="dayToStart"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          defaultValue=""
                          className="schedule-period-select"
                          placeholder="Select day"
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
                    <Col span={2} className="schedule-monthly-text">
                      of every
                    </Col>
                    <Col span={5}>
                      <FormItem
                        className="build-input-item-center"
                        name="scheduleMonthInterval"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          defaultValue=""
                          className="schedule-period-select"
                          placeholder="Select month"
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
                    <Col span={2} className="schedule-monthly-text">
                      month(s)*
                    </Col>
                  </Row>
                </div>
              )}

              {schedulePeriodType === "Weekly" && (
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
            </Col>
          </Row>

          <Row>
            <Col span={4} offset={2}>
              <h2 style={{ marginTop: "35px", float: "left" }}>Training</h2>
            </Col>
            <Col span={12}>
              <FormItem
                className="build-input-item-left"
                name="developmentSchedulePeriod"
                rules={[
                  {
                    required: true,
                  },
                ]}
                label="Occurs*"
              >
                <Select
                  defaultValue=""
                  className="schedule-period-select"
                  placeholder="Select period"
                >
                  <Option value="NoSchedule">No Schedule</Option>
                  <Option value="Daily">Daily</Option>
                  <Option value="Weekly">Weekly</Option>
                  <Option value="Monthly">Monthly</Option>
                </Select>
              </FormItem>

              {developmentSchedulePeriodType !== "NoSchedule" && (
                <FormItem
                  className="build-input-item-right"
                  name="developmentScheduleTime"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  label="Time*"
                >
                  <TimePicker
                    format={format}
                    className="schedule-time-select"
                  />
                </FormItem>
              )}

              {developmentSchedulePeriodType === "Monthly" && (
                <div className="schedule-input-container">
                  <Row align={"middle"}>
                    <Col span={1} className="schedule-monthly-text">
                      Day*
                    </Col>
                    <Col span={5}>
                      <FormItem
                        className="build-input-item-center"
                        name="developmentDayToStart"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          defaultValue=""
                          className="schedule-period-select"
                          placeholder="Select day"
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
                    <Col span={2} className="schedule-monthly-text">
                      of every
                    </Col>
                    <Col span={5}>
                      <FormItem
                        className="build-input-item-center"
                        name="developmentScheduleMonthInterval"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          defaultValue=""
                          className="schedule-period-select"
                          placeholder="Select month"
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
                    <Col span={2} className="schedule-monthly-text">
                      month(s)*
                    </Col>
                  </Row>
                </div>
              )}

              {developmentSchedulePeriodType === "Weekly" && (
                <div className="schedule-checkbox-container">
                  <FormItem
                    name="developmentScheduleDays"
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
            </Col>
          </Row>

          {sheduleFail && (
            <MessageAlert
              message={`The model failed to schedule.
            `}
              type={"error"}
            />
          )}

          {!sheduleSuccess && (
            <Button
              type="primary"
              htmlType="submit"
              disabled={!activeButton ? "disabled" : ""}
              className={
                !activeButton
                  ? "form-submit-button"
                  : "form-submit-button active"
              }
            >
              {schedulePeriodType !== "NoSchedule" ? "Schedule" : "Finish"}
            </Button>
          )}

          {
            <SheduleModal
              modalVisible={modalVisible}
              width={500}
              customClass={"shedule-modal"}
              handleBuildNameSave={handleBuildNameSave}
              loading={loading}
              handleCancel={() => setModalVisible(false)}
            />
          }

          {
            <BulidSuccessModal
              modalVisible={modalBuildFinishedStatus}
              width={500}
              customClass={"shedule-modal"}
              loading={loading}
              handleCancel={() => setModalBuildFinishedStatus(false)}
            />
          }
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state.mainViewState.userData,
  executionId: state.modelBuildState.executionData,
  endResult: state.modelBuildState.EndResult,
  modelBuildStartStatus: state.modelBuildState.modelBuildStartStatus,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SheduleBuild);
