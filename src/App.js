import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import SalonLayout from "./components/SalonLayout";

function App() {
  const [chairs, setChairs] = useState([]);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);

  const statusHandler = (event, num) => {
    const chairs2 = [...chairs];
    let selectedChair = chairs2.find((item)=> item.number === num);
    switch (selectedChair.state){
      case 'unselected':
        selectedChair.state = 'selected';
        break;
      case 'selected':
        selectedChair.state = 'reserved';
        break;
      case 'reserved':
        selectedChair.state = 'bought';
        setCount(prevCount=> prevCount +1);
        setPrice(prevPrice=> prevPrice + selectedChair.price)
        break;
      default:
        alert('قبلا خریداری شده است.')
        break;
    }
    setChairs(chairs2);
  };

  useEffect(() => {
    axios
      .get("./datas/chairs.json")
      .then((res) => setChairs(res.data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      <div className="stage">Stage</div>

      <div className="info-container">
        <div className="info">count: {count}</div>
        <div className="info">total price: {price}</div>
      </div>
      {error ? (
        <h3 className="error">Error reading data: {error}</h3>
      ) : (
        <SalonLayout chairs={chairs} statusHandler={statusHandler} />
      )}
    </>
  );
}

export default App;
