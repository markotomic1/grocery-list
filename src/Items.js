import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Items = ({
  items,
  removeItem,
  editItem,
}) => {
  return (
    <div className='items'>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className='text'>
            <p>{title}</p>

            <div className='buttons'>
              <button
                className='btn-green'
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                className='btn-red'
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};
export default Items;
