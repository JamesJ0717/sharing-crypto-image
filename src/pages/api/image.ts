import { NextApiResponse, NextApiRequest } from "next";
import nodeHtmlToImage from "node-html-to-image";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, name, price, change, rank, cap, volume } = req.body.data;
  const time = new Date().getTime();
  console.log(req);
  const image = await nodeHtmlToImage({
    html: `<html>
    <body>
    <style>
     body {
         height: 630px;
         width: 1200px;
     }
    </style>
     <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.css" rel="stylesheet">
      <div>
        <div class="">
          <div class="flex flex-col border-2 rounded-2xl p-4">
            <div class="flex flex-row justify-around h-16 items-center">
              <img
                src="https://s2.coinmarketcap.com/static/img/coins/32x32/{{id}}.png"
              />
              <span class="text-3xl">{{name}}</span>
              <span class="text-3xl items-center">
                {{price}} ({{change}}%)
              </span>
            </div>
            <hr class="m-2" />
            <div class="flex flex-row justify-around">
              <span class="flex flex-col">
                Rank:
                <span>
                  <hr />
                  {{rank}}
                </span>
              </span>
              <span class="flex flex-col">
                Market Cap:
                <span>
                  <hr />
                  {{cap}}
                </span>
              </span>
              <span class="flex flex-col">
                24HR Volume:
                <span>
                  <hr />
                  {{volume}}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
  `,
    content: {
      id: id,
      name: name,
      price: price,
      change: change,
      rank: rank,
      cap: cap,
      volume: volume,
    },
    output: `./public/${name}_${time}.png`,
  }).catch((e) => console.error(e.message));
  return res.json({ data: `/${name}_${time}.png` });
};
