import {Button, FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import '../css/visited-cities.css';
import {useState} from "react";




function VisitedCities({sendVisitedCitiesToParent}) {
    const token = localStorage.getItem('token');
    const [visitedCities, setVisitedCities] = useState([]);
    const [cities, setCities] = useState([]);
    const [cityRelations, setCityRelations] = useState({});

    const handleChange = (event, cityId) => {
        const newRelation = event.target.value;
        setCityRelations((prevRelations) => ({
            ...prevRelations,
            [cityId]: newRelation,
        }));
    };

    sendVisitedCitiesToParent(visitedCities)

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

    function addCity(cityId, relationWithUser) {
        const data = { relationWithUser, cityId };

        if (visitedCities.some((item) => item.cityId === cityId)) {

            const updatedVisitedCities = visitedCities.filter((item) => item.cityId !== cityId);
            setVisitedCities(updatedVisitedCities);
        } else {

            visitedCities.push(data);
        }
    }


    return (
        <div className="visited-cities">
            {cities.map((city, index) => (
                    <Grid key={city.cityId} className="visited-city" container>
                        <img src={city.imgPath} width={70} height={70} alt={city.name}/>
                        <p className="mt-3">{city.name}</p>
                        <FormControl sx={{minWidth: '20%', maxWidth: '20%'}} size="small">
                            <InputLabel id={`relation-label-${index}`}>Relation</InputLabel>
                            <Select
                                labelId={`relation-label-${index}`}
                                id={`relation-select-${index}`}
                                value={cityRelations[city.cityId] || ''}
                                label="Relation"
                                onChange={(event) => handleChange(event, city.cityId)}
                            >
                                <MenuItem value="HABITANT">Habitant</MenuItem>
                                <MenuItem value="EX_HABITANT">Ex-Habitant</MenuItem>
                                <MenuItem value="TOURIST">Visitor</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            sx={{minWidth: '83px'}}
                            variant="contained"
                            disabled={cityRelations[city.cityId] === undefined || cityRelations[city.cityId] === ''}
                            onClick={() => addCity(city.cityId, cityRelations[city.cityId])}
                        >
                            {visitedCities.some((item) => item.cityId === city.cityId) ? 'Delete' : 'Add'}
                        </Button>
                    </Grid>
                )
            )}
        </div>
    )
}

export default VisitedCities;