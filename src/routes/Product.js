import { useState } from 'react'
import data from '../data.js'

function ProductList() {
    let [shoes] = useState(data);

    return (
        <div className="container">
            <div className="row">
            {
                shoes.map((value,index)=>{
                return (
                    <Product product={value} i={index+1} />
                );
                })
            }
            </div>
        </div>                 
    )
}

function ProductDetail(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6">
                <h4 className="pt-5">상품명</h4>
                <p>상품설명</p>
                <p>120000원</p>
                <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>
        </div> 
    )
}

function Product(props) {
    return (
      <div className="col-md-4">
      <img src={process.env.PUBLIC_URL + '/img/shoes' + (props.i) + '.jpg'} width="80%" />
      <h4>{props.product.title}</h4>
      <p>{props.product.contents}</p>
      <p>{props.product.price}</p>
    </div>
    )
  }

  export {ProductList,ProductDetail};