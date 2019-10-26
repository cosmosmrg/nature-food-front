import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import errorimage from '../static/errorimage.png';
import { dataService } from '../_services/data.service'

import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 500
  },
  fab: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    boxShadow: '0 0 0',
    color:'white',
  },
  fabTransparent:{
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: 'transparent',
    boxShadow: '0 0 0',
  },
  body:{
    paddingLeft:theme.spacing(3),
    paddingBottom:theme.spacing(3)
  },
  textField: {
    width: '30%',
    minWidth: 100,
  },
  resize:{
    fontSize: 15,
    height: theme.spacing(4)
  },
  formControl: {
    marginTop: theme.spacing(3),
  },
});

class ProductCreatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreate:true,
            product:{
              name:"",
              size:"",
              price:"",
              seller:"",
              status:"Non-Subscribe",
              picture:""
            },
            isError:false
        };
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleBack= this.handleBack.bind(this)

    }

    static getDerivedStateFromProps(props, state){
      if(props.match.params.product !== "create" && state.isCreate === true){
        console.log("props.match.params.product",props.match.params.product);
        return {
          isCreate:false,
          product: dataService.getProduct(props.match.params.product)
        }
      }
      return state
    }

    getProductNotFoundError(){
      return(
        <div style={{textAlign: 'center'}}>
          <h3>ไม่พบสินค้า</h3>
        </div>
      )
    }

    getHeader(isCreate){
      if(isCreate){
        return "เพิ่มสินค้าใหม่"
      }
      else{
        return "แก้ไขสินค้า"
      }
    }

    handleChange(event){
      const { target: { name, value } } = event;
      this.setState(() => ({ product:{...this.state.product,[name]: value }}))
    }
    addDefaultSrc(ev){
      ev.target.src = errorimage
    }

    onSubmit(event){
      if(this.validateForm()){
        this.props.history.push('/product')
      }else{
        this.setState(() => ({ isError:true}))
      }
    }
    validateForm(){
      const {product} = this.state;
      return product !== null && product.name !== "" && product.size !== "" && product.price !== ""
    }
    handleBack(event){
      this.props.history.push('/product')
    }

    render() {
        const { classes } = this.props;
        const { isCreate, product,isError } = this.state;
        return (
          <Paper className={classes.root}>
              <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start"
                >
                <Fab variant="extended"
                  aria-label="delete"
                  className={classes.fabTransparent}
                  onClick={this.handleBack}
                  >
                  &#60; {this.getHeader(isCreate)}
                </Fab>
              </Grid>
              <div className={classes.body}>
                {
                  product===undefined?
                    this.getProductNotFoundError()
                    :
                    <Grid
                        container
                        direction="column"
                        justify="space-between"
                        alignItems="flex-start"
                      >
                      <h3>ข้อมูลสินค้า</h3>
                      <TextField
                        id="name"
                        className={classes.textField}
                        value={product.name}
                        margin="normal"
                        name="name"
                        placeholder="ชื่อสินค้า"
                        InputProps={{
                          classes: {
                            input: classes.resize,
                          },
                        }}
                        onChange={this.handleChange}
                        error={isError&&product.name===""}
                        helperText={isError&&product.name===""?"กรุณาใส่ชื่อสินค้า":""}
                      />
                      <TextField
                        id="size"
                        className={classes.textField}
                        value={product.size}
                        margin="normal"
                        name="size"
                        placeholder="ขนาด"
                        InputProps={{
                          classes: {
                            input: classes.resize,
                          },
                        }}
                        onChange={this.handleChange}
                        error={isError&&product.size===""}
                        helperText={isError&&product.size===""?"กรุณาใส่ขนาดสินค้า":""}
                      />
                      <TextField
                        id="price"
                        className={classes.textField}
                        value={product.price}
                        margin="normal"
                        name="price"
                        placeholder="ราคา"
                        InputProps={{
                          classes: {
                            input: classes.resize,
                          },
                        }}
                        onChange={this.handleChange}
                        error={isError&&product.price===""}
                        helperText={isError&&product.price===""?"กรุณาใส่ราคา":""}
                      />
                      <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend" style={{color:'black'}}>สถานะ</FormLabel>
                        <RadioGroup aria-label="status" name="status" value={product.status} onChange={this.handleChange}>
                          <FormControlLabel value="Non-Subscribe" control={<Radio />} label="Non-Subscribe" />
                          <FormControlLabel value="Subscribe" control={<Radio />} label="Subscribe" />
                        </RadioGroup>
                      </FormControl>
                      <p>รูปภาพ</p>
                      <img style={{ maxWidth: 210, maxHeight: 118}}
                        alt={product.name}
                        src={product.picture?product.picture:errorimage}
                        onError={this.addDefaultSrc}/>
                      <Fab size="medium" variant="extended" aria-label="delete"
                        className={classes.fab} style={{backgroundColor:'#0079EA',width:100}}
                        onClick={this.onSubmit}>
                        บันทึก
                      </Fab>
                    </Grid>
                }
              </div>
          </Paper>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const connectedProductCreatePage = connect(mapState,)(withStyles(styles)(ProductCreatePage));
export { connectedProductCreatePage as ProductCreatePage };
