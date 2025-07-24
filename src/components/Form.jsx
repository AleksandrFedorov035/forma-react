import React, { useState } from 'react';

const Form = ({ trainings, setTrainings }) => {
    const [date, setDate] = useState('');

    const handleDateChange = (e) => {
        const value = e.target.value;
        if (value.length === 2 || value.length === 5) {
            setDate(value + '.');
        } else {
            setDate(value);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        if (!data.date || !data.distance) {
            alert('Заполните все поля!');
            return;
        }

        const newTrainings = [...trainings];
        const index = newTrainings.findIndex(t => t.date === data.date);

        if (index !== -1) {
            newTrainings[index].distance += parseFloat(data.distance);
        } else {
            newTrainings.push({ date: data.date, distance: parseFloat(data.distance) });
            newTrainings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }

        setTrainings(newTrainings);
    };

    return (
        <form onSubmit={onSubmit} className="form">
            <div className="form-item">
                <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
                <input type="text" name="date" placeholder="22.22.22" id="date" onInput={handleDateChange} value={date}/>
            </div>
            <div className="form-item">
                <label htmlFor="distance">Пройдено км</label>
                <input type="text" name="distance" placeholder="10" id="distance" />
            </div>
            <button type="submit">Ok</button>
        </form>
    );
};

export default Form;
