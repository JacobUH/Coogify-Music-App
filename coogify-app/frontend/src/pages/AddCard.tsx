import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { Player } from '../components/interface/elements/Player';
import { AddCardMain } from '../components/interface/mainPages/AddCardMain';
import React from 'react';


export const AddCard = () => {
    return(
    <div className="w-full h-full text-white relative">
        <Navbar/>
        <Sidebar/>
        <AddCardMain/>
        <Player/>
        <Outlet/> 
    </div>
    )
};

