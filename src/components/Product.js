﻿import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { Redirect, Navigate } from 'react-router-dom';

/*Import api */
import { GET_ALL_CATEGORIES, POST_ADD_PRODUCT } from '../api/apiService';
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
const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

export default function Product() {
    const classes = useStyles();
    /* SET ATTRIBUTE FORM ADD PRODUCT */
    const [checkAdd, setCheckAdd] = useState(false);
    const [title, setTitle] = useState(null)
    const [body, setBody] = useState(null)
    const [slug, setSlug] = useState(null)
    const [category, setCategory] = useState(0);
    const [categories, setCategories] = useState({});

    /* BEFORE RUN */
    useEffect(() => {
        /* GET API CATEGORIES */
        GET_ALL_CATEGORIES('categories').then(item => {  /*goi ra san de đưa vào ds select box*/
            setCategories(item.data);
        });

    }, [])

    /* EVENT CHANGE TEXTFIELD IN FORM */
    const handleChangeTitle = (event) => {
        setTitle(event.target.value)
    }
    const handleChangeBody = (event) => {
        setBody(event.target.value)
    }
    const handleChangeSlug = (event) => {
        setSlug(event.target.value)
    }
    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };

    /* EVENT BUTTON SUBMIT FORM ADD PRODUCT */
    const addProduct = (event) => {
        event.preventDefault();
        if (title !== "" && body !== "" && slug !== "" && category > 0) {
            let product = {
                Title: title,
                Body: body,
                Slug: slug,
                idCategory: category
            }
            POST_ADD_PRODUCT(`products`, product).then(item => {
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
        // return <Redirect to="/" />
        return <Navigate  to="/" />
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} variant="h4">
                            Add Product
                        </Typography>
                        <Grid item xs={12} sm container>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Title
                                </Typography>
                                <TextField id="Title" onChange={handleChangeTitle} name="Title" label="Title" variant="outlined" className={classes.txtInput} size="small" />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Body
                                </Typography>
                                <TextField id="outlined-multiline-static" onChange={handleChangeBody} label="Body" name="Body" className={classes.txtInput} multiline rows={4} defaultValue="Body" variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Slug
                            </Typography>
                                <TextField id="Slug" onChange={handleChangeSlug} name="Slug" label="Slug" variant="outlined" className={classes.txtInput} size="small" />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                    Choose Category
                                </Typography>
                                <TextField
                                    id="outlined-select-currency-native"
                                    name="idCategory"
                                    select
                                    value={category}
                                    onChange={handleChangeCategory}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    helperText="Please select your currency"
                                    variant="outlined"
                                    className={classes.txtInput}
                                >
                                    <option value="0">Choose category</option>
                                    {categories.length > 0 && categories.map((option) => (
                                        <option key={option.idCategory} value={option.idCategory}>
                                            {option.name}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="button" onClick={addProduct} fullWidth variant="contained" color="primary" className={classes.submit} >
                                    Add product
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
