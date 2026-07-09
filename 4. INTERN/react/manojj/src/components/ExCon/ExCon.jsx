import React from 'react';
import { useContext2 } from '../../context/Context2';

const ExCon = () => {
    const { add, remote, active, handleAdd, handleRemote } = useContext2();

    return (
        <div>
            <h1>
                Output : {active === "add" ? add : remote}
            </h1>
           
            <button onClick={handleAdd}>Change Add</button>
            <button onClick={handleRemote}>Change Remote</button>
        </div>
    );
};

export default ExCon;
