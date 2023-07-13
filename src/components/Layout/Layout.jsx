import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import cn from 'classnames';
import layOutStyles from './Layout.module.css';

const Layout = () => {
  return (
    <nav className={layOutStyles.header}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          cn(layOutStyles.tabPage, { [layOutStyles.active]: isActive })
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          cn(layOutStyles.tabPage, { [layOutStyles.active]: isActive })
        }
      >
        Movies
      </NavLink>
      <Outlet />
    </nav>
  );
};

export default Layout;
