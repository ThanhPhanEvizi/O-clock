import { Button, ButtonProps, Grid, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Row } from "../../../elements";
import { DataTimeProps, HistoryDataTimeProps } from "../../../types/models/app";
import { convertingMillisecondsToTime } from "../../../until/helpers";
import StopwatchData from "../components/StopwatchData";
import TimeCounter from "../components/TimeCounter";
import HistoryIcon from "@mui/icons-material/History";
import HistoryModal from "../components/History";
import uuid from "react-uuid";

const ButtonStyle = ({ children, sx, onClick }: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        minWidth: "100px",
        textTransform: "none",
        padding: "10px 0px",
        borderRadius: "12px",
        fontSize: "1.4rem",
        color: "black",
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

const OclockPage = () => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isPause, setIsPause] = useState<boolean>(false);
  const [timer, setTimer] = useState(0);
  const [dataTimeList, setTime] = useState<DataTimeProps[]>([]);
  const [timeLoop, setTimeLoop] = useState<number>(0);
  const [history, setHistory] = useState<HistoryDataTimeProps[]>([]);
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState<boolean>(false);
  const [timeStart, setTimeStart] = useState<string>("");

  useEffect(() => {
    if (isStart && !isPause) {
      const interval = setInterval(() => {
        setTimer((timer) => timer + 1);
        setTimeLoop(timeLoop + 1);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [isPause, isStart, timeLoop]);

  const addDataTime = () => {
    setTime((prev) => [
      ...prev!,
      {
        key: uuid(),
        time: timer,
        presentTime: moment().format("DD-MM-yyyy, h:mm:ss a"), //("DD-MM-yyyy, h:mm:ss a")
        timeLoop,
      },
    ]);
  };

  const handleStart = () => {
    setIsStart(true);
    setTimeStart(moment().format("DD-MM-yyyy, h:mm:ss a"));
  };

  const handlePressTime = () => {
    addDataTime();
    setTimeLoop(0);
  };

  const handleReset = () => {
    addDataTime();
    setIsPause(false);
    setIsStart(false);
    setTimer(0);
  };

  const handleClearAndSave = () => {
    setHistory((prev) => [
      ...prev!,
      {
        time_end: moment().format("DD-MM-yyyy, h:mm:ss a"),
        data: dataTimeList,
        time_start: timeStart,
      },
    ]);
    handleReset();
    setTime([]);
    setTimeLoop(0);
  };

  const handleClearData = () => {
    setTime([]);
    setTimeLoop(0);
  };

  const handleRemoveItem = (key: string) => {
    const index = dataTimeList.findIndex((data) => data.key === key);
    if (index > -1) {
      dataTimeList.splice(index, 1);
    }
  };

  return (
    <div className="App">
      <Col
        sx={{
          height: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Col
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            height: "10%",
            borderBottom: "1px solid black",
            position: "relative",
          }}
        >
          <Typography sx={{ fontSize: "3rem" }}>Stopwatch</Typography>
          {!!history.length && (
            <HistoryIcon
              onClick={() => setIsOpenHistoryModal(true)}
              sx={{ position: "absolute", right: "5%", cursor: "pointer" }}
            />
          )}
        </Col>
        <Row sx={{ height: "100%", padding: "0px 20px", overflow: "hidden" }}>
          <Col sx={{ alignItems: "center", justifyContent: "center" }}>
            <TimeCounter time={timer} />
            {convertingMillisecondsToTime(timeLoop)}
            <Col
              sx={{
                width: "45%",
                margin: "20px 0px",
              }}
            >
              <Row
                sx={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {!isStart && (
                  <ButtonStyle
                    sx={{ width: "100%", backgroundColor: "#3abff8" }}
                    onClick={handleStart}
                  >
                    Start
                  </ButtonStyle>
                )}
                {isStart && !isPause && (
                  <>
                    <ButtonStyle
                      onClick={() => setIsPause(true)}
                      sx={{
                        width: "48%",
                        backgroundColor: "#f4c152",
                        "&:hover": {
                          backgroundColor: "#f4c152",
                        },
                      }}
                    >
                      Pause
                    </ButtonStyle>
                    <ButtonStyle
                      onClick={handlePressTime}
                      sx={{
                        width: "48%",
                        backgroundColor: "#828df8",
                        "&:hover": {
                          backgroundColor: "#394cf3",
                        },
                      }}
                    >
                      Press
                    </ButtonStyle>
                  </>
                )}
                {isStart && isPause && (
                  <>
                    <ButtonStyle
                      onClick={() => setIsPause(false)}
                      sx={{
                        width: "48%",
                        backgroundColor: "#2bd4bd",
                        "&:hover": {
                          backgroundColor: "#2bd4bd",
                        },
                      }}
                    >
                      Continue
                    </ButtonStyle>
                    <ButtonStyle
                      onClick={handleReset}
                      sx={{
                        width: "48%",
                        backgroundColor: "#fb6f84",
                        "&:hover": {
                          backgroundColor: "#fb6f84",
                        },
                      }}
                    >
                      Reset
                    </ButtonStyle>
                  </>
                )}
              </Row>
            </Col>
          </Col>
          <Col sx={{ width: "100%" }}>
            {!!dataTimeList.length && (
              <>
                <StopwatchData
                  dataTimeList={dataTimeList}
                  handleRemoveItem={handleRemoveItem}
                />
                <Grid
                  container
                  spacing={2}
                  sx={{ marginTop: "10px", justifyContent: "space-between" }}
                >
                  <Grid item xs={6}>
                    <ButtonStyle
                      onClick={handleClearData}
                      sx={{
                        width: "100%",
                        backgroundColor: "#f4c152",
                        "&:hover": {
                          backgroundColor: "#f4c152",
                        },
                      }}
                    >
                      Clear Data
                    </ButtonStyle>
                  </Grid>
                  <Grid item xs={6}>
                    <ButtonStyle
                      onClick={handleClearAndSave}
                      sx={{
                        width: "100%",
                        backgroundColor: "#fb6f84",
                        "&:hover": {
                          backgroundColor: "#fb6f84",
                        },
                      }}
                    >
                      Clear and Save Data
                    </ButtonStyle>
                  </Grid>
                </Grid>
              </>
            )}
          </Col>
        </Row>
        <HistoryModal
          history={history}
          isOpen={isOpenHistoryModal}
          handleClose={() => setIsOpenHistoryModal(false)}
        />
      </Col>
    </div>
  );
};

export default OclockPage;
