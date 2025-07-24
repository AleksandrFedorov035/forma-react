import React, { useState } from 'react';

const Table = ({ trainings, setTrainings }) => {
    const onClick = (index) => {
        const newTrainings = [...trainings];
        newTrainings.splice(index, 1);
        setTrainings(newTrainings);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Дата (ДД.ММ.ГГ)</th>
                    <th>Пройдено км</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {trainings.map((training, index) => (
                    <tr key={index}>
                        <td>{training.date}</td>
                        <td>{training.distance.toFixed(1)}</td>
                        <td><button onClick={() => onClick(index)}>✘</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
