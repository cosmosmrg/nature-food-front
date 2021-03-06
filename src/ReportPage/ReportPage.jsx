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
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { withStyles } from '@material-ui/styles';
import {Bar} from 'react-chartjs-2';
import _ from 'lodash'
import { dataService } from '../_services/data.service';
import moment from 'moment'


export const barOptions = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
}

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
        if (typeof props.onChangecallBack === 'function') {
          this.onChangecallBack = props.onChangecallBack.bind(this);
        }

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
        this.onChangecallBack(value);
    }
}

class ReportPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            switchQuantityFilter: 'asc',
            switchValueFilter: 'asc',
            dataReport: {},
            total_sale:0
        };
        this.datePicker = {
          from: {
            month: 1,
            year: 2019
          },
          to: {
            month: 10,
            year: 2019
          }
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.apply = this.apply.bind(this);
        this.dataChange = this.dataChange.bind(this);

        this.columns = [
            { id: 'name', label: 'สินค้า', minWidth: 200  },
            {
              id: 'amount',
              label: 'จำนวน',
              minWidth: 120,
              align: 'left',
              quantityFilter: true
            },
            {
                id: 'totalprice',
                label: 'มูลค่า',
                minWidth: 120,
                align: 'left',
                format: value => value.toLocaleString()+" บาท",
                valueFilter: true
            },
          ];
    }

    componentDidMount(){
        const today = moment().utc(7)
        this.getReports(today.toISOString(), today.toISOString())
        const picker = {
          month: today.month(),
          year: today.year()
        }
        this.datePicker.from =picker;
        this.datePicker.to =picker;
    }

    getReports(startDate, stopDate){
      dataService.getReport(startDate, stopDate)
      .then(data => {
        this.setState(() =>
        ({ data:data.top_sales,
          dataReport: dataService.getReportChart(data.labels, data.data),
          total_sale:data.total_sale
        }))
      })
      .catch(err=>{
        if(err===401){
          this.props.history.push('/login')
        }
      })
    }

    apply(){
      const startDate = moment(`01-${this.datePicker.from.month}-${this.datePicker.from.year}`, 'DD-MM-YYYY').utc(7).toISOString()
      const endDate = moment(`01-${this.datePicker.to.month}-${this.datePicker.to.year}`, 'DD-MM-YYYY').utc(7).toISOString()
      this.getReports(startDate, endDate)
    }

    dataChange(date){
      this.datePicker = date;
    }

    filterReport = (switchQuantityFilter, switchValueFilter) => {
        const sort = _.orderBy(this.state.data, ['amount', 'totalprice'], [switchQuantityFilter, switchValueFilter])
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
        const { switchQuantityFilter,switchValueFilter, data,  dataReport,total_sale} = this.state;

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
              <div style={{display: 'flex', marginLeft: '15px', marginBottom: '10px'}}>
                <Grid item xs={6} md={4} lm={4}>
                    <MonthPicker onChangecallBack={this.dataChange}/>
                    <h2>สรุปยอดขาย</h2>
                    <h1>{total_sale}</h1>
                </Grid>
                <Grid item xs={2} md={1} lm={1}>
                    <div className="box" onClick={this._handleClick}
                    style={{
                        backgroundColor:'#1DD65D',
                        padding:5,
                        textAlign:'center',
                        marginLeft:'10%',
                        color:'white',
                        cursor: 'pointer'
                    }}>
                        <label onClick={this.apply} style={{cursor: 'pointer'}} >APPLY</label>
                    </div>
                </Grid>
                <Grid item xs={12} md={6} lm={4}>
                <div className="box" onClick={this._handleClick}
                    style={{
                        backgroundColor:'white',
                        padding:5,
                        textAlign:'center',
                        marginLeft:'10%',
                        color:'white'
                    }}>
                        <Bar
          data={dataReport}
          width={100}
          height={250}
          options={barOptions}
        />
                    </div>
                </Grid>
              </div>


            <div className={classes.tableWrapper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{ minWidth: 50, fontWeight: 'bold' }}
                    >
                      <div style={{display: 'flex'}}>
                          อันดับ
                      </div>
                    </TableCell>
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
                  {data.map((row, index) => {
                    return (
                      <TableRow style={index%2===0 ? {backgroundColor:'#f2f2f2',height: 83} : {height: 83}} hover role="checkbox" tabIndex={-1} key={row.productID}>
                        <TableCell>
                          {index + 1}
                        </TableCell>
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
