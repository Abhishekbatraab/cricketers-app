import React, { useEffect, useState } from "react";

import getPlayers from "../../utils/get-players";
import Shimmer from "../Shimmer/Shimmer";
import Card from "../Card/Card";
import './Cricketers.css';
import { calculateAge } from '../../utils/calculateAge';

import FastBackwardImage from '../../assets/images/fast-backward-white.png';
import FastForwardImage from '../../assets/images/fast-forward-white.png';
import LeftIcon from '../../assets/images/left-icon.png';
import RightIcon from '../../assets/images/right-icon.png'
import LeftIconDisabled from '../../assets/images/left-icon-disabled.png';
import RightIconDisabled from '../../assets/images/right-icon-disabled.png';



const Cricketers = () =>{
    const [players, setPlayers] = useState([]);
    const [filteredPlayers, setFilteredPlayers] = useState(JSON.parse(sessionStorage.getItem('filteredArray')) || [])
    const [ currentPage, setCurrentPage] = useState(1);
    const [ totalPages, setTotalPages] = useState([]);
    const [ filterByValue, setFilterByValue ] = useState(sessionStorage.getItem('filterByValue') || '');
    const [ searchText, setSearchText ] = useState(sessionStorage.getItem('searchText') || '');
    const NO_OF_RECORDS = 10;

    
    // useEffect(()=>{
    //     console.log('i m in search text useEffect');
    //     let filteredArray = JSON.parse(sessionStorage.getItem('filteredArray'));
    //     console.log("Filtered array ",filteredArray);
    // },[searchText])

    // useEffect(()=>{
    //     console.log('i m in filtered array useEffect');
    //     let filteredArray = JSON.parse(sessionStorage.getItem('filteredPlayers'));
    //     console.log("Filtered array ",filteredArray);
    //     // searchByName(searchText);
    // },[filteredPlayers])

    useEffect(()=>{
        console.log(searchText, filterByValue);
        getPlayers().then(data=>{
            console.log("data from get players ",data);
            let totalCricketers = data;
            setTypeCapitalize(totalCricketers);
            totalCricketers = setPlayersAge(totalCricketers);
            console.log("data from get players ",data);
            let totalPages = getTotalPages(totalCricketers);
            console.log("Total pages are ",totalPages);
            let pagesArray = getPagesArray(totalPages);
            setTotalPages(pagesArray);
            let cricketersPerPage = setCricketersPerPage([...data]);
            if(searchText!=='Select' || filterByValue!=='Select'){
                let filteredArray = JSON.parse(sessionStorage.getItem('filteredPlayers'));
                setFilteredPlayers(filteredArray);
            }else{
                setFilteredPlayers(cricketersPerPage);
            }
            setPlayers(totalCricketers);
        })
    },[currentPage]);


    const getTotalPages = (data) => {
        let pages = 0;
        pages = Math.ceil(data.length/NO_OF_RECORDS);
        return pages;
    }

    const getPagesArray = (pages) => {
        let pagesArray = [];
        let pageNumber = 1;
        for(let i=0;i<pages;i++){
            pagesArray.push(pageNumber++);
        }
        return pagesArray
    }

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const  setCricketersPerPage = (cricketersArray) => {
        let tempArray=[];
        let start = ((currentPage - 1) * NO_OF_RECORDS);
        let end = start + NO_OF_RECORDS;
        tempArray = cricketersArray.slice(start, end);
        console.log('CurrentData array ', tempArray);
        return tempArray;
    }

    const setPlayersAge = (players) =>{
        const playersWithAge = players.map(player=>{
            player['age'] = calculateAge(player.dob);
            return player;
        })
        return playersWithAge;
    }

    const setTypeCapitalize = (players) => {
        return players.map(player=>{
            let type = player.type;
            // console.log(type);
            type = type?type.charAt(0).toUpperCase() + type.slice(1):'NA';
            player['type'] = type
            return player
        })
    }

    const sortBy = (event) => {
        const sortByValue = event.target.value;
        console.log(sortByValue);
        let playersArray = [...players];
        switch(sortByValue){
            case 'Name':
            playersArray = playersArray.sort((a,b)=>a.name < b.name?-1:1);
            break;

            case 'Rank':
            playersArray = playersArray.sort((a,b)=>a.rank < b.rank?-1:1);
            break;

            case 'Age':
            playersArray = playersArray.sort((a,b)=>a.age < b.age?-1:1);
            break;

            default:
            playersArray = playersArray.sort((a,b)=>a.rank < b.rank?-1:1);
        }
        console.log(playersArray);
        setFilteredPlayers(playersArray)
    }

    const filterBy = (event) =>{
        const filterByValue = event.target.value;
        console.log(filterByValue); 
        let playersArray = [...players];
        if(filterByValue!=='Select'){
            console.log(playersArray);
            playersArray = playersArray.filter(player => {
                console.log(player.type, filterByValue);
                if(player.type===filterByValue)
                return player
            });
            
        }
        let totalPages = getTotalPages(playersArray);
        console.log("Total pages are ",totalPages);
        let pagesArray = getPagesArray(totalPages);
        console.log(pagesArray);
        playersArray = setCricketersPerPage(playersArray);
        console.log(playersArray);
        setTotalPages(pagesArray);
        sessionStorage.setItem('filteredPlayers', JSON.stringify(playersArray));
        sessionStorage.setItem('filterByValue', filterByValue);
        setFilterByValue(filterByValue)
        setFilteredPlayers(playersArray);
        
    }

    const searchByName = (searchValue) => {
        console.log(searchValue);
        // let searchValue = event.target.value;
        let playersArray = [...players];
        console.log(playersArray);
        let playersArraybyName = playersArray.filter(player=>player.name.toLowerCase().includes(searchValue.toLowerCase()));
        if(playersArraybyName.length>0){
            sessionStorage.setItem('filteredPlayers', JSON.stringify(playersArraybyName));
            playersArray = playersArraybyName; 
        }
        console.log(playersArraybyName);
        sessionStorage.setItem('searchText', searchValue);
        setFilteredPlayers(playersArray);
        setSearchText(searchValue);
    }

    if(filteredPlayers.length===0)
    return <Shimmer />
    console.log(currentPage, totalPages);

    return (<div className="cricketers-container">
        <div className="filters">
            <div>Sort by: </div>
            <div className="filter-options">
                <select  onChange={sortBy}>
                    <option>Select</option>
                    <option>Name</option>
                    <option>Rank</option>
                    <option>Age</option>
                </select>
            </div>
            <div>Filter By Type: </div>
            <div className="filter-options">
                <select value={filterByValue} onChange={filterBy}>
                    <option>Select</option>
                    <option>AllRounder</option>
                    <option>Batsman</option>
                    <option>Bowler</option>
                    <option>WicketKeeper</option>
                </select>
            </div>
            <input type="text" placeholder="Search by name" value={searchText} onChange={(event)=>searchByName(event.target.value)}/>
        </div>
        <div className="cricketers">
            {filteredPlayers && filteredPlayers.length>0 && filteredPlayers.map(player=><React.Fragment key={player._id}><Card data={player} /></React.Fragment>)}
        </div>
        <div className="pagination">
            <div className='paginationIconContainer' onClick={()=>handlePageClick(1)}>
                    <div><img src={FastBackwardImage} /></div>
            </div>
            {currentPage>1 ? <div className='navigatePageIcon' onClick={()=>handlePageClick(currentPage-1)} >
                <img src={LeftIcon} alt="prev page icon" />
            </div>:null}
            {currentPage==1 ? <div className='navigatePageIcon'>
                <img src={LeftIconDisabled} alt="prev page icon" />
            </div>:null}
            {totalPages && totalPages.length>0 ? totalPages.map((pageNumber)=>
                <div className={pageNumber === currentPage? `paginationIconContainer activePageIconContainer`:`paginationIconContainer `}
                    onClick={()=>handlePageClick(pageNumber)}
                >
                    <span className={pageNumber === currentPage?'pageNumberText activePageNumberText':'pageNumberText'}>
                        {pageNumber}
                    </span>
                </div>)
            :null}
            {currentPage>=1 && currentPage<totalPages.length?<div className='navigatePageIcon' 
                    onClick={()=>handlePageClick(currentPage+1)}
                >
                <img src={RightIcon} alt="next page icon" />
            </div>:''}
            {currentPage===totalPages.length?<div className='navigatePageIcon'>
                <img src={RightIconDisabled} alt="prev page icon" />
            </div>:null}
            <div className='paginationIconContainer' 
                onClick={()=>handlePageClick(totalPages.length)}
            >
                <div><img src={FastForwardImage} /></div>
            </div>
        </div>
    </div>)
}

export default Cricketers
