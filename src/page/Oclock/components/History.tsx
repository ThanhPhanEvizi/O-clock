import React, { useState } from "react";
import { Collapse, Divider, Grid, Typography } from "@mui/material";
import moment from "moment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TransitionGroup } from "react-transition-group";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Col, Row, UiModal, UiScrollBar } from "../../../elements";
import { DataTimeProps, HistoryDataTimeProps } from "../../../types/models/app";
import {
  convertingMillisecondsToTime,
  formatDateDetail,
} from "../../../until/helpers";

interface Props {
  history: HistoryDataTimeProps[];
  isOpen: boolean;
  handleClose: any;
}

const StopwatchData = ({ dataTime }: { dataTime?: HistoryDataTimeProps }) => {
  return (
    <Col
      sx={{
        paddingTop: "20px",
        width: "100%",
        maxHeight: "62%",
      }}
    >
      <Typography sx={{ fontWeight: "bold", fontSize: "1.25em" }}>
        Stopwatch Data
      </Typography>
      <Grid container columns={13} sx={{ fontWeight: "bold" }}>
        <Grid item xs={1}>
          #
        </Grid>
        <Grid item xs={4}>
          Time Ring
        </Grid>
        <Grid item xs={4}>
          Time Has Passed
        </Grid>
        <Grid item xs={4}>
          The Present Time
        </Grid>
      </Grid>
      <Divider sx={{ margin: "10px 0px" }} />
      <UiScrollBar>
        <TransitionGroup>
          {dataTime?.data.map((dataTime: DataTimeProps, index: number) => {
            return (
              <Collapse>
                <Grid container columns={13} sx={{ padding: "2px 0px" }}>
                  <Grid item xs={1}>
                    <Typography>{index + 1}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>
                      {convertingMillisecondsToTime(dataTime.timeLoop)}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>
                      {convertingMillisecondsToTime(dataTime.time)}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>
                      {formatDateDetail(dataTime.presentTime)}
                    </Typography>
                  </Grid>
                </Grid>
              </Collapse>
            );
          })}
        </TransitionGroup>
      </UiScrollBar>
    </Col>
  );
};

const HistoryModal = ({ history, isOpen, handleClose }: Props) => {
  const [dataTime, setDataTime] = useState<HistoryDataTimeProps>();
  const [selected, setSelected] = useState<number>();

  return (
    <UiModal open={isOpen} onClose={handleClose} width="60%">
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "2em",
          fontWeight: "bold",
        }}
      >
        History
      </Typography>
      <Row sx={{ height: "70vh", width: "100%" }}>
        <Grid container spacing={2} sx={{ height: "100%" }}>
          <Grid
            item
            xs={6}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {history.map((data: HistoryDataTimeProps, key: number) => {
              const isSelected = selected === key;
              return (
                <Row
                  onClick={() => {
                    setDataTime(data);
                    setSelected(key);
                  }}
                  sx={{
                    alignItems: "center",
                    marginBottom: "5px",
                    justifyContent: "space-between",
                    backgroundColor: isSelected
                      ? "rgba(217, 211, 214, 0.8)"
                      : "",
                    padding: "5px 20px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "rgba(217, 211, 214, 0.8)",
                    },
                  }}
                >
                  <Row>
                    <Typography sx={{ alignItems: "center" }}>
                      <span style={{ fontWeight: "bold" }}>
                        Timer Starts at:{" "}
                      </span>
                      {moment(data.time_start).format("hh:mm:ss a")}
                    </Typography>
                    <ArrowForwardIcon />
                    <Typography sx={{ marginRight: "10px" }}>
                      {moment(data.time_end).format("hh:mm:ss a")}
                    </Typography>
                  </Row>
                  {isSelected && (
                    <RemoveRedEyeIcon sx={{ cursor: "pointer" }} />
                  )}
                </Row>
              );
            })}
          </Grid>
          <Grid item xs={6}>
            <Col sx={{ width: "100%", height: "100%" }}>
              <StopwatchData dataTime={dataTime} />
            </Col>
          </Grid>
        </Grid>
      </Row>
    </UiModal>
  );
};

export default HistoryModal;
