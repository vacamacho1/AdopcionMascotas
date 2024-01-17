// AdoptionForm.jsx
import { useState } from 'react';

const AdoptionForm = ({ dogs, adopters, onAdoptionSubmit }) => {
    const [selectedDog, setSelectedDog] = useState('');
    const [selectedAdopter, setSelectedAdopter] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedDog && selectedAdopter) {
            onAdoptionSubmit(selectedDog, selectedAdopter);
            // Clear selected values after submission
            setSelectedDog('');
            setSelectedAdopter('');
        } else {
            console.error('Debe seleccionar un perro y un adoptante.');
        }
    };

    return (
        <div>
            <h2>Solicitud de Adopción</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="dogSelect">Seleccionar Perro:</label>
                    <select
                        id="dogSelect"
                        value={selectedDog}
                        onChange={(e) => setSelectedDog(e.target.value)}
                    >
                        <option value="" disabled>Seleccione un perro</option>
                        {dogs.map((dog) => (
                            <option key={dog.id} value={dog.id}>{dog.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="adopterSelect">Seleccionar Adoptante:</label>
                    <select
                        id="adopterSelect"
                        value={selectedAdopter}
                        onChange={(e) => setSelectedAdopter(e.target.value)}
                    >
                        <option value="" disabled>Seleccione un adoptante</option>
                        {adopters.map((adopter) => (
                            <option key={adopter.id} value={adopter.id}>{adopter.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Enviar Solicitud</button>

                {/* Mostrar lista de adoptantes y perros disponibles */}
                <div>
                    <h3>Adoptantes Disponibles:</h3>
                    <ul>
                        {adopters.map((adopter) => (
                            <li key={adopter.id}>{adopter.name}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>Perros Disponibles:</h3>
                    <ul>
                        {dogs.map((dog) => (
                            <li key={dog.id}>{dog.name}</li>
                        ))}
                    </ul>
                </div>
            </form>
        </div>
    );
};

export default AdoptionForm;
