import React from "react";

export default function ProductDetail({ item }) {
  return (
    <div className="product-details">
      <p>{item.item_name}</p>
      <p>{item.description}</p>
      <p>${item.price}</p>
      <select name="sizes" id="sizeList">
        <option>{item.quantity}</option>
        <option>{item.colors}</option>
        <option>{item.sizes}</option>
      </select>
    </div>
  );
}