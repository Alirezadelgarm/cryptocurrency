import React,{useState,useEffect} from 'react';
// API
import { getCoin } from '../Services/Api';
// component
import Loader from './Loader';
import Coin from './Coin';
// styles
import styles from "./Landing.module.css";
const Landing = () => {
    
    const[coins,setCoins]=useState([]);
    const[search,setSearch]=useState("");


    useEffect(()=>{
        const fetchAPI=async()=>{
            const data =await getCoin();
            // console.log(data)
            setCoins(data)
        }
        fetchAPI()
    },[])


  const searchHandler=(event)=>{
        setSearch(event.target.value)
  }
  
  const searchCoin=coins.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <>

        
            <input className={styles.input} type="text" name="" value={search} onChange={searchHandler}  placeholder='Search' />
            {
                coins.length?
            <div className={styles.coinContainer}>
                {searchCoin.map(item=> <Coin key={item.id}
                                        name={item.name}
                                        image={item.image}
                                        symbol={item.symbol}
                                        price={item.current_price}
                                        marketCap={item.market_cap}
                                        priceChange={item.market_cap_change_24h}
                />)}

            </div>:
                  <Loader/>
            }
        </>
    );
};

export default Landing;