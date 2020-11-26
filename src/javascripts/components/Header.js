import React from 'react'

//Header component - makes the title section
export function Header() {
  return (
    <div className="header">
      <div className="hero section is-info">
        <div className="hero-head">
          <nav className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <a className="navbar-item">
                  Kate's Project
                </a>
                <span className="navbar-burger burger" data-target="navbarMenuHeroA">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
              <div id="navbarMenuHeroA" className="navbar-menu">
                <div className="navbar-end">
                  <a className="navbar-item" href="">
                    Courses
                  </a>
                  <a className="navbar-item" href="">
                    About
                  </a>
                  <a className="navbar-item" href="">
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="hero-body">
          <div className="container">
            <h1 className="title has-text-centered has-text-white">Assignment 5: Learn About Express</h1>
          </div>
        </div>
      </div>
    </div>
  )
}