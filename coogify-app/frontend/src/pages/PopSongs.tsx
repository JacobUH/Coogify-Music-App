import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { Navbar } from '../components/interface/elements/Navbar';
import { Player } from '../components/interface/elements/Player';
import { PopSongsMain } from '../components/interface/mainPages/PopSongsMain';
import React from 'react';

export const PopSongs = () => {
    return (
        <div className="w-full h-full text-white relative"> 
            <Navbar/> 
            <Sidebar/>
            <PopSongsMain/>
            <Player/>
            <Outlet/>
        </div>
    )
}
