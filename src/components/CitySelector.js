import React from 'react'

const CitySelector = ({onCityChange}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const newCity = e.target.elements.city.value;
        onCityChange(newCity);
     }

    return (
        <div className="city-selector">
            <form onSubmit={handleSubmit}>
                <input type="text" name="city"/>
                <button>Načti počasí</button>
            </form>
        </div>
    )
}

export default CitySelector