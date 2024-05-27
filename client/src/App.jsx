import React, { useState, useEffect } from 'react';

function App() {
  const port = 5000;
  const [inputValue, setInputValue] = useState("");
  const [readData, setReadData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [editId, setEditId] = useState("");
  const [editingItemId, setEditingItemId] = useState(null); // New state for tracking the editing item

  const fetchData = () => {
    fetch(`http://localhost:${port}/read`)
      .then((response) => response.json())
      .then((data) => {
        setReadData(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addValues = () => {
    if (isUpdate) {
      editValues(editId);
    } else {
      fetch(`http://localhost:${port}/data`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          data: inputValue
        })
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      }).then((response) => {
        alert(response.message);
        fetchData();
        setInputValue("")
      });
    }
  };

  const updateTodo = (id, text) => {
    setIsUpdate(true);
    setEditId(id);
    setInputValue(text);
    setEditingItemId(id); // Set the ID of the editing item
  };

  const editValues = (id) => {
    fetch(`http://localhost:${port}/update`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        text: inputValue,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((response) => {
        alert(response.message);
        fetchData();
        setIsUpdate(false);
        setInputValue("");
        setEditingItemId(null); // Reset the editing item ID
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const deleteItem = (id) => {
    fetch(`http://localhost:${port}/delete`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then((response) => {
        alert(response.message);
        fetchData();
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Error deleting the item: ' + error.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
        <div className="bg-green-900 text-white text-center p-4 rounded">
          <h1 className="text-4xl font-bold mb-4">Todo App</h1>
        </div>
       
        <div className="flex my-4">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded mr-2"
            placeholder="Enter todo"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={isUpdate ? () => editValues(editId) : addValues}
          >
            {isUpdate ? "Update" : "Add"}
          </button>
        </div>
        <ul>
          {readData.map((data) => (
            <li key={data._id} className={`flex items-center justify-between p-2 border ${editingItemId === data._id ? "border-1.5 border-green-500 rounded" : "border-gray-200"}`}>
              <span className="text-lg">{data.text}</span>
              <div>
                <button
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                  onClick={() => updateTodo(data._id, data.text)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white p-1 rounded"
                  onClick={() => deleteItem(data._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
