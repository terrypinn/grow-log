import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns'

const Plant = (props) => (
  <tr>
    <td>{props.plant.cultivar.name}</td>
    <td>{props.plant.cultivar.type}</td>
    <td>{formatDistance(props.plant.created_on, Date.now(), { addSuffix: true })}</td>
    <td>
      <Link className="btn btn-link" to={`/plant/${props.plant._id}`}>View</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deletePlant(props.plant._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function Plants() {
  const [plants, setPlants] = useState([]);

  // This method fetches the plants from the database.
  useEffect(() => {
    async function getPlants() {
      const response = await fetch(`http://localhost:5000/plants/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const plants = await response.json();
      setPlants(plants);
    }

    getPlants();

    return; 
  }, [plants.length]);

  // This method will delete a plant
  async function deletePlant(id) {
    await fetch(`http://localhost:5000/plant/${id}`, {
      method: "DELETE"
    });

    const newPlants = plants.filter((el) => el._id !== id);
    setPlants(newPlants);
  }

  // map out the plants on the table
  function plantList() {
    return plants.map((plant) => {
      return (
        <Plant
          plant={plant}
          deletePlant={() => deletePlant(plant._id)}
          key={plant._id}
        />
      );
    });
  }

  return (
    <div>
      <h3>Plants</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Created On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{plantList()}</tbody>
      </table>
      <Link className="btn btn-link" to={`/plant/add`}>Add</Link>
    </div>
  );
}
