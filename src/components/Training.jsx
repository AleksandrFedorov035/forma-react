import React, { useState } from 'react';
import Form from "./Form"
import Table from "./Table"

const Training = () => {
    const [trainings, setTrainings] = useState([]);

    return (
        <div className="training">
            <Form setTrainings={setTrainings} trainings={trainings}/>
            <Table setTrainings={setTrainings} trainings={trainings} />
        </div>
    )
}

export default Training;
