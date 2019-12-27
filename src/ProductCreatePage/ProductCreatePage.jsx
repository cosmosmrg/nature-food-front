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
import Badge from '@material-ui/core/Badge';
import errorimage from '../static/errorimage.png';
import { dataService } from '../_services/data.service'
import { createService } from '../_services/create.service'

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
              _id:"",
              name:"",
              size:"",
              price:"",
              image:"",
              seller:"",
              is_package:false,
              status:"active",
            },
            // product:{
            //   _id: "5db7a85c19cead324808ba36",
            //   name: "test",
            //   size: "2 kg",
            //   price: 100,
            //   image: null,
            //   // image: "data:image/gif;base64,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",
            //   is_package: false,
            //   status: "A",
            //   __v: 0,
            //   seller: "Nature Food",
            // },
            isError:false,
            image : ""
        };
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleBack= this.handleBack.bind(this)
        this.handleBack= this.handleBack.bind(this)
        this.removeImage = this.removeImage.bind(this)
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this)

    }
    componentDidMount(){
      const {product} = this.props.match.params
      const {isCreate} = this.state
      if(product !== "create" && isCreate === true){
        this.getProduct(product)
        this.setState(() => ({ isCreate:false}))
      }
    }

    getProduct(id){
      dataService.getProduct(id)
        .then(data => {
          this.setState(() => ({ product:data, image: data.image}))
        })
        .catch(err=>{
          if(err===401){
            this.props.history.push('/login')
          }
          else{
            this.setState(() => ({ product:undefined}))
          }
        })
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
      const { image } = this.state
      if (this.state.product.image !== image) {
        // remove blob
        const imgaeBase64 = { photo: image.split("blob:")[1] };
        // shoot api
        createService.uploadImageProduct(imgaeBase64)
        .then(data =>{
          console.log("onUpload",data);
        })
        .catch(err =>{
          console.log(err);
        })
      }

      const { product } = this.state

      if(this.validateForm()){
        const { isCreate } = this.state;
        const preparedCreateObj = {
          name: product.name,
          size: product.size,
          price: product.price,
          image: product.image,
          // seller: product.seller,
          is_package: product.is_package,
          // status: product.status,
        }

        if(isCreate){
          createService.createProduct(preparedCreateObj)
            // .then(data =>{
            //   console.log("onCreate",data);
            //   this.props.history.push('/product')
            // })
            // .catch(err =>{
            //   console.log(err);
            // })
        }
        else{
          const preparedEditObj = {
            id: product._id,
            name: product.name,
            size: product.size,
            price: product.price,
            image: product.image,
            // seller: product.seller,
            is_package: product.is_package,
            status: product.status,
          }
          createService.editProduct(preparedEditObj)
            // .then(data =>{
            //   console.log("onEdit",data);
            //   this.props.history.push('/product')
            // })
            // .catch(err =>{
            //   console.log(err);
            // })
        }
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

    removeImage(event){
      this.setState(() => ({ image: "" }))
    }
    fileSelectedHandler(event){
      event.persist()
      this.setState(() => ({ product:{...this.state.product,image: URL.createObjectURL(event.target.files[0])}}))
    }

    onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        this.setState({
          image: URL.createObjectURL(event.target.files[0])
        });
      }
      console.log('selected image', this.state.image)
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
                        value={product.name||""}
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
                        value={product.size||""}
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
                        value={product.price||""}
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
                        <RadioGroup aria-label="status" name="status" value={product.status||"active"} onChange={this.handleChange}>
                          <FormControlLabel value="active" control={<Radio />} label="active" />
                          <FormControlLabel value="cancel" control={<Radio />} label="cancel" />
                        </RadioGroup>
                      </FormControl>
                      <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend" style={{color:'black'}}>แพ็คเกจ</FormLabel>
                        <RadioGroup aria-label="status" name="status" value={product.is_package.toString()||"true"} onChange={this.handleChange}>
                          <FormControlLabel value="true" control={<Radio />} label="ใช่" />
                          <FormControlLabel value="false" control={<Radio />} label="ไม่ใช่" />
                        </RadioGroup>
                      </FormControl>
                      <p>รูปภาพ</p>
                      {
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <input style={{marginBottom: '20px'}} type="file" onChange={this.onImageChange} className="filetype" id="group_image"/>
                          <div style={{display: 'flex'}}>
                            <img style={{ maxWidth: 210, maxHeight: 118 }}
                              alt={product.name}
                              src={this.state.image}
                              onError={this.addDefaultSrc}
                            />
                            <Badge style={{ display: 'block' }} color="secondary" badgeContent="x" onClick={this.removeImage} />
                          </div>
                        </div>
                      }

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
