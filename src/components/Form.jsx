import React, { useState } from 'react';

const Form = ({ trainings, setTrainings }) => {
    const [date, setDate] = useState('');
    const [distance, setDistance] = useState('');

    const handleDateChange = (e) => {e.target.value.length === 2 || e.target.value.length === 5 ? setDate(e.target.value + '.') : setDate(e.target.value)}
    const handleDistanceChange = (e) => {if (/^\d*$/.test(e.target.value)) setDistance(e.target.value)}

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        if (!data.date || !data.distance) {
            alert('Заполните все поля!');
            return;
        }

        const [year, month, day] = data.date.split('-');
        const formattedDate = `${day}.${month}.${year}`;

        const newTrainings = [...trainings];
        const index = newTrainings.findIndex(t => t.date === formattedDate);

        if (index !== -1) {
            newTrainings[index].distance += parseFloat(data.distance);
        } else {
            newTrainings.push({ date: formattedDate, distance: parseFloat(data.distance) });
            newTrainings.sort((a, b) => {
                const dateA = new Date(a.date.split('.').reverse().join('-'));
                const dateB = new Date(b.date.split('.').reverse().join('-'));
                return dateB.getTime() - dateA.getTime();
            });
        }
        setTrainings(newTrainings);
        setDate('');
        setDistance('');
    };

    return (
        <form onSubmit={onSubmit} className="form">
            <div className="form-item">
                <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
                <input type="date" name="date" id="date" onInput={handleDateChange} value={date} />
            </div>
            <div className="form-item">
                <label htmlFor="distance">Пройдено км</label>
                <input type="text" name="distance" placeholder="10" id="distance" onInput={handleDistanceChange} value={distance} />
            </div>
            <button type="submit">Ok</button>
        </form>
    );
};

export default Form;
