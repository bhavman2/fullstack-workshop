import React from 'react';

const ListEntry = (props) => {
  return (
    <div>
      {props.todo.todo}
      <button onClick={props.edit}>Edit</button>
      <button onClick={props.delete}>Done</button>
    </div>
  );
};

export default ListEntry;