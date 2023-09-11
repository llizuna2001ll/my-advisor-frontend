import "../css/covercomponent.css";
import React, {useEffect, useState} from "react";
import {Chip, Skeleton} from "@mui/material";
import AWS from "aws-sdk";
import {Link} from "react-router-dom";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

function CoverComponent() {
    const [imgUrl, setImgUrl] = useState('');
    const [searchText, setSearchText] = useState('');
    const [imageKey, setImageKey] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [openSearch, setOpenSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('token');


    useEffect(() => {
        if (searchText !== '') {
            setOpenSearch(true);
            fetch(
                "http://localhost:8888/api/v1/users/businesses/" + searchText,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    // Modify the data to include imgUrl for each business
                    const modifiedData = data.map((business) => ({
                        ...business,
                        imgUrl: setImageKey(business.profileImgPath),
                    }));
                    setSearchResults(modifiedData);
                })
                .catch((error) => console.error(error))
                .finally(() => setIsLoading(false));
        } else {
            setOpenSearch(false);
            setIsLoading(true);
        }
    }, [searchText]);

    useEffect(() => {

        AWS.config.update({
<<<<<<< HEAD
            accessKeyId: 'AKIAQ4ELPGT74IUCUIRO',
            secretAccessKey: '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',
=======
            accessKeyId: '**********************************',
            secretAccessKey: '************************************',
>>>>>>> 1cbd4b7b09c4517c61a9d7df048fcce378d8b33c
            region: 'eu-north-1',
        });

        const s3 = new AWS.S3();

        const bucketName = 'myadvisorbucket';

        const getObjectUrl = async (bucketName, key) => {
            const params = {Bucket: bucketName, Key: key};
            try {
                const data = await s3.getObject(params).promise();
                return data;
            } catch (error) {
                console.error('Error getting S3 object:', error);
                throw error;
            }
        };

        getObjectUrl(bucketName, imageKey)
            .then((data) => {
                const imageSrc = URL.createObjectURL(new Blob([data.Body]));
                setImgUrl(imageSrc);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const businesses = searchResults.map((business, index) => (
        <div key={business.accountId} className="result">
            <div className="flex">
                <img src={`https://myadvisorbucket.s3.eu-north-1.amazonaws.com/${business.profileImgPath}`} alt="Avatar" width="40px" height="40px" className="rounded-pill"/>
                <Link to={`/businesses/${business.username}`} style={{ color: "black", textDecoration: "none" }}>
                    <p className="mt-2 ms-2">{business.username}</p>
                </Link>
            </div>
            <Chip className="mt-1" label={business.businessType} color="primary"/>
        </div>
    ));

    return (

        <div className="cover-container">
            <img className={"cover-pic"} src="../images/cover-pic.jpg" alt="cover-pic"/>
            <h4 className="cover-title">Ready For Your Next Vacation ?</h4>
            <div className="search-container">
                <form className="d-flex search-bar">
                    <input className="form-control col-8 me-2 search-input" type="text" placeholder="Search"
                           value={searchText}
                           onChange={(e) => setSearchText(e.target.value)}/>
                    <button className="btn btn-primary search-button" type="button">
                        <span className="material-symbols-outlined">search</span>
                    </button>
                </form>
                {openSearch && (
                    <div className="search-results">
                        {!isLoading ? (
                            businesses.length > 0 ? (
                                businesses
                            ) : (
                                <div className='negative-search'>
                                    <SentimentVeryDissatisfiedIcon fontSize='large'/>
                                    <p>No business found</p>
                                </div>
                            )
                        ) : (
                            <>
                                <div className="result">
                                    <div className="flex">
                                        <Skeleton variant="circular" width={40} height={40}/>
                                        <Skeleton variant="text"
                                                  sx={{width: '60px', fontSize: '.5rem', marginLeft: '10px'}}/>
                                    </div>
                                    <Skeleton variant="rounded" width={62} height={27} className="mt-2"/>
                                </div>
                                <div className="result">
                                    <div className="flex">
                                        <Skeleton variant="circular" width={40} height={40}/>
                                        <Skeleton variant="text"
                                                  sx={{width: '60px', fontSize: '.5rem', marginLeft: '10px'}}/>
                                    </div>
                                    <Skeleton variant="rounded" width={62} height={27} className="mt-2"/>
                                </div>
                            </>
                        )}
                    </div>
                )}

            </div>
        </div>


    )
        ;
}

export default CoverComponent;
