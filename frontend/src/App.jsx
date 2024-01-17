// App.jsx
import { useState, useEffect } from 'react';
import AdoptionForm from './components/AdoptionForm';

const App = () => {
  const [dogs, setDogs] = useState([]);
  const [adopters, setAdopters] = useState([]);
  const [adoptions, setAdoptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dogsResponse = await fetch('http://localhost:3001/dogs');
        const dogsData = await dogsResponse.json();
        setDogs(dogsData);

        const adoptersResponse = await fetch('http://localhost:3001/adopters');
        const adoptersData = await adoptersResponse.json();
        setAdopters(adoptersData);

        const adoptionsResponse = await fetch('http://localhost:3001/adoptions');
        const adoptionsData = await adoptionsResponse.json();
        console.log('Adopciones:', adoptionsData);
        setAdoptions(adoptionsData);
      } catch (error) {
        console.error('Error al cargar datos:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleAdoptionSubmit = async (dogId, adopterId) => {
    try {
      const response = await fetch('http://localhost:3001/adoptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dogId,
          adopterId,
        }),
      });

      if (response.ok) {
        const newAdoption = await response.json();
        setAdoptions((prevAdoptions) => [...prevAdoptions, newAdoption]);

        // Mostrar una alerta con los datos de la nueva adopción
        alert(`¡Adopción realizada con éxito!\nID: ${newAdoption.id}\nPerro: ${newAdoption.dogId}\nAdoptante: ${newAdoption.adopterId}`);
      } else {
        throw new Error('Error al enviar la solicitud de adopción.');
      }
    } catch (error) {
      console.error('Error en la solicitud de adopción:', error.message);
      throw error;
    }
  };
  return (
    <div className="App">
      <h1>Lista de Adopciones</h1>
      <ul>
        {adoptions.map((adoption) => (
          <li key={adoption.id}>
            {adoption.dog && typeof adoption.dogId === 'number' && dogs.find((dog) => dog.id === adoption.dogId) &&
              `Perro: ${dogs.find((dog) => dog.id === adoption.dogId).name}, `
            }
            {adoption.adopter && typeof adoption.adopterId === 'number' && adopters.find((adopter) => adopter.id === adoption.adopterId) &&
              `Adoptante: ${adopters.find((adopter) => adopter.id === adoption.adopterId).name}`
            }
          </li>
        ))}
      </ul>

      <AdoptionForm dogs={dogs} adopters={adopters} onAdoptionSubmit={handleAdoptionSubmit} />
    </div>
  );
};

export default App;
