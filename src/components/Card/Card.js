import './Card.css';

const Card = ({data, key}) => {
    // const age = {da}
    // console.log(data);
    return (<div className="card" key={key}>
        <div className='card-details'><span className='label'>Name</span><span>{data && data.name}</span></div>
        <div className='card-details'><span className='label'>Type</span><span>{data && data.type}</span></div>
        <div className='card-details'><span className='label'>Points</span><span>{data && data.points}</span></div>
        <div className='card-details'><span className='label'>Rank</span><span>{data && data.rank}</span></div>
        <div className='card-details'><span className='label'>Age</span><span>{data && `${data.age} Years`}</span></div>
    </div>)
}

export default Card