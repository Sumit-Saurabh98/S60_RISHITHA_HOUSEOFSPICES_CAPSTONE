import axios from "axios";
import React, { useState, useEffect } from "react";

function FetchData() {
  const [spicesData, setSpicesData] = useState([]);
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const deleteData = async (key) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete/${key}`);
      console.log(response);
      setSpicesData(spicesData.filter(item => item._id !== key));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const gettingData = async () => {
      try {
        const database = await axios.get("http://localhost:5000/get");
        console.log(database.data.a);
        setSpicesData(database.data.a);
      } catch (err) {
        console.error("Error :", err);
      }
    };
    gettingData();
  }, []);

  return (
    <div className="get">
      {spicesData.map((data) => (
        <div key={data._id}>
          <h3><b>Spice Name: </b> {data.spice}</h3>
          <img src={data.image} alt="" width="300px" />
          <p><b>Health Tip: </b> {data.health}</p>
          <p><b>Rarity: </b> {data.rarity}</p>
          <p><b>Common Availability: </b> {data.commonAvailability}</p>
          <button onClick={decrease}>-</button>
          <span>{count}</span>
          <button onClick={increase}>+</button>
          <button onClick={() => deleteData(data._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default FetchData;