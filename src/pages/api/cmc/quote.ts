import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import Coin from "@interfaces/Coin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map",
    params: { aux: "", CMC_PRO_API_KEY: process.env.CMC_API },
  };

  console.log(req.query["coin"].toLocaleString().toLowerCase());

  await axios
    .request(options)
    .then(async function (response) {
      let map: Coin[] = response.data.data;
      let coinID = map.find(
        (x) =>
          x.name.toLowerCase() ==
          req.query["coin"].toLocaleString().toLowerCase()
      ).id;
      console.log(coinID);
      const options: AxiosRequestConfig = {
        method: "GET",
        url:
          "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
        params: {
          id: coinID,
          aux: "",
          CMC_PRO_API_KEY: process.env.CMC_API,
        },
      };

      await axios
        .request(options)
        .then(function (response) {
          return res.status(200).json(response.data.data[coinID]);
        })
        .catch(function (error: AxiosError) {
          // console.error({ error });
          return res.json({ status: error.code, error: error.message });
        });
    })
    .catch(function (error: AxiosError) {
      // console.error({ error });
      return res.json({ status: error.code, error: error.message });
    });
};
