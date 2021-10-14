import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';


function App() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get('http://localhost:3001');
      setUsers(response.data.result);
      // console.log(response2.data.data);
      // console.log(response.data);
      // console.log(response.data.result);
    }
   
    loadUsers();
  })

  const onChangeHandler = (text) => {
    let matches = []
    if (text.length > 0) {
      matches = users.filter(urs => {
        const regex = new RegExp(`${text}`, "gi")
        return urs.name.match(regex)
      })
    }
    console.log(matches);
    setSuggestions(matches)
    setText(text)
  }

  const selectText = (text) => {
    setText(text);
    setSuggestions([])
  }

  return (
    <div className="App">
      <h2>Search Application</h2>
        <input type="text"
        onChange={e => onChangeHandler(e.target.value)}
        value={text}/>

        {suggestions && suggestions.map((suggestion, i) =>
          <div className="seggestion" key={i} onClick={() => selectText(suggestion.name)}>{suggestion.name} </div>
        )}
    </div>
  );
}

export default App;
