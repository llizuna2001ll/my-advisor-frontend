import '../css/filterBar.css';
import {Alert, Button, Collapse, Rating} from "@mui/material";
import {useEffect, useState} from "react";

function FilterForCategory({filterValues}, {isSelectActive}) {
    const token = localStorage.getItem('token');
    const [rating, setRating] = useState(0);
    let [businessTypes, setBusinessTypes] = useState([]);
    const [types, setTypes] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [open, setOpen] = useState(false);

    const filter = async (event) => {
        event.preventDefault();
        if (selectedCity === "") {
            setOpen(true);
        }
        else {
            setOpen(false);
            filterValues(rating, selectedCity);
        }
    }

    function handleCityChange(event) {
        setSelectedCity(event.target.value);
    }

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked && !businessTypes.includes(value)) {
            setBusinessTypes([...businessTypes, value]);
        } else if (!isChecked && businessTypes.includes(value)) {
            setBusinessTypes(businessTypes.filter((v) => v !== value));
        }
    };

    useEffect(() => {
        fetch('http://localhost:8888/api/v1/businessTypes', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setTypes(data);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8888/api/v1/cities', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setCities(data);
            })
            .catch(error => console.error(error));
    }, []);

    const checkBoxes = types.map((type, index) =>
        <div key={type.typeId} className="form-check">
            <input className="form-check-input" type="checkbox" value={type.typeName} id={type.typeName}
                   checked={businessTypes.includes(type.typeName)} onChange={handleCheckboxChange} disabled/>
            <label className="form-check-label" htmlFor={type.typeName}>{type.typeName}</label>
        </div>
    );

    const options = cities.map((city, index) =>
        <option key={city.cityId}>{city.name}</option>
    );


    return (
        <div className="filter-bar-container">
            <form onSubmit={filter}>
                <h4 className="pt-3 ps-3">Type</h4>
                <div className="ps-5">
                    {checkBoxes}
                </div>
                <h4 className="pt-3 ps-3">Filter city</h4>
                <div className="d-flex ps-5">
                    <select disabled={isSelectActive} value={selectedCity} onChange={handleCityChange}
                            className="form-select w-75">
                        <option>City</option>
                        {options}
                    </select>
                </div>
                <Collapse in={open}>
                    <Alert severity="error" style={{position: "absolute", top: "0"}}
                           action={
                               <Button onClick={() => {
                                   setOpen(false);
                               }} color="inherit" size="small">
                                   UNDO
                               </Button>
                           }
                    >
                        Please Select a city Before filtering!
                    </Alert>
                </Collapse>

                <h4 className="pt-3 ps-3">Rating</h4>
                <div className="d-flex justify-content-start ps-5">
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                    />
                </div>
                <button className="confirmFilter">show results</button>
            </form>
        </div>
    )
        ;

}

export default FilterForCategory;