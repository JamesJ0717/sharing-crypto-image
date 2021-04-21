import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import axios, { AxiosResponse } from "axios";

import Quote from "@interfaces/Quote";

const formatter = new Intl.NumberFormat("en-us", {
  style: "currency",
  minimumFractionDigits: 2,
  currency: "USD",
});

const fetcher = (url: string) =>
  axios.get(process.env.HOST + url).then((r: AxiosResponse) => r.data);

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(process.env.HOST);
  const quote: Quote = await fetcher(
    "/api/cmc/quote?coin=" + context.params.coin
  );

  let data = {
    id: quote.id,
    name: quote.name,
    price: formatter.format(quote.quote.USD.price),
    change: quote.quote.USD.percent_change_24h.toFixed(2),
    rank: quote.cmc_rank,
    cap: formatter.format(quote.quote.USD.market_cap),
    volume: formatter.format(quote.quote.USD.volume_24h),
  };
  let image = (
    await axios.post(`${process.env.HOST}/api/image`, {
      data,
    })
  ).data.data;

  return {
    props: {
      quote,
      image,
    },
  };
};

export default function Home({
  quote,
  image,
}: {
  quote: Quote;
  image: string;
}) {
  return (
    <div>
      <Head>
        <title>
          {quote.name} | {formatter.format(quote.quote.USD.price)}
        </title>
        <meta
          property="og:title"
          content={`${quote.name} | ${formatter.format(quote.quote.USD.price)}`}
        ></meta>
        <meta
          property="og:image"
          content={
            (typeof window !== "undefined"
              ? window.location.host
              : "http://localhost:3000") + image
          }
        ></meta>
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <div id="quote" className="flex flex-col py-4 space-y-4">
        <div>
          {quote && (
            <div className="">
              <div className="flex flex-col border-2 rounded-2xl p-4">
                <div className="flex flex-row justify-around h-16 items-center">
                  <img
                    src={`https://s2.coinmarketcap.com/static/img/coins/32x32/${quote.id}.png`}
                  />
                  <span className="text-3xl">{quote.name}</span>
                  <span className="text-3xl items-center">
                    {formatter.format(quote.quote.USD.price)}{" "}
                    {quote.quote.USD.percent_change_24h > 0 ? (
                      <span className="text-lg text-green-500">
                        ({quote.quote.USD.percent_change_24h.toFixed(2)}%)
                      </span>
                    ) : (
                      <span className="text-lg text-red-500">
                        ({quote.quote.USD.percent_change_24h.toFixed(2)}%)
                      </span>
                    )}
                  </span>
                </div>
                <hr className="m-2" />
                <div className="flex flex-row justify-around">
                  <span className="flex flex-col">
                    Rank:
                    <span>
                      <hr />
                      {quote.cmc_rank}
                    </span>
                  </span>
                  <span className="flex flex-col">
                    Market Cap:
                    <span>
                      <hr />
                      {formatter.format(quote.quote.USD.market_cap)}
                    </span>
                  </span>
                  <span className="flex flex-col">
                    24HR Volume:
                    <span>
                      <hr />
                      {formatter.format(quote.quote.USD.volume_24h)}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
