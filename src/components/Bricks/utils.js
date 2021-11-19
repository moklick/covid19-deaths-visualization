export function createGridData(data) {
  let rowCount = 0;

  return Object.entries(data.data)
    .filter(([_, deaths]) => deaths > 0)
    .map(([date, deaths]) => {
      const positions = [];
      const rows = Math.ceil(deaths / 100);
      let count = 0;

      for (let z = rowCount; z < rowCount + rows; z += 1) {
        for (let x = 0; x < 50; x += 1) {
          for (let i = 0; i < 2; i += 1) {
            if (count < deaths) {
              const xPos = i % 2 === 0 ? -x - 0.5 : x + 0.5;
              const xDiff = Math.random() * (Math.random() < 0.5 ? -0.05 : 0.05);
              const zDiff = Math.random() * (Math.random() < 0.5 ? -0.05 : 0.05);
              const y = 0.4;

              positions.push([xPos + xDiff, y, -(z * 1.5 + zDiff)]);
              count += 1;
            }
          }
        }
      }

      rowCount += rows + 1;

      return {
        deaths,
        date,
        rowCount,
        positions,
      };
    });
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function parseDate(date) {
  const splitted = date.split('-');
  return `${months[splitted[1] - 1]} ${splitted[0]}`;
}
