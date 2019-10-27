import React from 'react';
import { connect } from 'react-redux';
import Picker from 'react-month-picker'
import './month-picker.css'
import Grid from '@material-ui/core/Grid';


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

    render() {
        return (
          <div>
            <h1>ReportPage</h1>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-start"
              >
              <Grid item xs={6} md={4} lm={4}>
                <MonthPicker/>
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
              <Grid item xs={4} md={7} lm={7}/>
            </Grid>
          </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const connectedReportPage = connect(mapState,)(ReportPage);
export { connectedReportPage as ReportPage };
