
import React,{useEffect, useState} from 'react'

const List = () => {
  const [rates,setrates]=useState([]);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "70aCzvqvMXCqHulXEmB0qkgONh4G76uW");
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };
    let res = await fetch(
      "https://api.apilayer.com/exchangerates_data/latest?base=usd",
      requestOptions
    );
    res = await res.json();
    setrates(res)
  }
  return (
      <div>
        <h2>List of Currency Rates</h2>
        <div>
          {
            rates.map((rate)=>{
              return (
              <div>
                <h6>{rate.rates}</h6>
              </div>
            )})
          }
        </div>
      </div>


  )
}

export default List