import "./App.css";
import axios from "axios";
import ReactGa from 'react-ga';
import React, { useEffect, useState } from "react";
import LotteryCard from "./LotteryCard";
import { Container, Divider, Grid } from "@material-ui/core";
var parseString = require("xml2js").parseString;

function App( {domElement} ) {
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const urlParams = new URLSearchParams(window.location.search);
  const url = urlParams.get("url");
  const trackingId = domElement.getAttribute("data-tracking")

  useEffect(() => {
    ReactGa.initialize(trackingId, {
      gaOptions: {
        name: 'lottery-widget'
      }
    })
    ReactGa.pageview(window.location.pathname)
    // Fetch data from lottery
    setLoading(true);

    (async () => {
      try {
        let endpoint =
          url ||
          "http://www.lotterynumbersxml.com/lotterydata/playoctopus.com/baqydu9a6/lottery.xml";
        let res = await axios.get(endpoint?.replace(/^.*\/\/[^\/]+/, ""));

        let data = res.data;
        parseString(data, function (err, result) {
          console.log(result);
          setData(result?.LotteryFeed?.games[0]?.game || []);
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    })();
  }, [url]);

  return (
    <div className="lottery_widget__app">
      <h1 className="lottery_widget__header">Lottery.com </h1>

      <Container>
        <div
          className="lottery_widget__inner"
          style={{
            textAlign: "center",
          }}
        >
          {"with XML link"}
        </div>
        <div className="lottery_widget__inner">
          {loading && "Loading..."}
          {error && error}
        </div>
        <Grid container spacing={3}>
          {!!data.length &&
            data.map((item, idx) => (
              <LotteryCard key={idx} data={item} idx={idx} />
            ))}
        </Grid>
      </Container>
      <Divider style={{ marginBlock: 30 }} />
      <Container>
        <div
          className="lottery_widget__inner"
          style={{
            textAlign: "center",
          }}
        >
          {"without XML link"}
        </div>
        <Grid container spacing={3}>
          {[...Array(8)]?.map((item, idx) => (
            <LotteryCard key={idx} data={item} idx={idx} />
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
