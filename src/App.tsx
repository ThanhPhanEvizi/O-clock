import {
  Box,
  ButtonBaseProps,
  Collapse,
  Grid,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { TransitionGroup } from "react-transition-group";
import moment from "moment";

interface ButtonProps extends ButtonBaseProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

interface DataTimeProps {
  presentTime: string;
  time: number;
}

const Row = (p: any) => {
  return <Box display="flex" flexDirection="row" {...p} />;
};

const Col = (p: any) => {
  return <Box display="flex" flexDirection="column" {...p} />;
};

const BoxStyle = (p: any) => {
  return (
    <Row
      sx={{
        borderRadius: "50%",
        border: "1px solid black",
        width: "200px",
        height: "200px",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...p}
    />
  );
};

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

function formatTime(time: number) {
  if (time >= 10) return time;
  return "0" + time;
}

function convertingMilliseconds(milliseconds: number) {
  const seconds = milliseconds % 60;
  const minutes = Math.floor(milliseconds / 60) % 60;
  const hours = Math.floor(milliseconds / 3600);
  return { minutes: minutes, seconds: seconds, hours: hours };
}

function convertingMillisecondsToTime(milliseconds: number) {
  const { minutes, seconds, hours } = convertingMilliseconds(milliseconds);
  return (
    formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds)
  );
}

const StopwatchData = ({ dataTimeList }: { dataTimeList: DataTimeProps[] }) => {
  return (
    <Col
      sx={{
        width: "100%",
        marginTop: "20px",
      }}
    >
      <Typography sx={{ fontWeight: "bold", fontSize: "1.25em" }}>
        Stopwatch Data
      </Typography>
      <Grid container columns={13} sx={{ fontWeight: "bold" }}>
        <Grid item xs={1}>
          #
        </Grid>
        <Grid item xs={6}>
          Time Has Passed
        </Grid>
        <Grid item xs={6}>
          The Present Time
        </Grid>
      </Grid>
      <TransitionGroup>
        {dataTimeList.map((dataTime: DataTimeProps, index: number) => {
          return (
            <Collapse>
              <Grid container columns={13} sx={{ padding: "2px 0px" }}>
                <Grid item xs={1}>
                  <Typography>{index + 1}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {convertingMillisecondsToTime(dataTime.time)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{dataTime.presentTime}</Typography>
                </Grid>
              </Grid>
            </Collapse>
          );
        })}
      </TransitionGroup>
    </Col>
  );
};

const TimeCounter = ({ time }: { time: number }) => {
  const { hours, minutes, seconds } = convertingMilliseconds(time);
  return (
    <Row
      sx={{
        alignItems: "center",
        margin: "20px 0px",
        "& .MuiTypography-root": {
          fontSize: "8rem",
        },
      }}
    >
      <BoxStyle>
        <Typography>{formatTime(hours)}</Typography>
      </BoxStyle>
      <Box sx={{ margin: "0px 10px" }}>
        <Typography>:</Typography>
      </Box>
      <BoxStyle>
        <Typography>{formatTime(minutes)}</Typography>
      </BoxStyle>
      <Box sx={{ margin: "0px 10px" }}>
        <Typography>:</Typography>
      </Box>
      <BoxStyle>
        <Typography>{formatTime(seconds)}</Typography>
      </BoxStyle>
    </Row>
  );
};

function App() {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isPause, setIsPause] = useState<boolean>(false);
  const [timer, setTimer] = useState(0);
  const [dataTimeList, setTime] = useState<DataTimeProps[]>([]);

  useEffect(() => {
    if (isStart && !isPause) {
      const interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPause, isStart]);

  const handlePressTime = () => {
    setTime((prev) => [
      ...prev!,
      { time: timer, presentTime: moment().format("DD-MM-yyyy, h:mm:ss a") },
    ]);
  };

  const handleReset = () => {
    setIsPause(false);
    setIsStart(false);
    setTimer(0);
  };

  const handleClearData = () => {
    setTime([]);
  };

  return (
    <div className="App">
      <Col
        sx={{
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
          paddingBottom: "50px ",
        }}
      >
        <Col
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            height: "10%",
            borderBottom: "1px solid black",
          }}
        >
          <Typography sx={{ fontSize: "3rem" }}>Stopwatch</Typography>
        </Col>
        <TimeCounter time={timer} />
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
                onClick={() => setIsStart(true)}
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

          {!!dataTimeList.length && (
            <>
              <StopwatchData dataTimeList={dataTimeList} />
              <ButtonStyle onClick={handleClearData} sx={{ marginTop: "10px" }}>
                Clear Data
              </ButtonStyle>
            </>
          )}
        </Col>
      </Col>
    </div>
  );
}

export default App;
