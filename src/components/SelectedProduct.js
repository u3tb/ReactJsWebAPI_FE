import * as React from 'react';
import Button from '@mui/material/Button';
//
import { useLocation } from 'react-router-dom';

/* create child component to call from parent component and transfer data from child to parent */
export default function SelectedProduct(props){
    const location = useLocation();
  const state = location.state;
  console.log(state);
    // const { state } = useLocation();   
    // console.log(state);
    return(
        <React.Fragment>
            <div>
                <p>Hi there {props.name},vào đây rồi!</p> 
                {/*clicking button will update state of the parent component and show the secret in the parent component */}
                <Button variant="contained" color="success" onClick={()=> props.displaySecrete(1)}>Show Secret</Button>
            </div>
        </React.Fragment>
    
 )}