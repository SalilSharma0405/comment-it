import React, { useState, useContext, useRef } from 'react'
import {  ArrowUp } from '../SVG';
import { ThemeContext } from '../context';
import { Comment } from '../Comment/Comment';

import './ViewComments.scss';



export default function ViewComments() {

    const { comments, headIds, toggleSort, sortBy } = useContext(ThemeContext);
    let level = useRef(1);
    
    const sortHeadIds = sortBy === 'asc' ? headIds: [...headIds].reverse();

    return (
        <div className="commentsViewContainer">
            <div className='sortByDate' onClick={toggleSort} >Sort by: Date and Time <span className={sortBy === 'asc'? '': 'reverseArrow'}><ArrowUp /></span> </div>

            {sortHeadIds.map(headId => {
                return (
                   <Comment key={headId} level={level.current} parentId={headId} commentObj={comments[headId]} />
                )

            })}

        </div>
    )
}
