import React, {
  useEffect,
  useState,
} from "react";
import Items from "./Items";
import Alert from "./Alert";
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) return JSON.parse(list);
  else return [];
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(
    getLocalStorage()
  );
  const [isEditing, setIsEditing] = useState(
    false
  );
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      //display alert
      showAlert(
        true,
        "danger",
        "please enter a value"
      );
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          } else return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(
        true,
        "success",
        "item added to the list"
      );
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      };
      setList([...list, newItem]);
      setName("");
    }
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(
      list.filter((item) => item.id !== id)
    );
  };
  const editItem = (id) => {
    const specificItem = list.find(
      (item) => item.id === id
    );
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };
  const showAlert = (
    show = false,
    type = "",
    msg = ""
  ) => {
    setAlert({ show, type, msg });
  };
  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };
  useEffect(() => {
    localStorage.setItem(
      "list",
      JSON.stringify(list)
    );
  }, [list]);
  return (
    <section className='list'>
      <div className='title'>
        {alert.show && (
          <Alert
            {...alert}
            removeAlert={showAlert}
            list={list}
          />
        )}
        <h2>Grocery Bud</h2>
      </div>
      <form
        className='form'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          id='item'
          name='item'
          value={name}
          placeholder='e.g. eggs'
          onChange={(e) =>
            setName(e.target.value)
          }
        ></input>
        <button type='submit'>
          {isEditing ? "edit" : "submit"}
        </button>
      </form>
      {list.length > 0 && (
        <div className='item-list'>
          <Items
            items={list}
            removeItem={removeItem}
            editItem={editItem}
          />
          <button
            className='clear-btn'
            onClick={clearList}
          >
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
