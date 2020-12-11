import React from 'react'
import {ComboBox,Dropdown,Label,PrimaryButton, DatePicker, DayOfWeek, IDatePickerStrings,Icon, SearchBox} from '@fluentui/react';
import './reportpage.scss'
import {DetailsList, DetailsListLayoutMode, IDetailsHeaderProps, Selection, ConstrainMode, IDetailsFooterProps, DetailsRow,} from 'office-ui-fabric-react/lib/DetailsList';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { ScrollablePane, ScrollbarVisibility } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { SelectionMode } from 'office-ui-fabric-react/lib/Selection';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { IDetailsColumnRenderTooltipProps } from 'office-ui-fabric-react/lib/DetailsList';
import onRenderDetailsHeader from './renderheader'
import axios from 'axios'
import moment from 'moment'

const DayPickerStrings = {
    months: ['January','February','March','April','May','June','July','August','September','October','November','December',],
    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    goToToday: 'Go to today',
    prevMonthAriaLabel: 'Go to previous month',
    nextMonthAriaLabel: 'Go to next month',
    prevYearAriaLabel: 'Go to previous year',
    nextYearAriaLabel: 'Go to next year',
    closeButtonAriaLabel: 'Close date picker',
    monthPickerHeaderAriaLabel: '{0}, select to change the year',
    yearPickerHeaderAriaLabel: '{0}, select to change the month',
    isRequiredErrorMessage: 'Start date is required.',
    invalidInputErrorMessage: 'Invalid date format.',
  };
const controlClass = mergeStyleSets({
control: {
    margin: '0 0 15px 0',
    maxWidth: '300px',
},
});
const firstDayOfWeek = DayOfWeek.Sunday;
const desc = 'This field is required. One of the support input formats is year dash month dash day.';
const classNames = mergeStyleSets({
    table: {
      margin: 'auto',
    }
  });


