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
            users:[],
            buyeruserID:undefined,
            importuserID:undefined,
            CoconutType:undefined,
            WarehouseLocation:undefined,
            Standard:undefined,
            ConveyorID:undefined,
            Region:undefined,
            Transporter:undefined

        }
        
        this.onUpdate = this.onUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onUpdate(){
        axios.get('http://localhost:9000/api/data/GetOperationUsers','',{
            headers: {
            'Content-Type':'application/json',
            "Access-Control-Allow-Origin": "*"
            }
        }).then((Response)=>{
            console.log(Response.data)
            this.setState({users:Response.data.map((value)=>{
                return {key:value.ID,text: value.Name}
                    }
                )}
            )
        })
    }
    componentDidMount(){
        this.onUpdate()
    }
    handleSubmit(e){
        
        axios.post('http://localhost:9000/api/data/NewImportSession',JSON.stringify({
            BuyerUserID:this.state.buyeruserID,
            WarehouseUserID:this.state.importuserID,
            CoconutType:this.state.CoconutType,
            WarehouseLocation:this.state.WarehouseLocation,
            Standard:this.state.Standard,
            ConveyorID:this.state.ConveyorID,
            Region:this.state.Region,
            Transporter:this.state.Transporter
            }),{
            headers: {
            'Content-Type':'application/json',
            "Access-Control-Allow-Origin": "*"
            }
        }).then((Response)=>{
           if(!Response.data.Result)
           {
                
           }
           else{
               //this.props.onclose()
           }
        })
    }
    render() { 
        return (
                <Modal isOpen={true} style={{overflowY:'hidden'}}>
                <div className='importdatabox' >
                    <h3 >Nhập kho mới</h3>
                    <div style={{display:'flex',flexDirection:'column'}} >
                    <TextField   onChange={(e,v)=>{this.setState({ImportCode:v})}} className='inputbox' label='Mã lô dừa'  name='username'></TextField>
                    <ComboBox   className='inputbox' name='buyer' label='Nhân viên thu mua' options={this.state.users} selectedKey={this.state.buyeruserID}  
                     onChange={(e,o)=>{this.setState({buyeruserID:o.key})}}  useComboBoxAsMenuWidth  ></ComboBox>
                    <ComboBox   className='inputbox' name='importer' label='Nhân viên thủ kho' options={this.state.users} selectedKey={this.state.importuserID}
                     onChange={(e,o)=>{this.setState({importuserID:o.key})}} useComboBoxAsMenuWidth  ></ComboBox>
                    <TextField   onChange={(e,v)=>{this.setState({Standard:v})}} className='inputbox' label='Tiêu chuẩn' name='standard'></TextField>
                    <TextField  onChange={(e,v)=>{this.setState({CoconutType:v})}} className='inputbox' label='Loại dừa'></TextField>
                    <TextField   onChange={(e,v)=>{this.setState({Transporter:v})}} className='inputbox' label='Đơn vị vận chuyển'></TextField>
                    <TextField   onChange={(e,v)=>{this.setState({Region:v})}} className='inputbox' label='Vùng'></TextField>
                    <TextField  onChange={(e,v)=>{this.setState({WarehouseLocation:v})}} className='inputbox' label='Vị trí lưu kho'></TextField>
                    <TextField  onChange={(e,v)=>{this.setState({ConveyorID:v})}} className='inputbox' label='Băng tải lên dừa'></TextField>
                    <div style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
                    <PrimaryButton style={{margin:'4px'}} onClick={this.handleSubmit}>OK</PrimaryButton>
                    <PrimaryButton style={{margin:'4px'}} onClick={(e)=>  {e.preventDefault(); this.props.onClose(e)}} >Cancel</PrimaryButton>
                    </div>
                    </div>
                </div> 
            </Modal> 
    
            
            
            );
    }
}
 
export default NewImportSession;