import { writeFile } from 'fs';
import { resolve, dirname } from 'path';
import { parse } from 'csv-parse';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, '..', 'static', 'data');

const response = await fetch('https://covid.ourworldindata.org/data/owid-covid-data.csv');
const csvData = await response.text();

parse(
  csvData,
  {
    columns: true,
    on_record: (record) => ({
      iso: record.iso_code.toLowerCase(),
      loc: record.location,
      deaths: +record.new_deaths,
      date: `${record.date.substr(0, 8)}01`,
    }),
  },
  function (err, records) {
    const groupedData = records.reduce((acc, r) => {
      acc[r.iso] = acc[r.iso] || {
        data: {},
        deaths: 0,
        name: r.loc,
      };

      acc[r.iso].data[r.date] = acc[r.iso].data[r.date]
        ? acc[r.iso].data[r.date] + r.deaths
        : r.deaths;

      acc[r.iso].deaths += r.deaths;

      return acc;
    }, {});

    Object.entries(groupedData).forEach(([key, value]) => {
      writeFile(`${outputPath}/${key}.json`, JSON.stringify(value), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });

    const overviewData = Object.entries(groupedData)
      .filter(([iso, { deaths }]) => deaths > 0 && !iso.includes('owid'))
      .map(([value, { name, deaths }]) => ({
        value,
        label: name,
        deaths,
      }));

    writeFile(`${outputPath}/countries.json`, JSON.stringify(overviewData), (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
);