class ReportPage extends React.Component{
    constructor(){
        super()
        this.state = {  
            searchType:"All",
            searchWhat:"",
            items:[{ 
                ID: null,
                WarehouseUser: [],
                BuyerUser: [],
                ConveyorID: null,
                Standard: "",
                CoconutType: "",
                WarehouseLocation: "",
                Region: "",
                ImportCode: "",
                Transporter: ""
            }], 
        }
        this.onSearchBox=this.onSearchBox.bind(this)
        this.onChangeDropdown=this.onChangeDropdown.bind(this)
        this.onSelectDateBegin=this.onSelectDateBegin.bind(this)
        this.onSelectDateEnd=this.onSelectDateEnd.bind(this)
        
        this._columns = [
            { key: 'column0', name: 'Mã lô dừa', fieldName: 'ImportCode', minWidth: 80,  isResizable: true },
            { key: 'column1', name: 'Tiêu chuẩn', fieldName: 'Standard', minWidth: 100,  isResizable: true },
            { key: 'column2', name: 'Nhân viên thu mua', fieldName: 'BuyerUser', minWidth: 140,  isResizable: true },
            { key: 'column3', name: 'Nhân viên thủ kho', fieldName: 'WarehouseUser', minWidth: 140,  isResizable: true },
            { key: 'column4', name: 'Loại dừa', fieldName: 'CoconutType', minWidth: 80, isResizable: true },
            { key: 'column5', name: 'Vùng thu mua', fieldName: 'Region', minWidth: 100,  isResizable: true },
            { key: 'column6', name: 'Đơn vị vận chuyển', fieldName: 'Transporter', minWidth: 140,  isResizable: true },
            { key: 'column7', name: 'Vị trí lưu kho', fieldName: 'WarehouseLocation', minWidth: 140,  isResizable: true },
            { key: 'column8', name: 'Băng tải lên dừa', fieldName: 'ConveyorID', minWidth: 140,  isResizable: true },
        ];
    }
    onSelectDateBegin(dateBegin){
        // dateBegin = moment(dateBegin).subtract(10,'day').format('YYYY-MM-DD')
        console.log(dateBegin)
        
    }
    onSelectDateEnd(dateEnd){
        console.log(dateEnd)
    }
    onSearchBox(_,text){
        if (text==""){
            axios.get('http://localhost:9000/api/data/getallimportsessions').then(res=>{
              this.setState({items:res.data})
            })
        } else {
            axios.get('http://localhost:9000/api/data/getsearchbyname', 
            {params: {searchType: this.state.searchType, searchWhat: text}}).then(res=>
                this.setState({items:res.data})
            )
        }
            
    }
    onChangeDropdown(_,option){
        return(
            this.setState({searchType:option.key})

        )
    }
    options = [
        { key: 'All', text: 'Tất cả' },
        { key: 'Standard', text: 'Tiêu chuẩn' },
        { key: 'BuyerUser', text: 'Nhân viên thu mua' },
        { key: 'WarehouseUser', text: 'Nhân viên thủ kho' },
        { key: 'CoconutType', text: 'Loại dừa' },
        { key: 'Region', text: 'Vùng thu mua' },
        { key: 'ImportCode', text: 'Mã lô dừa' },
        { key: 'Transporter', text: 'Đơn vị vận chuyển' },
        { key: 'WarehouseLocation', text: 'Vị trí lưu kho'},
      ];
      componentDidMount(){
          axios.get('http://localhost:9000/api/data/getallimportsessions').then(res=>{
              this.setState({items:res.data})
              console.log(this.state.items[0].BuyerUser.Name)
          })
      }
    render(){
        return(
            <div className='reportpage'>
                <div className='navheader'>
                    <div className="leftHeader">
                        <Label className='headerTitle'>
                           Tìm kiếm
                        </Label>
                        <ComboBox
                            className='dropdown'
                            defaultSelectedKey='ngaynhapkho'
                            // dropdownWidth={170}
                            // borderless={true}                            
                            // selectedKey={this.state._columns}
                            // eslint-disable-next-line react/jsx-no-bind
                            onChange={this.onChangeDropdown}
                            placeholder="Tất cả"
                            options={this.options}
                            
                        />
                        <SearchBox className='searchBox' placeholder="Tìm kiếm" onChange={this.onSearchBox}/>
                    </div>
                    <div className='centerHeader'>
                        <DatePicker
                            className='date'
                            isRequired={false}
                            // borderless={true}
                            allowTextInput={true}
                            ariaLabel={desc}
                            firstDayOfWeek={firstDayOfWeek}
                            strings={DayPickerStrings}
                            placeholder='Từ ngày'
                            // value={value}
                            // eslint-disable-next-line react/jsx-no-bind
                            onSelectDate={this.onSelectDateBegin}
                            
                        />
                        <div style={{paddingLeft:'8px'}}></div>
                        <DatePicker
                            className='date'
                            isRequired={false}
                            // borderless={true}
                            allowTextInput={true}
                            ariaLabel={desc}
                            firstDayOfWeek={firstDayOfWeek}
                            strings={DayPickerStrings}
                            placeholder='Đến ngày'
                            // value={value}
                            // eslint-disable-next-line react/jsx-no-bind
                            onSelectDate={this.onSelectDateEnd}
                            
                        />
                        
                    </div>
                    <div className='rightHeader'>
                        <PrimaryButton className='headerButtonText' text="Xuất báo cáo tháng" />
                        <PrimaryButton className='headerButtonText' text="Xuất báo cáo theo User" />
                    </div>
                </div>
                <div className="contentContainer">
                    <Label className='textContent'>Hiển thị báo cáo tháng</Label>
                    <ScrollablePane className='pane' scrollbarVisibility={ScrollbarVisibility.auto}>
                        <DetailsList
                            items={this.state.items}
                            columns={this._columns}
                            setKey="set"
                            layoutMode={DetailsListLayoutMode.justified}
                            constrainMode={ConstrainMode.unconstrained}
                            onRenderDetailsHeader={onRenderDetailsHeader}
                        />
                    </ScrollablePane>
                    {/* <Label className='textContent'>Hiển thị báo cáo chi tiết từng lô nguyên liệu</Label>
                    <ScrollablePane className='pane' scrollbarVisibility={ScrollbarVisibility.auto}>
                        <DetailsList
                            items={this.state.items2}
                            columns={this._columns2}
                            setKey="set"
                            layoutMode={DetailsListLayoutMode.justified}
                            constrainMode={ConstrainMode.unconstrained}
                            onRenderDetailsHeader={onRenderDetailsHeader}
                        />
                    </ScrollablePane> */}
                </div>
            </div>                    
                
        )
    }
}

export default ReportPage