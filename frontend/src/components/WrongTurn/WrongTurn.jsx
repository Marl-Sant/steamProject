import './WrongTurn.css';
import { IoConstructSharp } from "react-icons/io5";
import { LuConstruction } from "react-icons/lu";
import { MdOutlineUTurnLeft } from "react-icons/md";
import { MdOutlineUTurnRight } from "react-icons/md";
import { NavLink } from "react-router-dom";

function WrongTurn() {

  return (
    <>
    <div className='wrong-turn'>
    <h1>404 - Work In Progress</h1>
    <p className='icons'><LuConstruction /> <IoConstructSharp /> <LuConstruction /></p>
    <div className=''>
        Whoopsie! Looks like you stumbled onto a page we are still working on or asked for a page that doesn&apos;t exist. No worries! We are working hard to make sure you have a great time on Gleam and to have it work as anticipated. Mind the dust while we get you back to the home page!
    </div>
    <p className='way-home'><MdOutlineUTurnLeft /><NavLink to='/'>Home page</NavLink><MdOutlineUTurnRight /></p>
    </div>
    </>
  );
}

export default WrongTurn;
