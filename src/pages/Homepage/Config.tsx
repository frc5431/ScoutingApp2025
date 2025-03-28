import React from 'react';
import './Home.css';
import { useState } from 'react';
import {atom, useAtom} from 'jotai';

export const swapAllianceAtom = atom(false);
export const removePlaceholderAtom = atom(false);


const Config: React.FC = () => {
    const [swapAlliance, setSwapAlliance] = useAtom(swapAllianceAtom);
    const [removePlaceholder, setRemovePlaceholder] = useAtom(removePlaceholderAtom);

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
    </div>
    </>)

}

export default Config
