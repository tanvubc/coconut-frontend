import React, { Component } from 'react';
import './newimportsession.scss';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton, PrimaryButton, Stack, IStackTokens,Modal } from 'office-ui-fabric-react';
import { Link, Text } from 'office-ui-fabric-react';
import {
    ComboBox,
    IComboBox,
    IComboBoxOption,
    SelectableOptionMenuItemType,
  } from 'office-ui-fabric-react/lib/index';
import axios from 'axios'
class NewImportSession extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            users:[]
        }
    }
    componentDidMount(){
        this.onUpdate()
    }
    onUpdate(){
        axios.get('http://localhost:9000/api/data/GetOperationUsers','',{
            headers: {
            'Content-Type':'application/json',
            "Access-Control-Allow-Origin": "*"
            }
        }).then((Response)=>{
            this.setState({users:Response.data.map((value)=>{
                return value.Name
            }).concat(
            <div>
                
            </div>)})
        })
    }
    render() { 
        return ( 
            <div className='importdatabox'>
                <h3>Nhập kho mới</h3>
                <form style={{display:'flex',flexDirection:'column'}} onSubmit={this.handleSubmit}>
                <TextField   className='inputbox' label='Mã lô dừa'  name='username'></TextField>
                <ComboBox   className='inputbox' label='Nhân viên thu mua' options={this.state.users} ></ComboBox>
                <ComboBox   className='inputbox' label='Nhân viên thủ kho' ></ComboBox>
                <TextField  className='inputbox' label='Tiêu chuẩn'></TextField>
                <TextField className='inputbox' label='Loại dừa'></TextField>
                <TextField  className='inputbox' label='Đơn vị vận chuyển'></TextField>
                <TextField  className='inputbox' label='Vùng'></TextField>
                <TextField  className='inputbox' label='Vị trí lưu kho'></TextField>
                <div style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
                <PrimaryButton style={{margin:'4px'}} type="submit" >OK</PrimaryButton>
                <PrimaryButton style={{margin:'4px'}} type="submit" onClick={(e)=>  {e.preventDefault(); this.props.onclose()}} >Cancel</PrimaryButton>
                </div>

                </form>
            </div> 
            );
    }
}
 
export default NewImportSession;