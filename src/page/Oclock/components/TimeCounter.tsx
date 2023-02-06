import { Box, Typography } from "@mui/material";
import React from "react";
import { Row } from "../../../elements";
import { convertingMilliseconds, formatTime } from "../../../until/helpers";

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

const TimeCounter = ({ time }: { time: number }) => {
  const { hours, minutes, seconds, milliSecond } = convertingMilliseconds(time);
  return (
    <Row sx={{ margin: "20px 0px", alignItems: "flex-end" }}>
      <Row
        sx={{
          alignItems: "center",
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
      <Box>
        <Typography sx={{ fontSize: "3rem", minWidth: "80px" }}>
          {formatTime(milliSecond)}
        </Typography>
      </Box>
    </Row>
  );
};

export default TimeCounter;
