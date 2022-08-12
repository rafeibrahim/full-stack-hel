import react from "react";

const Person = ({ id, name, number, deletePersonHandler }) => {
  return (
    <>
      <div>
        {name} {number} 
        <button onClick={() => deletePersonHandler(id, name)}>delete</button>
      </div>
    </>
  );
};

export default Person;
