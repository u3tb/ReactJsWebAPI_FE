import * as React from 'react';
import Button from '@mui/material/Button';

/* create child component to call from parent component and transfer data from child to parent */
export default function Greeting(props){
    return(
        <React.Fragment>
            <div>
                <p>Hi there {props.name}, content from parent is displayed here!</p> 
                {/*clicking button will update state of the parent component and show the secret in the parent component */}
                <Button variant="contained" color="success" onClick={()=> props.displaySecrete(1)}>Show Secret</Button>
            </div>
        </React.Fragment>
    
 )}