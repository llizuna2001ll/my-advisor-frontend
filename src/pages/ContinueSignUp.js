import React from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import ProfilePictureUploader from "../components/ProfilePictureUploader";
import VisitedCities from "../components/VisitedCities";

const steps = ['Select Visited Cities', 'Upload A Profile Picture'];

function ContinueSignUp() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [visitedCities, setVisitedCities] = React.useState([]);

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };


    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleVisitedCities = (visitedCities) => {
        setVisitedCities(visitedCities)
    };


    return (
        <div className="auth-body">
            <div className="center">
                <Box sx={{
                    width: 800,
                    height: 400,
                    backgroundColor: 'white',
                    marginLeft: '25%',
                    padding: '30px'
                }}>
                    <Stepper activeStep={activeStep}>
                        <Step>
                            <StepLabel>{steps[0]}</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>{steps[1]}</StepLabel>
                        </Step>
                    </Stepper>

                    <React.Fragment>
                        {activeStep === 0 ? (
                                <VisitedCities sendVisitedCitiesToParent={handleVisitedCities}/>
                            ) :
                            (
                                <ProfilePictureUploader visitedCities={visitedCities}/>
                            )}
                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                            <Box sx={{flex: '1 1 auto'}}/>
                                {activeStep !== steps.length - 1 ? <Button onClick={handleNext}>
                                    Next
                                </Button> : ''}
                        </Box>
                    </React.Fragment>
                </Box>
            </div>
        </div>
    );
}

export default ContinueSignUp;