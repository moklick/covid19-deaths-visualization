const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const outputPath = path.resolve(__dirname, '..', 'static', 'data');
const input = fs.readFileSync(path.join(__dirname, './owid-covid.csv'), 'utf8');

parse(
  input,
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
      fs.writeFile(`${outputPath}/${key}.json`, JSON.stringify(value), (err) => {
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

    fs.writeFile(`${outputPath}/countries.json`, JSON.stringify(overviewData), (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
);
