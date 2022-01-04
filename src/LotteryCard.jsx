import React from "react";
import {
  Card,
  Grid,
  Typography,
  Chip,
  Box,
  styled,
  Button,
  Divider,
  Link,
} from "@material-ui/core";
import PowerImg from "./MUPB.png";

function convertToCurrencySystem(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? Math.abs(Number(labelValue)) / 1.0e9 + " BILLION"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? Math.abs(Number(labelValue)) / 1.0e6 + " MILLION"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? Math.abs(Number(labelValue)) / 1.0e3 + " THOUSANDS"
    : Math.abs(Number(labelValue));
}

const CardMediaStyle = styled("div")(() => ({
  display: "flex",
  position: "relative",
  justifyContent: "center",
  "&:before": {
    position: "absolute",
    borderRadius: "10px 10px 0px 0px",
    content: "''",
    width: "100%",
    height: 5,
    backgroundColor: "#d80000",
  },
}));

const PastLotteries = ({ data }) => {
  const items = data?.split(",");

  return (
    <>
      <Box align="center" sx={{ marginInline: 45 }}>
        {items[0]?.split("-")?.map((tag, idx) => (
          <Chip
            label={tag}
            variant="outlined"
            size="small"
            style={{
              margin: 2,
            }}
            key={idx}
          />
        ))}
        <Chip
          label={items[1]?.split(":")[1]}
          variant="outlined"
          size="small"
          style={{
            margin: 2,
            background: "#d80000",
            color: "#fff",
          }}
        />
      </Box>

      <Typography
        variant="body2"
        align="center"
        style={{ color: "#666", mt: 5 }}
      >
        {items[2]?.split(":")?.map((_item1, idx) =>
          idx === 0 ? (
            `${_item1}:`
          ) : (
            <strong key={idx} style={{ color: "#000" }}>
              {" "}
              {_item1}x{" "}
            </strong>
          )
        )}
      </Typography>
    </>
  );
};

export default function LotteryCard({ data, idx }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
      <Card style={{ borderRadius: 10 }}>
        <CardMediaStyle>
          <p></p>
        </CardMediaStyle>
        <div
          style={{
            display: "flex",
            position: "relative",
            justifyContent: "center",
            marginBottom: 10,
            marginTop: -20,
          }}
        >
          <img src={PowerImg} width={150} alt="" />
        </div>
        <Typography variant="body2" style={{ color: "#aaa" }} align="center">
          Jackpot
        </Typography>
        <Typography variant="h6" align="center" style={{ fontWeight: 900 }}>
          ${data ? convertToCurrencySystem(data?.jackpot[0]?._) : "50 MILLION"}
        </Typography>

        <Typography variant="body2" style={{ color: "#aaa" }} align="center">
          Next Draw
        </Typography>

        <Typography variant="body2" align="center" style={{ fontWeight: 700 }}>
          {data
            ? new Date(data?.nextdraw_date[0])?.toDateString()
            : new Date().toDateString()}
        </Typography>

        <Typography align="center" style={{ marginTop: 10 }}>
          <Button
            variant="contained"
            style={{
              background: "#00c600",
              color: "#fff",
              fontWeight: 600,
            }}
            size="small"
            align="center"
          >
            GET TICKETS
          </Button>
        </Typography>

        <Divider style={{ marginBlock: 10 }} />

        <Typography
          variant="body2"
          style={{ color: "#aaa", marginBottom: 10 }}
          align="center"
        >
          Last Draw Results:
        </Typography>

        <Typography
          variant="body2"
          align="center"
          style={{ mt: 5, fontWeight: 700 }}
        >
          {" "}
          {data
            ? new Date(data?.lastdraw_date[0])?.toDateString()
            : new Date().toDateString()}
        </Typography>

        {data?.lastdraw_numbers?.length > 0 ? (
          <PastLotteries data={data?.lastdraw_numbers[0]} />
        ) : (
          <>
            <Box align="center" sx={{ marginInline: 45 }}>
              {[12, 32, 54, 63]?.map((tag, idx) => (
                <Chip
                  label={tag}
                  variant="outlined"
                  size="small"
                  style={{
                    margin: 2,
                  }}
                  key={idx}
                />
              ))}
              <Chip
                label={20}
                variant="outlined"
                size="small"
                style={{
                  margin: 2,
                  background: "#d80000",
                  color: "#fff",
                }}
              />
            </Box>

            <Typography
              variant="body2"
              align="center"
              style={{ color: "#666", mt: 5 }}
            >
              Powerplay:
              <strong style={{ color: "#000" }}>2x</strong>
            </Typography>
          </>
        )}
        <Typography
          variant="body2"
          align="center"
          style={{
            marginTop: 15,
            padding: 5,
          }}
        >
          <Link to={"/"} underline="always" style={{ color: "#aaa" }}>
            More Results
          </Link>
        </Typography>
      </Card>
    </Grid>
  );
}
