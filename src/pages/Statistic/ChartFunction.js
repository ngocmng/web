export const countDateByYear = (list) => {
    const yearCount = list.reduce(
      (obj, date) => {
        const year = Number(date.split("/")[2]);
        obj.latestYear = Math.max(obj.latestYear, year);
        obj[year] = (obj[year] || 0) + 1;
        return obj;
      },
      { latestYear: new Date().getFullYear() }
    );
    return Array.from({ length: 12 }, (_, i) => yearCount.latestYear - 11 + i).reduce((obj, year) => {
      obj[year] = yearCount[year] || 0;
      return obj;
    }, {});
  };
  
  export const countDateByQuarter = (list) => {
    const getQuarterVal = (year, month) => year * 4 + Math.ceil(month / 3) - 1;
    const curDate = new Date();
    const quarterCount = list.reduce(
      (obj, date) => {
        const [, month, year] = date.split("/").map(Number);
        const quarterNum = getQuarterVal(year, month);
        obj.latestQuarter = Math.max(obj.latestQuarter, quarterNum);
        obj[quarterNum] = (obj[quarterNum] || 0) + 1;
        return obj;
      },
      {
        latestQuarter: getQuarterVal(curDate.getFullYear(), curDate.getMonth()),
      }
    );
    return Array.from({ length: 12 }, (_, i) => quarterCount.latestQuarter - 11 + i).reduce(
      (obj, quarterNum) => {
        const quarter = `Q${(quarterNum % 4) + 1}-${parseInt(quarterNum / 4)}`;
        obj[quarter] = quarterCount[quarterNum] || 0;
        return obj;
      },
      {}
    );
  };
  
  export const countDateByMonth = (list) => {
    const getMonthVal = (year, month) => year * 12 + month;
    const curDate = new Date();
    const monthCount = list.reduce(
      (obj, date) => {
        const [, month, year] = date.split("/").map(Number);
        const monthNum = getMonthVal(year, month - 1);
        obj.latestMonth = Math.max(obj.latestMonth, monthNum);
        obj[monthNum] = (obj[monthNum] || 0) + 1;
        return obj;
      },
      {
        latestMonth: getMonthVal(curDate.getFullYear(), curDate.getMonth()),
      }
    );
    return Array.from({ length: 12 }, (_, i) => monthCount.latestMonth - 11 + i).reduce(
      (obj, monthNum) => {
        const month = `0${(monthNum % 12) + 1}`.slice(-2) + `-${parseInt(monthNum / 12)}`;
        obj[month] = monthCount[monthNum] || 0;
        return obj;
      },
      {}
    );
  };
  
  export const updateGraph = (data, timeView, oldGraph, setter) => {
    const rawData = {
      Năm: countDateByYear,
      Quý: countDateByQuarter,
      Tháng: countDateByMonth,
    }[timeView](data);
  
    // const oldData = oldGraph[0].data;
    // Object.keys(rawData).forEach((key, index) => {
    //     oldData[index].x = key;
    //     oldData[index].send = rawData[key].send; // Cập nhật "hàng nhận"
    //     oldData[index].receive = rawData[key].receive; // Cập nhật "hàng gửi"
    //   });

    // setter([...oldGraph]);
  };
  