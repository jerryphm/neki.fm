import React from 'react';
import { useParams } from 'react-router-dom';

function Result() {
   const { resultKeyWord:key } = useParams();

   return <div>search page for {key}</div>;
}

export default Result;
