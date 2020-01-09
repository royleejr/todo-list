import React from 'react';

import {NavLink} from 'react-router-dom';

import DashImg from '../../assets/dashboard.svg';

import './nav.scss';

export default class Nav extends React.Component {
  render() {
    return (
      <nav className="nav">
        <div className="nav__container">
          <NavLink exact to="/" 
              className="nav__container-link" 
              activeClassName="selected"
              activeStyle={{
                fontWeight: 'bold',
                textDecoration: 'none',
                fontSize:'20px'}}>
            <img className="nav__container-link-img" src={DashImg}></img>
            {/* <svg className="nav__container-link-img" height="1024" width="832" xmlns="http://www.w3.org/2000/svg">
              <path fill="#fff" d="M416 464.5c-61.562 0-111.5 49.938-111.5 111.5S354.438 687.5 416 687.5 527.5 637.562 527.5 576c0-8.5-1.125-16.75-3-24.688C606.125 456.375 732.5 308.34400000000005 800 224c23.125-28.875-2.312-56.188-32-32-85.188 69.375-232.312 194.688-326.906 275.594C433.031 465.719 424.625 464.5 416 464.5zM447.875 255.875c0-17.656-14.344-32-32-32s-32 14.344-32 32 14.344 32 32 32S447.875 273.53099999999995 447.875 255.875zM639.875 511.875c0 17.656 14.375 32 32 32s32-14.344 32-32-14.375-32-32-32S639.875 494.219 639.875 511.875zM287.875 255.875c-17.656 0-32 14.344-32 32s14.344 32 32 32 32-14.344 32-32S305.531 255.875 287.875 255.875zM223.875 383.875c0-17.656-14.344-32-32-32s-32 14.344-32 32 14.344 32 32 32S223.875 401.531 223.875 383.875zM127.875 511.875c0 17.656 14.344 32 32 32s32-14.344 32-32-14.344-32-32-32S127.875 494.219 127.875 511.875zM575.875 287.875c0-17.656-14.375-32-32-32s-32 14.344-32 32 14.375 32 32 32S575.875 305.53099999999995 575.875 287.875zM792.875 336.688l-68.75 89.938C731.625 453.812 736 482.375 736 512c0 176.75-143.312 320-320 320S96 688.75 96 512c0-176.688 143.312-320 320-320 65.875 0 127 19.969 177.875 54.094l79.25-60.625C602.375 129.59400000000005 513.25 96 416 96 186.25 96 0 282.25 0 512s186.25 416 416 416 416-186.25 416-416C832 449.281 817.75 390 792.875 336.688z"  />
            </svg> */}
            <p className="nav__container-link-title">Dashboard</p>
            </NavLink>
          <NavLink to="/calendar" 
            className="nav__container-link" 
            activeClassName="selected"
            activeStyle={{
              fontWeight: 'bold',
              textDecoration: 'none',
              fontSize:'20px'}}>
            Calendar
          </NavLink>
        </div>
      </nav>
    )
  }
}