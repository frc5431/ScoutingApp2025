import React, { useEffect } from 'react';
import './Home.css';
import { useState } from 'react';
import {atom, useAtom} from 'jotai';

export const swapAllianceAtom = atom(false);
export const removePlaceholderAtom = atom(false);
export const desaturatedAtom = atom(false);


const Config: React.FC = () => {
    const [swapAlliance, setSwapAlliance] = useAtom(swapAllianceAtom);
    const [removePlaceholder, setRemovePlaceholder] = useAtom(removePlaceholderAtom);
    const [desaturated, setDesaturated] = useAtom(desaturatedAtom);

    useEffect(() => {
        if (desaturated){
            document.documentElement.style.setProperty('--filter', 'grayscale(1)');
          }
          else {
            document.documentElement.style.setProperty('--filter', 'grayscale(0)');
          }
    })

    return (<>
        <h1>Config</h1>
    <div className="configCheckboxes">
    <label className="mainpage-checkbox">
        <input 
            type="checkbox" 
            checked={swapAlliance} 
            onChange={() => setSwapAlliance(swapAlliance => !swapAlliance)}
        />
        <span className="checkmarkRedBackground"></span>
        <span className="checkboxtext">Swap Alliance</span>
    </label>
    <label className="mainpage-checkbox">
        <input 
            type="checkbox" 
            checked={removePlaceholder} 
            onChange={() => setRemovePlaceholder(removePlaceholder => !removePlaceholder)}
        />
        <span className="checkmarkRedBackground"></span>
        <span className="checkboxtext">Remove Placeholders</span>
    </label>
    <label className="mainpage-checkbox">
        <input 
            type="checkbox" 
            checked={desaturated} 
            onChange={() => setDesaturated(desaturated => !desaturated)}
        />
        <span className="checkmarkRedBackground"></span>
        <span className="checkboxtext">Desaturate App</span>
    </label>
    </div>
    </>)

}

export default Config
