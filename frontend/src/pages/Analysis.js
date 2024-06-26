// src/pages/Analysis.js
import React from 'react';
import { useParams } from 'react-router-dom';

function Analysis() {
  let { id } = useParams();
  return (
    <div>
      <h1>Analysis for Patient {id}</h1>
      <p>Analysis details for patient {id} will be displayed here.</p>
    </div>
  );
}

export default Analysis;