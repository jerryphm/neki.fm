import React from 'react';
import { useParams } from 'react-router-dom';

function Tag() {
   const { tagKeyWord } = useParams();
   return <div>tag page for {tagKeyWord}</div>;
}

export default Tag;
