import { useEffect, useState } from "react"
import Card from "../Card/Card"
import { Link, useParams } from "react-router-dom";
import getPlayers from "../../utils/get-players";
import './Cricketer.css';
import { calculateAge, getDOB } from '../../utils/utils';

const Cricketer = () => {

    const [cricketerDetails, setCricketerDetails] = useState({});

    const { cricketerId } = useParams();
    
    useEffect(()=>{
        getPlayers().then(data=>{
            console.log(cricketerId);
            let details = data.filter(player=> player.id === cricketerId)[0];
            console.log(details);
            setCricketerDetails(details);
        })
    },[])

    const { name, description, type, points, rank, dob } = cricketerDetails;
    const age = calculateAge(dob);
    const dateOfBirth = getDOB(dob);

    return (<div className="cricketer-details">
        <h3><Link to='/'>Back to Cricketers</Link></h3>
        <div>
            <h1>{name}</h1>
            <p>{description}</p>
            <h2>Personal Information</h2>
            <div className="details"><span>Type:</span><span style={{margin: '10px'}}>{type}</span></div>
            <div className="details"><span>Points:</span><span style={{margin: '10px'}}>{rank}</span></div>
            <div className="details"><span>Rank:</span><span style={{margin: '10px'}}>{points}</span></div>
            <div className="details"><span>Date of Birth:</span><span style={{margin: '10px'}}>{dateOfBirth}</span></div>
            <div className="details"><span>Age:</span><span style={{margin: '10px'}}>{age} Years</span></div>
        </div>
    </div>)
}

export default Cricketer