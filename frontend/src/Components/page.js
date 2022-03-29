import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";

const Page = () => {
  const [data, setData] = useState([]);
  const [rate, setRate] = useState();
  const [input, setInput] = useState();
  const [category, setCategory] = useState("");
  const [recommendedProduct, setRecommendedProduct] = useState();
  const [inputValue, setInputValue] = useState([]);
 
 
 

  useEffect(() => {
    if (rate) {
      if (rate > 4) {
        let recommendedRate = rate > 4.5 ? 4.3 : 4.5;
        let filterData = data.filter(
          (item) => Number(item.rating) > recommendedRate
        );
        filterData.sort((a, b) => Number(b.rating - a.rating));
        let maxRating = filterData[0]?.rating;
        let finalReturn = filterData.filter(
          (item) => Number(item.rating) == maxRating
        );
        let categorySame = finalReturn.filter(
          (item) => item.category === category
        );
        if (categorySame.length == 0) {
          let pos = 0;
          for (let i = 0; i < finalReturn.length; i++) {
            pos = finalReturn[pos].mrp < Number(i.mrp) ? i : pos;
          }
          setRecommendedProduct(finalReturn[pos]);
        } else {
          setRecommendedProduct(categorySame[0]);
        }
      } else {
        let filterData = data.filter((item) => item.category !== category);
        filterData.sort((a, b) => Number(b.rating - a.rating));
        let maxRating = filterData[0]?.rating;
        let finalReturn = filterData.filter(
          (item) => Number(item.rating) == maxRating
        );
        finalReturn.sort((a, b) => Number(a.mrp - b.mrp));
        setRecommendedProduct(finalReturn[0]);
      }
    }
  }, [rate]);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
       
    fetch("http://localhost:8002/orderhistory", requestOptions)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log("error", error));
     
  }, []);

  useEffect(() => {
      if(data.length){
    let temp = data.map(i => "")
    setInputValue(temp)
      }
  }, [data])
  

  return (
    <>
      <div className="d-flex justify-content-center">
        <h1>Order History</h1>
      </div>

      <div className="row">
        {data.map((item,i) => {
          return (
            <div className="col-6 mb-3 d-flex justify-content-center">
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">{item.name}</h5>
                    <h6 className="card-subtitle text-muted">
                      {item.category.toUpperCase()}
                    </h6>
                  </div>
                  <div className="d-flex justify-content-between align-items-end">
                    <h6 className="card-subtitle text-muted">₹{item.mrp}</h6>
                    <Rating
                      name="half-rating-read"
                      defaultValue={item.rating}
                      precision={0.1}
                      readOnly
                    />
                  </div>
                  <div class="form-floating my-3">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      placeholder="rating"
                      value={inputValue[i]}
                      onChange={(e) => {
                       
                        let temp = data.map(i => "");
                        temp[i] = (e.target.value);
                        setInputValue(temp);
                      }}  
                    />
                    <label for="floatingInput">Rate this product </label>
                    <div className="d-grid mt-3">
                      <button
                        className="btn btn-outline-success"
                        type="button"
                        onClick={() => {
                          setCategory(item.category);
                          setRate(inputValue[i] || input);
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {recommendedProduct && (
        <div className="container">
          <div className="d-flex justify-content-center">
            <h3>Recommended Products</h3>
          </div>
          <div className="col-6 mb-3 d-flex justify-content-center">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title">{recommendedProduct.name}</h5>
                  <h6 className="card-subtitle text-muted">
                    {recommendedProduct.category.toUpperCase()}
                  </h6>
                </div>
                <div className="d-flex justify-content-between align-items-end">
                  <h6 className="card-subtitle text-muted">₹{recommendedProduct.mrp}</h6>
                  <Rating
                    name="half-rating-read"
                    defaultValue={recommendedProduct.rating}
                    precision={0.1}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
//dropdown
//card
//input box
//submit
//recommende products
