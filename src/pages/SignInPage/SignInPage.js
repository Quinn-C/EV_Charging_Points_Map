import React from 'react'
import SignInButton from '../../components/SignInButton/SignInButton.js';
import './SignInPage.css'
import ParticlesBg from 'particles-bg'


export function SignInPage() {

    return (
      <>
        <div className="SignInPage">
          <h3 className="welcome-title"> Welcome to </h3>
          <h1 className="name-app"> EV Charging Points Map </h1>
          <SignInButton/>
            
        </div>
        <ParticlesBg type="circle" bg={true} class='ParticleBG'/>
      </>

    )
}