import React from 'react';
import classes from './sidebar.module.scss';
import { NavLink } from 'react-router-dom';
import logo from '../../img/logo.png';

const Sidebar = () => {
  return (
    <div className={classes.sidebar}>
      <NavLink className={classes.logo} to={'/'}>
        <img src={logo} alt="Logo" height={100} />
      </NavLink>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : undefined)}
            to={'/devices'}>
            Devices
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : undefined)}
            to={'/devices/new'}>
            New
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : undefined)}
            to={'/brands'}>
            Brands
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : undefined)}
            to={'/brands/new'}>
            New
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : undefined)}
            to={'/categories'}>
            Categories
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : undefined)}
            to={'/categories/new'}>
            New
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : undefined)}
            to={'/slider-imgs'}>
            Slider images
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : undefined)}
            to={'/slider-imgs/new'}>
            New
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : undefined)}
            to={'/header-imgs'}>
            Header images
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : undefined)}
            to={'/header-imgs/new'}>
            New
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : undefined)}
            to={'/messages'}>
            Messages
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : undefined)}
            to={'/orders'}>
            Orders
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
