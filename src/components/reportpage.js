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


const DayPickerStrings = {
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  
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
            searchType:'ngaynhapkho',
            itemsRender:'',
            items:[ 
            {key:1,name:'abc',ngaynhapkho:'motngaynaodo',nhanvienthumua:'vu'},
            {key:2,name:'abc',ngaynhapkho:'motngaynaodo1',nhanvienthumua:'vu1'},
            {key:3,name:'abc00000000000000000000000000', ngaynhapkho:'motngaynaodo',nhanvienthumua:'vu'},
            {key:4,name:'abc', ngaynhapkho:'motngaynaodo2',nhanvienthumua:'vu3'},
            {key:5,name:'abc', ngaynhapkho:'motngaynaodo3',nhanvienthumua:'vu4'},
            {key:6,name:'abc', ngaynhapkho:'motngaynaodo4',nhanvienthumua:'vu5'},
            {key:7,name:'abc', ngaynhapkho:'motngaynaodo5',nhanvienthumua:'vu7'},
            {key:8,name:'abc', ngaynhapkho:'motngaynaodo6',nhanvienthumua:'vu6'},
            {key:9,name:'abc', ngaynhapkho:'motngaynaodo7',nhanvienthumua:'vu8'},
            {key:10,name:'abc', ngaynhapkho:'motngaynaodo8',nhanvienthumua:'vu9'},
            {key:11,name:'abc', ngaynhapkho:'motngaynaodo9',nhanvienthumua:'vu0'},
            {key:12,name:'abc', ngaynhapkho:'motngaynaodo',nhanvienthumua:'vu.'},
            {key:13,name:'abc', ngaynhapkho:'motngaynaodo',nhanvienthumua:'vu..'},
            {key:14,name:'abc', ngaynhapkho:'motngaynaodo',nhanvienthumua:'vu...'},
            {key:15,name:'abc', ngaynhapkho:'motngaynaodo',nhanvienthumua:'vu....'},
            {key:16,name:'abc',ngaynhapkho:'final',nhanvienthumua:'vu.....'},
            ],
            items2:[
                {key:1,name:'abc',value:2},
                {key:2,name:'abc',value:2},
                {key:3,name:'abc',value:2},
                {key:4,name:'abc',value:2},
                {key:5,name:'abc',value:2},
                {key:6,name:'abc',value:2},
                {key:7,name:'abc',value:2},
                {key:8,name:'abc',value:2},
            ], 

        }
        this.onSearchBox=this.onSearchBox.bind(this)
        this.onChangeDropdown=this.onChangeDropdown.bind(this)
        this.state.itemsRender=this.state.items
        this._columns = [
            { key: 'column1', name: 'Ngày nhập kho', fieldName: 'ngaynhapkho', minWidth: 100,  isResizable: true },
            { key: 'column2', name: 'Nhân viên thu mua', fieldName: 'nhanvienthumua', minWidth: 100,  isResizable: true },
            { key: 'column3', name: 'Nhân viên thủ kho', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column4', name: 'Loại dừa', fieldName: 'name', minWidth: 100, isResizable: true },
            { key: 'column5', name: 'Vùng thu mua', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column6', name: 'Hình thức mua bán', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column7', name: 'Nhà cung cấp', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column8', name: 'Hình thức lên dừa', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column9', name: 'Quy cách đếm', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column10', name: 'Thời gian NNC đến', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column11', name: 'Thời gian bắt đầu nhập kho', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column12', name: 'Thời gian kết thúc nhập kho', fieldName: 'name', minWidth: 100, isResizable: true },
            { key: 'column13', name: 'Số lượng', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column14', name: 'Mã lô kho', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column15', name: 'Vị trí lưu kho', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column16', name: 'Mã niêm phong bắt đầu', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column17', name: 'Mã niêm phong kết thúc', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column18', name: 'Dừa nhỏ', fieldName: 'name', minWidth: 100, isResizable: true },
            { key: 'column19', name: 'Dừa hư, úng màu, mọng', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column20', name: 'Dừa trăng ăn, điếc, dừa me', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column21', name: 'Phân/Đất lẫn trên dừa', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column22', name: 'Tình trạng niêm phong', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column23', name: 'Tình trạng vệ sinh', fieldName: 'name', minWidth: 100,  isResizable: true },
            
        ];
        this._columns2 = [
            { key: 'column1', name: 'Đơn vị vận chuyển', fieldName: 'name', minWidth: 100, isResizable: true },
            { key: 'column2', name: 'Vùng', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column3', name: 'Băng tải lên dừa', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column4', name: 'Vị trí lưu kho', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column5', name: 'Khối lượng', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column6', name: 'Số lượng', fieldName: 'name', minWidth: 100, isResizable: true },
            { key: 'column7', name: 'Vùng', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column8', name: 'Vị trí lưu kho', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column1', name: 'Đơn vị vận chuyển', fieldName: 'name', minWidth: 100, isResizable: true },
            { key: 'column2', name: 'Vùng', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column3', name: 'Băng tải lên dừa', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column4', name: 'Vị trí lưu kho', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column5', name: 'Khối lượng', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column6', name: 'Số lượng', fieldName: 'name', minWidth: 100, isResizable: true },
            { key: 'column7', name: 'Vùng', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column8', name: 'Vị trí lưu kho', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column1', name: 'Đơn vị vận chuyển', fieldName: 'name', minWidth: 100, isResizable: true },
            { key: 'column2', name: 'Vùng', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column3', name: 'Băng tải lên dừa', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column4', name: 'Vị trí lưu kho', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column5', name: 'Khối lượng', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column6', name: 'Số lượng', fieldName: 'name', minWidth: 100, isResizable: true },
            { key: 'column7', name: 'Vùng', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column8', name: 'Vị trí lưu kho', fieldName: 'name', minWidth: 100,  isResizable: true },

        ];
    }
    onSearchBox(_,text){
        return(
            this.setState(prevState=>{
                return(
                    {itemsRender: prevState.items.filter(item => item.nhanvienthumua.toLowerCase().indexOf(text.toLowerCase()) >= 0)}
                )
            }))
    }
    onChangeDropdown(_,option){
        return(
            this.setState({searchType:option.key})
        )
    }
    options = [
        { key: 'ngaynhapkho', text: 'Ngày nhập kho' },
        { key: 'nhanvienthumua', text: 'Nhân viên thu mua' },
        { key: 'nhanvienthukho', text: 'Nhân viên thủ kho' },
        { key: 'loaidua', text: 'Loại dừa' },
        { key: 'hinhthucmuaban', text: 'Vùng thu mua' },
        { key: 'malokho', text: 'Mã lô kho' },
        { key: 'donvivanchuyen', text: 'Đơn vị vận chuyển' },
        { key: 'vung', text: 'Vùng' },
        { key: 'bangtailendua', text: 'Băng tải lên dừa' },
        { key: 'vitriluukho', text: 'Vị trí lưu kho'},
        { key: 'khoiluong', text: 'Khối lượng' },
        { key: 'soluong', text: 'Số lượng' },
      ];
    render(){
        return(
            <div className='reportpage'>
                <div className='navheader'>
                    <div className="leftHeader">
                        <Label className='headerTitle'>
                           Tìm kiếm
                        </Label>
                        <SearchBox className='searchBox' placeholder="Search" onChange={this.onSearchBox}/>
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
                            placeholder='---Chọn ngày---'
                            // value={value}
                            // eslint-disable-next-line react/jsx-no-bind
                            // onSelectDate={onSelectDate}
                            
                        />
                        <Dropdown
                            className='dropdown'
                            defaultSelectedKey='ngaynhapkho'
                            // dropdownWidth={170}
                            // borderless={true}                            
                            // selectedKey={this.state._columns}
                            // eslint-disable-next-line react/jsx-no-bind
                            onChange={this.onChangeDropdown}
                            placeholder="---Chọn danh mục---"
                            options={this.options}
                            
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
                            items={this.state.itemsRender}
                            columns={this._columns}
                            setKey="set"
                            layoutMode={DetailsListLayoutMode.justified}
                            constrainMode={ConstrainMode.unconstrained}
                            onRenderDetailsHeader={onRenderDetailsHeader}
                        />
                    </ScrollablePane>
                    <Label className='textContent'>Hiển thị báo cáo chi tiết từng lô nguyên liệu</Label>
                    <ScrollablePane className='pane' scrollbarVisibility={ScrollbarVisibility.auto}>
                        <DetailsList
                            items={this.state.items2}
                            columns={this._columns2}
                            setKey="set"
                            layoutMode={DetailsListLayoutMode.justified}
                            constrainMode={ConstrainMode.unconstrained}
                            onRenderDetailsHeader={onRenderDetailsHeader}
                        />
                    </ScrollablePane>
                </div>
            </div>                    
                
        )
    }
}

export default ReportPage