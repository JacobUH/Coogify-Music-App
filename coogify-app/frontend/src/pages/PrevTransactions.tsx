import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { Player } from '../components/interface/elements/Player';
import { PrevTransactionsMain } from '../components/interface/mainPages/PrevTransactionsMain';
import React from 'react';


export const PrevTransactions = () => {
    return(
    <div className="w-full h-full text-white relative">
        <Navbar/>
        <Sidebar/>
        <PrevTransactionsMain/>
        <Player/>
        <Outlet/> 
    </div>
    )
};