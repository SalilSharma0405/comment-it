import './App.scss';
import { ThemeContext, initialState } from './context';
import { AddComment } from './AddComment/AddComments';
import { Header } from './Header/Header';
import ViewComments from './ViewComments/ViewComments';
import { useEffect, useState } from 'react';




function App() {
  const [comments, setComments] = useState(initialState.comments);
  const [headIds, setHeadIds] = useState(initialState.headIds);
  const [sortBy, setSortBy] = useState('asc');


  const toggleSort = () => {
    setSortBy(sortBy => sortBy === 'asc' ? 'dec' : 'asc')
  }


  // WebStorage presist
  useEffect(() => {
    if (Object.values(comments).length) {
      sessionStorage.setItem("comments", JSON.stringify(comments));
      sessionStorage.setItem("headIds", JSON.stringify(headIds));
      sessionStorage.setItem("sortBy", sortBy);
    }

  }, [comments, sortBy])

  useEffect(() => {
    const comments = JSON.parse(sessionStorage.getItem("comments")) || {};
    const headIds = JSON.parse(sessionStorage.getItem("headIds")) || [];
    const sortBy = sessionStorage.getItem("sortBy") || 'asc';

    setComments(comments)
    setHeadIds(headIds)
    setSortBy(sortBy)

  }, [])


  const addNewComment = (state) => {

    const newObject = {
      id: Math.random(),
      date: String(new Date()),
      children: [],
      ...state
    }

    setComments(comments => ({
      ...comments, [newObject.id]: newObject
    }))
    setHeadIds(headIds => ([...headIds, newObject.id]))

  }


  const addNewReply = ({ state, parentId }) => {

    const newObject = {
      id: Math.random(),
      date: new Date(),
      children: [],
      ...state
    }


    setComments(comments => {
      return {
        ...comments, [newObject.id]: newObject, [parentId]: {
          ...comments[parentId], children: [...comments[parentId].children, newObject.id]
        }
      }
    })

  }

  const editComment = ({ comment, id }) => {
    setComments(comments => ({ ...comments, [id]: { ...comments[id], comment } }))
  }


  const deleteComment = ({ parentId, id, level }) => {


    if (level === 1) {

      let newHeadIds = [...headIds];
      newHeadIds = newHeadIds.filter(filterIds => filterIds !== id);

      setHeadIds(newHeadIds);

      let newComments = { ...comments };


      if (newComments[id].children.length) {
        newComments[id].children.forEach((id) => {
          delete newComments[id]
        })
      }

      delete newComments[id]
      setComments(newComments)

    } else {

      let newChildren = [...comments[parentId].children];
      let newComments = { ...comments };

      delete newComments[id];

      newComments[parentId] = {
        ...newComments[parentId],
        children: newChildren.filter((currentIds) => currentIds !== id)
      }
      setComments(newComments);
    }
  }


  return (
    <ThemeContext.Provider value={{
      comments,
      headIds,
      addNewReply,
      sortBy,
      addNewComment,
      editComment,
      deleteComment,
      toggleSort
    }}>
      <div className="app">
        <Header />
        <AddComment />
        <ViewComments />

      </div>
    </ThemeContext.Provider>
  );
}

export default App;

