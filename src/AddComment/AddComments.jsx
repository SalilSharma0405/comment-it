import React, { useContext, useState, useEffect, useRef } from 'react'
import { ThemeContext } from '../context';

import './AddComment.scss';



const COMMENT_STATES = {
  COMMENT: {
    header: 'Comment',
    buttonText: 'Post'
  },
  EDIT: {
    header: 'Edit',
    buttonText: 'Edit'
  },
  REPLY: {
    header: 'Reply',
    buttonText: 'Post'
  }
}

const AddComment = ({ containerStyle = {}, commentState = 'COMMENT', parentId = null, setCurrentCommentState = () => null, userDetails }) => {
  const [state, setState] = useState({
    name: '',
    comment: ''
  })

  const { addNewComment, addNewReply, editComment } = useContext(ThemeContext);

  const { header, buttonText } = COMMENT_STATES[commentState]

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (commentState === 'COMMENT') {
      addNewComment(state)
    } else if (commentState === 'REPLY') {
      addNewReply({ state, parentId })
    } else {
      editComment({ comment: state.comment, id: userDetails.id })
    }


    setState({
      name: '',
      comment: ''
    })

    setCurrentCommentState(null)
  }

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setState((state) => ({ ...state, [name]: value }))
  }

  const onCancelCTA = ()=>{
    setCurrentCommentState(null)
  }

  useEffect(() => {
    if (commentState === 'EDIT') {
      setState(userDetails)
    } else {
      setState({
        name: '',
        comment: ''
      })
    }

  }, [commentState])

  return (
    <form className="container" style={containerStyle} onSubmit={onSubmitHandler}>
      <div >
        {header}
        <div>
          <input disabled={commentState === 'EDIT'} placeholder='Name' name='name' value={state.name} className='textField' type='text' required onChange={onChangeHandler} />
        </div>
        <div>
          <textarea className='textArea' value={state.comment} name='comment' placeholder='Comment' required onChange={onChangeHandler} />
        </div>
        <div className='buttonContainer'>  <button  type='submit'>{buttonText}</button> {(commentState === 'EDIT' || commentState === 'REPLY') && <button className='cancelButton' onClick={onCancelCTA}>Cancel</button>}</div>
      </div>
    </form>

  )
}


export {
  AddComment
}