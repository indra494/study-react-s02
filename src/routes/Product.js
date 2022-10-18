import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductList(props) {
    return (
        <div className="container">
            <div className="row">
            {
                props.shoes.map((value,index)=>{
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

    let [count, setCount] = useState(0);
    let [isBox, setBox] = useState(true);

    let {id} = useParams();
    let product = props.shoes.find(x=>{
        return x.id == id;
    })

    useEffect(()=>{
        let timer = setTimeout(function() { setBox(false); },2000);
        
        return () => {
            /* useEffect동작전 실행되는 함수 return () => { } */
            console.log('this is cleanup');
            clearTimeout(timer);
        }
    }, [] /* [] 시 useEffect는 mount되고 한번만 수행됨 */ );

    useEffect(()=>{
        console.log('test');
    }, [count] );

    return (
        <div className="container">
            {
                isBox ?
                    <div className="alert alert-warning">
                    2초이내 구매시 할인
                    </div>
                : false
            }

            {count}
            <button onClick={()=>{ setCount(count+1) }}>버튼</button>
            <div className="row">
                <div className="col-md-6">
                <img src={"https://codingapple1.github.io/shop/shoes" + (parseInt(product.id)+1) + ".jpg"} width="100%" />
                </div>
                <div className="col-md-6">
                <h4 className="pt-5">{product.title}</h4>
                <p>{product.content}</p>
                <p>{product.price}원</p>
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