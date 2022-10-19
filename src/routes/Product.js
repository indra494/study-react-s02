import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap'
import axios from 'axios'
import '../App.css';

import { Context1 } from '../App.js'


function ProductList(props) {

    let {stock} = useContext(Context1);

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

            <span>
                재고 : {stock[0]}
            </span>    

            <button onClick={()=> {
                axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result)=>{                    
                    props.setShoes( [...result.data,...props.shoes] );
                }).catch(()=>{
                    console.log('실패');                    
                });

                Promise.all([ axios.get('https://codingapple1.github.io/shop/data2.json'), axios.get('https://codingapple1.github.io/shop/data3.json')  ])
                .then((result)=>{
                    console.log(result);
                });

            }}>더보기</button>            
        </div>                 
    )
}

function ProductDetail(props) {

    let [count, setCount] = useState(0);
    let [isBox, setBox] = useState(true);
    let [tab, setTab] = useState(0);

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

            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={()=> { setTab(0); }} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=> { setTab(1); }} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=> { setTab(2); }} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab} />                     


        </div> 
    )
}

function TabContent({tab}) {

    let [fade, setFade] = useState('');

    useEffect(()=>{
        setTimeout(()=>{ setFade('end'); }, 100);

        return ()=> {
            setFade('')
        }
    },[tab]);

    return <div className={'start ' + fade}>
    { [<div>내용0</div>,<div>내용1</div>,<div>내용2</div>][tab] }
    </div>

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