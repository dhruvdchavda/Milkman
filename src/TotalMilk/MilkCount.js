import { useEffect, useState } from "react";

function MilkCount() {
  const [dailyMilk, setDailyMilk] = useState({});
  const [milkPrice, setMilkPrice] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const [fillAllLtr, setFillAllLtr] = useState(0);

  useEffect(() => {
    [...Array(31)].forEach((ele, index) => {
      const data = dailyMilk;

      data[index + 1] = { ltr: 0 };
      setDailyMilk({
        ...data,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let totalLtr = 0;
    Object.entries(dailyMilk).forEach((value) => {
      totalLtr = totalLtr + Number(value[1].ltr);
    });

    setTotalBill(Number(totalLtr) * Number(milkPrice));
  }, [dailyMilk, milkPrice]);

  const onMilkChange = (e, key) => {
    const data = dailyMilk;

    data[key] = { ltr: e.target.value };
    setDailyMilk({
      ...data,
    });
  };

  const onMilkPriceChange = (e) => {
    setMilkPrice(e.target.value);
  };

  const onFillAllLtr = (e) => {
    setFillAllLtr(e.target.value);
  };

  const onFillClick = () => {
    [...Array(31)].forEach((ele, index) => {
      const data = dailyMilk;

      data[index + 1] = { ltr: fillAllLtr };
      setDailyMilk({
        ...data,
      });
    });
  };

  return (
    <>
      <div>
        <span>
          Total Bill: <strong>{totalBill}</strong>
        </span>
      </div>
      <div>
        <input type="number" value={fillAllLtr} onChange={onFillAllLtr} />
        <button onClick={onFillClick}>Fill</button>
      </div>
      <div>
        <span>1 ltr price:</span>
        <input type="number" value={milkPrice} onChange={onMilkPriceChange} />
      </div>
      <table>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Ltr</th>
          </tr>
          {Object.keys(dailyMilk).map((key) => (
            <tr>
              <td>{key}.</td>
              <td>
                <input
                  type="number"
                  value={dailyMilk[key].ltr}
                  onChange={(e) => onMilkChange(e, key)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default MilkCount;
