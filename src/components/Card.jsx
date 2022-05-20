import React, {useEffect, useState} from "react";

import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import './Card.scss'

import {ReactComponent as DesktopDivider} from "../images/pattern-divider-desktop.svg";
import {ReactComponent as MobileDivider} from "../images/pattern-divider-mobile.svg";
import {ReactComponent as Dice} from "../images/icon-dice.svg";
import {ReactComponent as Spin} from "../images/spin.svg";

const Card = ( ) => {
  
  const [advice, setAdvice] = useState({})
 
  const getAdvice = async () => {
    const data = await fetch('https://api.adviceslip.com/advice')
    const advice = await data.json()
    setAdvice(advice)
  }


  useEffect(()=>{
    getAdvice()
  }, [])
  if(Object.keys(advice).length === 0){
    return(
      <div className="card">
      <main className="card__content">
          <Spin />
      </main>

      <DesktopDivider className="desktop__divider"/>
      <MobileDivider className="mobile__divider" />
      <div className="dice__container"
        onClick={getAdvice}
      >
        <Dice className="dice"/>
      </div>
    </div>
    )
  }
  return(
    <div className="card">
      <main className="card__content">
        <TransitionGroup>
          <Fade collapse bottom>
            <h1 className="card__heading">Advice #{advice.slip.id}</h1>
            <p className="card__text"> <span className="card__text-quote">"</span>{advice.slip.advice}<span className="card__text-quote">"</span></p>
          </Fade>
        </TransitionGroup>

      
      </main>

      <DesktopDivider className="desktop__divider"/>
      <MobileDivider className="mobile__divider" />
      <Zoom>
        <div className="dice__container"
          onClick={getAdvice}
        >
          <Dice className="dice"/>
        </div>
      </Zoom>

    </div>
  )
}

export default Card;