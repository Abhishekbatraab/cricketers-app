import './Card.css';
import { Link } from 'react-router-dom';

const Card = ({data, key}) => {
    console.log(data);
    return (<div className="card" key={key}>
        <div className='card-details'><span className='label'>Name</span><span><Link to={data && `/cricketer/${data.id}`}>{data && data.name}</Link></span></div>
        <div className='card-details'><span className='label'>Type</span><span>{data && data.type}</span></div>
        <div className='card-details'><span className='label'>Points</span><span>{data && data.points}</span></div>
        <div className='card-details'><span className='label'>Rank</span><span>{data && data.rank}</span></div>
        <div className='card-details'><span className='label'>Age</span><span>{data && `${data.age} Years`}</span></div>
    </div>)
}

export default Card