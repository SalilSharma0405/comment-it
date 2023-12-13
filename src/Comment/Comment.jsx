import React, { useState, useContext } from 'react'
import { AddComment } from '../AddComment/AddComments'
import { Bin } from '../SVG';
import { ThemeContext } from '../context';


const STYLES = {
    marginLeft: 24,
    width: 'calc(500px - 24px)'
}


const Comment = ({ commentObj, parentId, level = 1 }) => {

    const [currentCommentState, setCurrentCommentState] = useState(null);
    const { comments, deleteComment, sortBy } = useContext(ThemeContext);


    const { name, id, date, comment, children } = commentObj
    const parsedDate = new Date(date)


    const sortChildren = sortBy === 'asc' ? children : [...children].reverse()


    const onReplyCTA = () => {
        if (currentCommentState === 'REPLY') {
            setCurrentCommentState(null)
        } else {
            setCurrentCommentState('REPLY')
        }

    }

    const onEditCTA = () => {
        if (currentCommentState === 'EDIT') {
            setCurrentCommentState(null)
        } else {
            setCurrentCommentState('EDIT')
        }

    }

    const onDeleteCTA = () => {
        deleteComment({ level, parentId, id })
    }



    return (
        <div key={id} style={{ marginLeft: (level - 1) * 24 }} >
            <div className="commentsViewContainerInner">

                <div className='header'>
                    <div className='headerName'>{name}</div>
                    <div>{parsedDate.toDateString()}</div>

                </div>

                <div className='commentSection'>
                    {comment}
                </div>

                {level === 1 && <button onClick={onReplyCTA} className='commentButton'>Reply</button>}
                <button onClick={onEditCTA} className='commentButton'>Edit</button>

                <div className='svgContainer' onClick={onDeleteCTA}>
                    <Bin />
                </div>
            </div>
            {currentCommentState && <AddComment setCurrentCommentState={setCurrentCommentState} commentState={currentCommentState} parentId={parentId} containerStyle={STYLES} userDetails={commentObj} />}


            {sortChildren.map(child => {
                return <Comment key={id} level={level + 1} parentId={id} commentObj={comments[child]} />
            })}
        </div>
    )
}


export {
    Comment
}