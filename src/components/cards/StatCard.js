import React from 'react';
import './statcard.scss'
function StatCard({ title, number }) {
    return (
        <div className="card">
            <p>{title}</p>
        </div>
    );
}

export default StatCard;