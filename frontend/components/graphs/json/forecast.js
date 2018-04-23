export const generateForecastData = () => {
  const data = [];
  for (let i = 0; i < 14 * 24 / 4; i++) {
    data.push(createRandomDataPoint(i));
  }

  return {data};
};

const createRandomDataPoint = (i) => {
  const baseline = Math.floor(Math.random() * 80);
  const date = new Date(2018, 5, 10, 12);
  date.setHours(date.getHours() + (i * 4));
  return {
    date: date,
    baseline: baseline,
    error: Math.floor(baseline * ((Math.random() * 0.4) + 0.8))
  };
}
