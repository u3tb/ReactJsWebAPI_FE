import React, { useEffect, useState } from 'react';

 import { makeStyles } from '@material-ui/core/styles';
 import Grid from '@material-ui/core/Grid';

 import { GET_ALL_PRODUCTS, POST_ADD_CATEGORY } from '../api/apiService';
 import { Paper, Typography,TextField, Button} from '@material-ui/core';
//  import { Autocomplete } from '@mui/material'; /* autocomplete material-ui element */
 import { Redirect } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 20
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 600,
    },
    title: {
        fontSize: 30,
        textAlign: 'center'
    },
    link: {
        padding: 10,
        display: 'inline-block'
    },
    txtInput: {
        width: '98%',
        margin: '1%'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Category() {
    const classes = useStyles();
    const [checkAdd, setCheckAdd] = useState(false);
    const [name, setName] = useState(null);
    const [slugCategory, setSlugCategory] = useState(null);

    const [product, setProduct] = useState(0); //selected product from lst products, initial value is 0 selected item.
    const [products, setProducts] = useState({}); //lst products in select box

    //before run
    useEffect(() => {
        GET_ALL_PRODUCTS('products').then(item => {
            setProducts(item.data);
        });
    },[])
    /* EVENT CHANGE TEXTFIELD IN FORM */
    const handleChangeName = (event) => {
        setName(event.target.value)
    }
    const handleChangeSlugCategory = (event) => {
        setSlugCategory(event.target.value)
    }
    const handleChangeProducts = (event) => {
        setProducts(event.target.value);
    };

    /* EVENT BUTTON SUBMIT FORM ADD PRODUCT */
    const addCategory = (event) => {
        event.preventDefault();
        if (name !== "" && slugCategory !== "") {
            let category = {
                name: name,
                slugCategory: slugCategory                
            }
            POST_ADD_CATEGORY(`categories`, category).then(item => {
                if (item.data === 1) {
                    setCheckAdd(true);
                }
            })
        }
        else {
            alert("Bạn chưa nhập đủ thông tin!");
        }
    }
    /* CHECK setAdd, if true redirect to Home component */
    if (checkAdd) {
        return <Redirect  to="/" />
    }

    return (
        <div className= {classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className= {classes.paper}>
                        <Typography className={classes.title} variant="h4">
                            Add Category
                        </Typography>
                        <Grid item xs={12} sm container>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Name
                                </Typography>
                                <TextField id="Name" onChange={handleChangeName} name="Name" label="Name" variant="outlined" className={classes.txtInput} size="small" />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Slug category
                                </Typography>
                                <TextField id="SlugCategory" onChange={handleChangeSlugCategory} name="SlugCategory" label="SlugCategory" variant="outlined" className={classes.txtInput} size="small" />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="button" onClick={addCategory} fullWidth variant="contained" color="primary" className={classes.submit} >
                                    Add category
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            
        </div>
    )
}