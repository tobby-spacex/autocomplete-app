import React, { useEffect, useState} from "react";
import axios from 'axios';
import '../App.css'

function AddItem() {

    const [ newItem, setNewItem ] = useState('');
    const [ newDetails, setnewDetails ] = useState();
    const [ itemList, setItemList ] = useState([]);

    const [ updateItem, setUpdateItem ] = useState('');

    const addItem = () => {

        axios.post("http://localhost:3001/insert", {
            name: newItem,
            details: newDetails
        });

        setItemList([
            ...itemList,
            {name: newItem, details: newDetails},
        ]);
    };

    useEffect(() => {
        axios.get("http://localhost:3001/get").then((response)=> {
            setItemList(response.data.result);
        })
    }, [])


    const deleteItem = (name) => {
        axios.delete(`http://localhost:3001/delete/${name}`);
    }


    const updateItemList = (name) => {
        axios.put("http://localhost:3001/update", {
            name: name,
            details: updateItem,
        });

        setUpdateItem('');
    }


    return (
        <div className="add_item_form">
            <div className="new_name">
                <label>Name</label>
                <input type="text"
                onChange={(e) => {
                    setNewItem(e.target.value);
                }}/>
          
                <label>Value</label>
                <input type="text"
                onChange={(e) => {
                    setnewDetails(e.target.value);
                }}/>
                <button onClick={addItem}>Insert</button>

                {itemList.map((val) => {
                    return(
                    <div className="items_card">
                        {val.name} -  
                        {val.pk}
                        <input type='text' onChange={(e)=> {
                            setUpdateItem(e.target.value)
                        }}/>
                        <button onClick={() => {deleteItem(val.name)}}>Delete</button>
                        <button onClick={() => {updateItemList(val.name)}}>Update</button>
                    </div>
                    )
                })}
                
            </div>
        </div>
    );
}

export default AddItem;