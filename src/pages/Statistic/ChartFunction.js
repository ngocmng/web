export const countDateByYear = (list) => {
  const yearCount = list.reduce(
    (obj, date) => {
      if (date && typeof date === 'string') {
      const year = Number(date.split("-")[0]);
      obj.latestYear = Math.max(obj.latestYear, year);
      obj[year] = (obj[year] || 0) + 1;
      }
      return obj;
    },
    { latestYear: new Date().getFullYear() }
  );
  return Array.from(
    { length: 6 },
    (_, i) => yearCount.latestYear - 5 + i
  ).reduce((obj, year) => {
    obj[year] = yearCount[year] || 0;
    return obj;
  }, {});
};

export const countDateByQuarter = (list) => {
  const getQuarterVal = (year, month) => year * 4 + Math.ceil(month / 3) - 1;
  const curDate = new Date();
  const quarterCount = list.reduce(
    (obj, date) => {
      if (date && typeof date === 'string') {
      const [year, month] = date.split("-").map(Number);
      const quarterNum = getQuarterVal(year, month);
      obj.latestQuarter = Math.max(obj.latestQuarter, quarterNum);
      obj[quarterNum] = (obj[quarterNum] || 0) + 1;
      }
      return obj;
    },
    {
      latestQuarter: getQuarterVal(curDate.getFullYear(), curDate.getMonth()),
    }
  );
  return Array.from(
    { length: 6 },
    (_, i) => quarterCount.latestQuarter - 5 + i
  ).reduce((obj, quarterNum) => {
    const quarter = `Q${(quarterNum % 4) + 1}-${parseInt(quarterNum / 4)}`;
    obj[quarter] = quarterCount[quarterNum] || 0;
    return obj;
  }, {});
};

export const countDateByMonth = (list) => {
  const getMonthVal = (year, month) => year * 12 + month;
  const curDate = new Date();
  const monthCount = list.reduce(
    (obj, date) => {
      if (date && typeof date === 'string') {
      const [year, month] = date.split("-").map(Number);
      const monthNum = getMonthVal(year, month - 1);
      obj.latestMonth = Math.max(obj.latestMonth, monthNum);
      obj[monthNum] = (obj[monthNum] || 0) + 1;
      }
      return obj;
    },
    {
      latestMonth: getMonthVal(curDate.getFullYear(), curDate.getMonth()),
    }
  );
  return Array.from(
    { length: 6 },
    (_, i) => monthCount.latestMonth - 5 + i
  ).reduce((obj, monthNum) => {
    const month =
      `0${(monthNum % 12) + 1}`.slice(-2) + `-${parseInt(monthNum / 12)}`;
    obj[month] = monthCount[monthNum] || 0;
    return obj;
  }, {});
};

export const updateGraph = (sentData, receiveData, timeView, oldGraph, setter) => {
  const sentRawData = {
    Năm: countDateByYear,
    Quý: countDateByQuarter,
    Tháng: countDateByMonth,
  }[timeView](sentData);
  const receiveRawData = {
    Năm: countDateByYear,
    Quý: countDateByQuarter,
    Tháng: countDateByMonth,
  }[timeView](receiveData);
  //  console.log(sentRawData);
  //  console.log(receiveRawData);

  setter([
    {
      ...oldGraph,
      data: Object.keys(sentRawData).map((key) => {
        return {
          x: key,
          sent: sentRawData[key],
          receive: receiveRawData[key],
        };
      }),
    },
  ]);
};

