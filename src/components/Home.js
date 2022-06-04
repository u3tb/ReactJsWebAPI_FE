import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import { Redirect } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { GET_ALL_PRODUCTS, DELETE_PRODUCT_ID } from '../api/apiService';

import Greeting from './Greeting';
//
//Import immutability-helper
import update from "immutability-helper";
//Material UI components
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

//Import our Inputs
import InputOne from "./Input_one";
import InputTwo from "./Input_two";
import { Row } from 'react-bootstrap';


// Create context object
export const AppContext = React.createContext();  

// Set up Initial State
const initialState = {
  inputText: "",
  testText: "just test part!!!"
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_INPUT":  //đúng type là UPDATE_INPUT thì mới thực hiện update state
      return update(state, { inputText: { $set: action.data } });  //update giá trị mới cho biến state, từ đó cập nhật lại vào component Input_one và Input_two
    default:
      return initialState;
  }
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 20
    },
    paper: {
        width: '100%',
        margin: 'auto'
    },
    removeLink: {
        textDecoration: 'none'
    }
}));
export default function Home() {
    const [state, dispatch] = React.useReducer(reducer, initialState);  //dùng useReducer gọi tới hàm reducer để cập nhật state kiểu UPDATE_INPUT

    const classes = useStyles();
    const [products, setProducts] = useState({}); //sử dụng useStates trong react hook để set/update giá trị cho state là products
    const [checkDeleteProduct, setCheckDeleteProduct] = useState(false); //khởi tạo giá trị cho state checkDeleteProduct là false, khi nào xóa thành công thì mới set true để hiển thị element Alert.
    const [close, setClose] = React.useState(false);

    //useState establishes state in a functional component
   let [showSecret, setShowSecret] = useState(0)

    useEffect(() => {
        /* GET ALL PRODUCTS */
        GET_ALL_PRODUCTS(`products`).then(item => setProducts(item.data)) //giá trị trả về sẽ được hàm setProducts update giá trị cho state tên products.

    }, [])  //hàm sẽ được gọi ngay sau khi render component xong.tức là hàm tự động được gọi khi load xong component.
    /* Show body HTML */
    const RawHTML = (body, className) =>
        <div className={className} dangerouslySetInnerHTML={{ __html: body.replace(/\n/g, '<br />') }} />

    /* DELETE PRODUCT ID */
    const deleteProductID = (id) => {

        DELETE_PRODUCT_ID(`products/${id}`).then(item => {
            console.log(item)
            if (item.data === 1) {
                setCheckDeleteProduct(true);
                /* UPDATE PRODUCTS */
                setProducts(products.filter(key => key.idProduct !== id))
            }
        })
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        {checkDeleteProduct && <Alert   /* sẽ hiển thị nếu checkDeleteProduct là true */
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setClose(true);
                                        setCheckDeleteProduct(false)
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >Detele successfuly</Alert>}
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell align="center">Body</TableCell>
                                        <TableCell align="center">Slug</TableCell>
                                        <TableCell align="center">Category</TableCell>
                                        <TableCell align="center">Modify</TableCell>
                                        <TableCell align="center">Delete</TableCell>
                                        <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.length > 0 && products.map((row) => (  /* products.length > 0 thì mới hiển thị các row */
                                        <TableRow key={row.idProduct}>
                                            <TableCell component="th" scope="row">{row.title}</TableCell>
                                            <TableCell align="left">{RawHTML(row.body, "body")}</TableCell>
                                            <TableCell align="center">{row.slug}</TableCell>
                                            <TableCell align="center">{row.category.name}</TableCell>
                                            <TableCell align="center">
                                                <Link to={`/edit/product/${row.idProduct}`} className={classes.removeLink}>
                                                    <Button size="small" variant="contained" color="primary">Edit</Button>
                                                </Link>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button size="small" variant="contained" color="secondary" onClick={() => deleteProductID(row.idProduct)}>Remove</Button>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Link to={{pathname:`/selected-product`,
                                                            state: row}} className={classes.removeLink}>
                                                    <Button size="small" variant="contained" color="primary">Choose</Button>
                                                </Link>
                                                {/* <Button size="small" variant="contained" color="success" onClick={() => deleteProductID(row.idProduct)}>Choose</Button> */}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div hidden> new content is hidden</div> {/* thuộc tính hidden chỉ áp dụng được cho html element not for mui.com */}
                        
                        {/* form to tranfer data from child to parent component */}
                        <div>
                            <h3>Tranfer data from child to parent component</h3>
                            <Greeting name='NNHoa' displaySecrete={setShowSecret}/>
                            {/* will show a message once state is true */}
                            {showSecret ? <p>Secret: You just went Against the Flow from child to parent done!!!</p> : <p></p>}
                        </div>

                        {/* truyền dữ liệu giữa 2 sibling component */}
                        {/*Title*/}
                        <Toolbar>
                            <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            align="center"
                            noWrap
                            className={classes.toolbarTitle}
                            >
                            Pass data between react sibling components
                            </Typography>
                        </Toolbar>

                        {/*Inputs*/}
                        <Grid container spacing={1}>
                            <AppContext.Provider value={{ state, dispatch }}>
                            <InputOne />
                            <InputTwo />
                            </AppContext.Provider>
                        </Grid>

                        {/*display testText value*/}
                        <Toolbar>
                            <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            align="center"
                            noWrap
                            className={classes.toolbarTitle}
                            >
                            {state.testText}
                            </Typography>
                        </Toolbar>
                        
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}


