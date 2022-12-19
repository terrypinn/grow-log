import { useEffect, useState } from 'react';
import PlantTable from './PlantTable';

export default function PlantList() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/plants`)
      .then(resppnse => resppnse.json())
      .then(plants => setPlants(plants));
  }, []);

  return (
    <PlantTable plants={plants} />
  );
}
