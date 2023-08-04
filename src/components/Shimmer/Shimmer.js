import React from 'react'
import './Shimmer.css'
import Card from '../Card/Card';

const Shimmer = () => {
    const arr = [1,2,3,4,5,6,7,8,9,10,];
    console.log(arr);
    return (<div className="shimmer">
        {arr.map(item=><React.Fragment key={item}><Card data={{}} /></React.Fragment>)}
    </div>)
}

export default Shimmer