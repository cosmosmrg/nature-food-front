import React from 'react';
import { connect } from 'react-redux';
import Picker from 'react-month-picker'
import './month-picker.css'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { withStyles } from '@material-ui/styles';
import _ from 'lodash'


const styles = theme => ({
    root: {
      width: '100%',
    },
    tableWrapper: {
      maxHeight: 407,
      overflow: 'auto',
    },
    fab: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
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
    }
  });

  function createData(rank, product, quantity, value) {
    return { rank, product, quantity, value };
  }

  const rows = [
    createData('1', 'ข้าวหอม 1 กิโลกรัม', 50, 1500),
    createData('2', 'กล้วย 5 กิโลกรัม', 250, 150),
    createData('3', 'ควย 5 กิโลกรัม', 250, 5000),
    createData('4', 'อิอิ 250 ml', 25, 800),
    createData('5', 'งิงิ 1 กิโลกรัม', 50, 1500),
    createData('6', 'หุหุ 5 กิโลกรัม', 250, 300),
    createData('7', '5 กิโลกรัม', 250, 5000),
    createData('8', '250 ml', 25, 800),
    createData('9', '1 กิโลกรัม', 50, 1500),
    createData('10', '5 กิโลกรัม', 250, 300),
    createData('11', '5 กิโลกรัม', 250, 5000),
    createData('12', '250 ml', 25, 800),
  ];

const now = new Date()
class MonthBox extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            value: this.props.value || 'N/A',
        }

        this._handleClick = this._handleClick.bind(this)
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            value: nextProps.value || 'N/A',
        })
    }

    render() {

        return (
            <div className="box" onClick={this._handleClick}
              style={{backgroundColor:'#F1F1F1',padding:5}}>
                <label>{this.state.value}</label>
            </div>
        )
    }

    _handleClick(e) {
        this.props.onClick && this.props.onClick(e)
    }
}

class MonthPicker extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            mrange: {from: {year: now.getFullYear(), month: now.getMonth()+1}, to: {year: now.getFullYear(), month: now.getMonth()+1}},
        }

        this._handleClickRangeBox = this._handleClickRangeBox.bind(this)
        this.handleRangeChange = this.handleRangeChange.bind(this)
        this.handleRangeDismiss = this.handleRangeDismiss.bind(this)
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            value: nextProps.value || 'N/A',
        })
    }

    render() {

        const pickerLang = {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            from: 'From', to: 'To',
        }
        const mrange = this.state.mrange

        const makeText = m => {
            if (m && m.year && m.month) return (pickerLang.months[m.month-1] + '. ' + m.year)
            return '?'
        }

        return (
          <div className="edit">
              <Picker
                  ref="pickRange"
                  years={{min: {year: now.getFullYear()-10, month: 1}, max: {year: now.getFullYear()+10, month: 12}}}
                  range={mrange}
                  lang={pickerLang}
                  theme="dark"
                  onChange={this.handleRangeChange}
                  onDismiss={this.handleRangeDismiss}
              >
                  <MonthBox value={makeText(mrange.from) + ' ~ ' + makeText(mrange.to)} onClick={this._handleClickRangeBox} />
              </Picker>
          </div>
        )
    }

    _handleClickRangeBox(e) {
        this.refs.pickRange.show()
    }
    handleRangeChange(value, text, listIndex) {
        //
    }
    handleRangeDismiss(value) {
        this.setState( {mrange: value} )
    }
}

class ReportPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage:10,
            data:[],
            switchQuantityFilter: 'asc',
            switchValueFilter: 'asc'
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

        this.columns = [
            { id: 'rank', label: 'อันดับ', minWidth: 50 },
            { id: 'product', label: 'สินค้า', minWidth: 200  },
            {
              id: 'quantity',
              label: 'จำนวน',
              minWidth: 120,
              align: 'left',
              quantityFilter: true
            },
            {
                id: 'value',
                label: 'มูลค่า',
                minWidth: 120,
                align: 'left',
                format: value => value.toLocaleString()+" บาท",
                valueFilter: true
            },
          ];
    }

    componentDidMount(){
        this.getProducts()
    }

    getProducts(){
        this.setState({data: rows})
    }

    filterReport = (switchQuantityFilter, switchValueFilter) => {
        const sort = _.orderBy(this.state.data, ['quantity', 'value'], [switchQuantityFilter, switchValueFilter])
        this.setState({data: sort, switchQuantityFilter, switchValueFilter })
    }

    handleChangePage(event,newPage){
      this.setState({page: newPage})
    }

    handleChangeRowsPerPage(event) {
      this.setState({page: 0,rowsPerPage:event.target.value})
    }
    handleProductCreate(event){
      this.props.history.push('/product/create')
    }
    render() {
        const { classes } = this.props;
        const { page,rowsPerPage,switchQuantityFilter,switchValueFilter,data } = this.state;
        return (
            <Paper className={classes.root}>
              <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start"
                >
                <Fab variant="extended" aria-label="delete"
                  className={classes.fabTransparent}
                  style={{backgroundColor:'transparent',color:'black'}}
                  disabled>
                  Report
                </Fab>
              </Grid>
              <div style={{display: 'flex', marginLeft: '15px'}}>
                <Grid item xs={6} md={4} lm={4}>
                    <MonthPicker />
                </Grid>
                <Grid item xs={2} md={1} lm={1}>
                    <div className="box" onClick={this._handleClick}
                    style={{
                        backgroundColor:'#1DD65D',
                        padding:5,
                        textAlign:'center',
                        marginLeft:'10%',
                        color:'white'
                    }}>
                        <label>APPLY</label>
                    </div>
                </Grid>
              </div>
              <h2 style={{marginLeft: '15px', marginTop: '50px'}}>สรุปยอดขาย</h2>
              <div style={{height: '200px'}} />
            <div className={classes.tableWrapper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {this.columns.map(column => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                      >
                        <div style={{display: 'flex'}}>
                            {column.label}
                            {column.quantityFilter &&
                                (switchQuantityFilter === 'asc' ?
                                <ExpandMoreIcon
                                    style={{ marginLeft: '5px', paddingBottom: '2px' }}
                                    onClick={() => {
                                        this.filterReport('desc', switchValueFilter)
                                    }} />
                                : <ExpandLessIcon
                                    style={{ marginLeft: '5px', paddingBottom: '2px' }}
                                    onClick={() => {
                                        this.filterReport('asc', switchValueFilter)
                                    }} />)
                            }
                            {column.valueFilter &&
                                (switchValueFilter === 'asc' ?
                                <ExpandMoreIcon
                                    style={{ marginLeft: '5px', paddingBottom: '2px' }}
                                    onClick={() => {
                                        this.filterReport(switchQuantityFilter, 'desc')
                                    }} />
                                : <ExpandLessIcon
                                    style={{ marginLeft: '5px', paddingBottom: '2px' }}
                                    onClick={() => {
                                        this.filterReport(switchQuantityFilter, 'asc')
                                    }} />)
                            }
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                    return (
                      <TableRow style={{height: 83}} hover role="checkbox" tabIndex={-1} key={row.productID}>
                        {this.columns.map(column => {
                          const value = row[column.id];
                          return (
                            <TableCell key={value} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value)
                                :
                                column.special?
                                  column.special(value)
                                :
                                value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'previous page',
              }}
              nextIconButtonProps={{
                'aria-label': 'next page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const connectedReportPage = connect(mapState,)(withStyles(styles)(ReportPage));
export { connectedReportPage as ReportPage };
