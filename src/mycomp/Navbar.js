import React from 'react'
import { Search, Home, Trash, Share2, User, Bell, Menu, Grid } from "lucide-react";
import navbar from '../static/navbar.css'
export default function Navbar() {
    return (
        <div className='container-fluid Navbar'>
            <div className="Brand">
                FileHunt
            </div>
            <div className="profile">
                <Search />
                <input type="text" placeholder='Search here ...' />
                <div className="user">
                    <User />
                </div>
            </div>
        </div>
    )
}
