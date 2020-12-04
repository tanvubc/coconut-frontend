import React from 'react'
import {Label,PrimaryButton, DatePicker, DayOfWeek, IDatePickerStrings,Icon, SearchBox} from '@fluentui/react';
import './reportpage.scss'
import {DetailsList, DetailsListLayoutMode, IDetailsHeaderProps, Selection, ConstrainMode, IDetailsFooterProps, DetailsRow,
} from 'office-ui-fabric-react/lib/DetailsList';
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
            items:[ 
            {key:1,name:'abc',value:2},
            {key:2,name:'abc',value:2},
            {key:3,name:'abc',value:2},
            {key:4,name:'abc',value:2},
            {key:5,name:'abc',value:2},
            {key:6,name:'abc',value:2},
            {key:7,name:'abc',value:2},
            {key:8,name:'abc',value:2},
            {key:9,name:'abc',value:2},
            {key:10,name:'abc',value:2},
            {key:11,name:'abc',value:2},
            {key:12,name:'abc',value:2},
            {key:13,name:'abc',value:2},
            {key:14,name:'abc',value:2},
            {key:15,name:'abc',value:2},
            {key:16,name:'abc',value:2},
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
        this._columns = [
            { key: 'column1', name: 'Mã lô dừa', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column2', name: 'Nhân viên thu mua', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column3', name: 'Nhân viên thủ kho', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column4', name: 'Tiêu chuẩn', fieldName: 'name', minWidth: 100, isResizable: true },
            { key: 'column5', name: 'Loại dừa', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column6', name: 'Đơn vị vận chuyển', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column7', name: 'Vùng', fieldName: 'name', minWidth: 100,  isResizable: true },
            { key: 'column8', name: 'Vị trí lưu kho', fieldName: 'name', minWidth: 100,  isResizable: true },
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
        ];
    }
    
    render(){
        return(
            <div className='reportpage'>
                <div className='navheader'>
                    <div className="leftHeader">
                        <div className='headerButtonText'>
                           Tìm kiếm
                        </div>
                        {/* <div className='searchBox'>
                            <svg className='searchIcon' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.5 0C11.0052 0 11.4922 0.0651042 11.9609 0.195312C12.4297 0.325521 12.8672 0.510417 13.2734 0.75C13.6797 0.989583 14.0495 1.27865 14.3828 1.61719C14.7214 1.95052 15.0104 2.32031 15.25 2.72656C15.4896 3.13281 15.6745 3.57031 15.8047 4.03906C15.9349 4.50781 16 4.99479 16 5.5C16 6.00521 15.9349 6.49219 15.8047 6.96094C15.6745 7.42969 15.4896 7.86719 15.25 8.27344C15.0104 8.67969 14.7214 9.05208 14.3828 9.39062C14.0495 9.72396 13.6797 10.0104 13.2734 10.25C12.8672 10.4896 12.4297 10.6745 11.9609 10.8047C11.4922 10.9349 11.0052 11 10.5 11C9.84896 11 9.22396 10.8906 8.625 10.6719C8.03125 10.4531 7.48438 10.138 6.98438 9.72656L0.851562 15.8516C0.752604 15.9505 0.635417 16 0.5 16C0.364583 16 0.247396 15.9505 0.148438 15.8516C0.0494792 15.7526 0 15.6354 0 15.5C0 15.3646 0.0494792 15.2474 0.148438 15.1484L6.27344 9.01562C5.86198 8.51562 5.54688 7.96875 5.32812 7.375C5.10938 6.77604 5 6.15104 5 5.5C5 4.99479 5.0651 4.50781 5.19531 4.03906C5.32552 3.57031 5.51042 3.13281 5.75 2.72656C5.98958 2.32031 6.27604 1.95052 6.60938 1.61719C6.94792 1.27865 7.32031 0.989583 7.72656 0.75C8.13281 0.510417 8.57031 0.325521 9.03906 0.195312C9.50781 0.0651042 9.99479 0 10.5 0ZM10.5 10C11.1198 10 11.7031 9.88281 12.25 9.64844C12.7969 9.40885 13.2734 9.08594 13.6797 8.67969C14.0859 8.27344 14.4062 7.79688 14.6406 7.25C14.8802 6.70312 15 6.11979 15 5.5C15 4.88021 14.8802 4.29688 14.6406 3.75C14.4062 3.20312 14.0859 2.72656 13.6797 2.32031C13.2734 1.91406 12.7969 1.59375 12.25 1.35938C11.7031 1.11979 11.1198 1 10.5 1C9.88021 1 9.29688 1.11979 8.75 1.35938C8.20312 1.59375 7.72656 1.91406 7.32031 2.32031C6.91406 2.72656 6.59115 3.20312 6.35156 3.75C6.11719 4.29688 6 4.88021 6 5.5C6 6.11979 6.11719 6.70312 6.35156 7.25C6.59115 7.79688 6.91406 8.27344 7.32031 8.67969C7.72656 9.08594 8.20312 9.40885 8.75 9.64844C9.29688 9.88281 9.88021 10 10.5 10Z" fill="#004578"/>
                            </svg>
                            <div className='searchText'>Search</div>
                        </div> */}
                        <SearchBox className='searchBox' placeholder="Search" borderless={true}/>
                    </div>
                    <div className='centerHeader'>
                        <DatePicker
                            className='dropdown'
                            isRequired={false}
                            borderless={true}
                            allowTextInput={true}
                            ariaLabel={desc}
                            firstDayOfWeek={firstDayOfWeek}
                            strings={DayPickerStrings}
                            placeholder='Select a date'
                            // value={value}
                            // eslint-disable-next-line react/jsx-no-bind
                            // onSelectDate={onSelectDate}
                        />
                        <DatePicker
                            className='dropdown'
                            isRequired={false}
                            borderless={true}
                            allowTextInput={true}
                            ariaLabel={desc}
                            firstDayOfWeek={firstDayOfWeek}
                            strings={DayPickerStrings}
                            placeholder='Select a date'
                            // value={value}
                            // eslint-disable-next-line react/jsx-no-bind
                            // onSelectDate={onSelectDate}
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
                    <Label className='textContent'>Hiển thị báo cáo chi tiết từng lô nguyên liệu</Label>
                    <ScrollablePane className='pane' scrollbarVisibility={ScrollbarVisibility.auto}>
                        <DetailsList
                            items={this.state.items2}
                            columns={this._columns2}
                            setKey="set"
                            layoutMode={DetailsListLayoutMode.justified}
                            constrainMode={ConstrainMode.horizontalConstrained}
                            onRenderDetailsHeader={onRenderDetailsHeader}
                        />
                    </ScrollablePane>
                </div>
            </div>                    
                
        )
    }
}

export default ReportPage