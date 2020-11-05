import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import { RecordsResponse } from './types';
import { formatDate } from './helpers';

const BASE_URL = 'https://sds-pesquisa.herokuapp.com'

const Records = () => {
    const [ recordsResponse, setRecordsResponse ] = useState<RecordsResponse>();

    useEffect(() => {
        axios.get(`${BASE_URL}/records?linesPerPage=12`).then(response => setRecordsResponse(response.data))
    }, []);

    return (
        <div className="page-container">
            <table className="records-table" cellPadding="0" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Instante</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Plataforma</th>
                        <th>Gênero</th>
                        <th>Título do game</th>
                    </tr>
                </thead>
                <tbody>
                    {recordsResponse?.content.map(record => (
                        <tr key={record.id}>
                            <td>{formatDate(record.moment)}</td>
                            <td>{record.name}</td>
                            <td>{record.age}</td>
                            <td className="text-secondary">{record.gamePlataform}</td>
                            <td>{record.genreName}</td>
                            <td className="text-primary">{record.gameTitle}</td>                
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default Records;