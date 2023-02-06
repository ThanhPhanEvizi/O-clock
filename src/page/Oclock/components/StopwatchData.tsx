import { Collapse, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { Col, Row, UiScrollBar } from "../../../elements";
import { DataTimeProps } from "../../../types/models/app";
import { convertingMillisecondsToTime } from "../../../until/helpers";
import { TransitionGroup } from "react-transition-group";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  dataTimeList: DataTimeProps[];
  handleRemoveItem: (key: string) => void;
}

const StopwatchData = ({ dataTimeList, handleRemoveItem }: Props) => {
  return (
    <Col
      sx={{
        paddingTop: "20px",
        width: "100%",
        maxHeight: "80%",
      }}
    >
      <Typography sx={{ fontWeight: "bold", fontSize: "1.25em" }}>
        Stopwatch Data
      </Typography>
      <Grid container columns={14} sx={{ fontWeight: "bold" }}>
        <Grid item xs={1}>
          #
        </Grid>
        <Grid item xs={3}>
          Time Ring
        </Grid>
        <Grid item xs={3}>
          Time Has Passed
        </Grid>
        <Grid item xs={5}>
          The Present Time
        </Grid>
        <Grid item xs={1}>
          Remove
        </Grid>
      </Grid>
      <Divider sx={{ margin: "10px 0px" }} />
      <UiScrollBar>
        <TransitionGroup>
          {dataTimeList.map((dataTime: DataTimeProps, index: number) => {
            return (
              <Collapse key={dataTime.key}>
                <Grid container columns={14} sx={{ padding: "2px 0px" }}>
                  <Grid item xs={1}>
                    <Typography>{index + 1}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>
                      {convertingMillisecondsToTime(dataTime.timeLoop)}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>
                      {convertingMillisecondsToTime(dataTime.time)}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography>{dataTime.presentTime}</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Row
                      onClick={() => handleRemoveItem(dataTime.key)}
                      sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <DeleteIcon />
                    </Row>
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

export default StopwatchData;
