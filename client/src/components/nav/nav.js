import React from 'react';

import {NavLink} from 'react-router-dom';

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
              color: 'rgb(255,255,255)',
              fill: '#fff',
              textDecoration: 'none'
            }}>
            <svg version="1.1" className="nav__container-link-img" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 512 512" >
              <path d="M366.292,215.99L241.417,325.781c-0.167,0.146-0.333,0.292-0.479,0.448c-4.042,4.021-6.271,9.385-6.271,15.104
                c0,11.76,9.563,21.333,21.333,21.333c5.667,0,11.021-2.208,15.563-6.75l109.792-124.875c3.708-4.219,3.5-10.604-0.479-14.583
                C376.896,212.49,370.542,212.281,366.292,215.99z"/>
              <path d="M256,85.333c-141.167,0-256,114.844-256,256c0,26.479,4.104,52.688,12.167,77.917c1.417,4.417,5.521,7.417,10.167,7.417
                h467.333c4.646,0,8.75-3,10.167-7.417C507.896,394.021,512,367.813,512,341.333C512,200.177,397.167,85.333,256,85.333z
                M458.667,352h31.26c-0.824,18.04-3.237,35.947-8.177,53.333H30.25c-4.94-17.387-7.353-35.293-8.177-53.333h31.26
                C59.229,352,64,347.229,64,341.333c0-5.896-4.771-10.667-10.667-10.667h-31.46c1.581-34.919,10.68-67.865,25.948-97.208
                l27.324,15.781c1.688,0.969,3.521,1.427,5.333,1.427c3.667,0,7.271-1.906,9.229-5.333c2.958-5.104,1.208-11.625-3.896-14.573
                l-27.263-15.746c18.323-28.539,42.602-52.816,71.142-71.138l15.746,27.28c1.958,3.417,5.563,5.333,9.229,5.333
                c1.813,0,3.646-0.458,5.333-1.427c5.104-2.948,6.854-9.469,3.896-14.573l-15.777-27.332c29.345-15.27,62.293-24.37,97.215-25.951
                v31.46c0,5.896,4.771,10.667,10.667,10.667s10.667-4.771,10.667-10.667v-31.46c34.922,1.581,67.87,10.681,97.215,25.951
                l-15.777,27.332c-2.958,5.104-1.208,11.625,3.896,14.573c1.688,0.969,3.521,1.427,5.333,1.427c3.667,0,7.271-1.917,9.229-5.333
                l15.746-27.28c28.54,18.322,52.819,42.599,71.142,71.138l-27.263,15.746c-5.104,2.948-6.854,9.469-3.896,14.573
                c1.958,3.427,5.563,5.333,9.229,5.333c1.812,0,3.646-0.458,5.333-1.427l27.324-15.781c15.268,29.344,24.367,62.289,25.948,97.208
                h-31.46c-5.896,0-10.667,4.771-10.667,10.667C448,347.229,452.771,352,458.667,352z"/>
            </svg>
            <p className="nav__container-link-title">Dashboard</p>
          </NavLink>
          <NavLink to="/calendar" 
            className="nav__container-link" 
            activeClassName="selected"
            activeStyle={{
              fontWeight: 'bold',
              color: 'rgb(255,255,255)',
              fill: '#fff',
              textDecoration: 'none',
            }}>
            <svg className="nav__container-link-img" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="m482 292.25v-246.25c0-8.285156-6.714844-15-15-15h-76v-16c0-8.285156-6.714844-15-15-15s-15 6.714844-15 15v16h-60v-16c0-8.285156-6.714844-15-15-15s-15 6.714844-15 15v16h-60v-16c0-8.285156-6.714844-15-15-15s-15 6.714844-15 15v16h-60v-16c0-8.285156-6.714844-15-15-15s-15 6.714844-15 15v16h-76c-8.285156 0-15 6.714844-15 15v391c0 8.285156 6.714844 15 15 15h249.804688c24.25 36.152344 65.488281 60 112.195312 60 74.4375 0 135-60.5625 135-135 0-32.070312-11.25-61.5625-30-84.75zm-391-231.25v15c0 8.285156 6.714844 15 15 15s15-6.714844 15-15v-15h60v15c0 8.285156 6.714844 15 15 15s15-6.714844 15-15v-15h60v15c0 8.285156 6.714844 15 15 15s15-6.714844 15-15v-15h60v15c0 8.285156 6.714844 15 15 15s15-6.714844 15-15v-15h61v60h-422v-60zm-61 361v-271h422v113.804688c-21.464844-14.394532-47.269531-22.804688-75-22.804688-47.398438 0-89.164062 24.558594-113.257812 61.613281-2.027344-1.023437-4.3125-1.613281-6.742188-1.613281h-30c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h22.722656c-3.386718 9.554688-5.730468 19.601562-6.882812 30h-15.839844c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h15.839844c1.152344 10.398438 3.492187 20.445312 6.882812 30zm347 60c-57.898438 0-105-47.101562-105-105s47.101562-105 105-105 105 47.101562 105 105-47.101562 105-105 105zm0 0"/>
              <path d="m437 362h-45v-45c0-8.285156-6.714844-15-15-15s-15 6.714844-15 15v60c0 8.285156 6.714844 15 15 15h60c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15zm0 0"/>
              <path d="m136 182h-30c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h30c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15zm0 0"/>
              <path d="m136 242h-30c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h30c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15zm0 0"/>
              <path d="m136 302h-30c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h30c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15zm0 0"/>
              <path d="m227 212h30c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-30c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15zm0 0"/>
              <path d="m227 272h30c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-30c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15zm0 0"/>
              <path d="m136 362h-30c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h30c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15zm0 0"/>
              <path d="m347 212h30c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-30c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15zm0 0"/>
            </svg>
            <p className="nav__container-link-title">Calendar</p>
          </NavLink>
          <NavLink to="/status" 
            className="nav__container-link" 
            activeClassName="selected"
            activeStyle={{
              fontWeight: 'bold',
              color: 'rgb(255,255,255)',
              fill: '#fff',
              textDecoration: 'none',
            }}>
            <p className="nav__container-link-title">Status</p>
          </NavLink>
        </div>
      </nav>
    )
  }
}