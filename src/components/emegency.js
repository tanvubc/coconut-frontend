import React, { Component } from 'react';
import './emegency.scss';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton, PrimaryButton, Stack, IStackTokens,Modal,IconButton } from 'office-ui-fabric-react';
import { Link, Text } from 'office-ui-fabric-react';
import {
    ComboBox,
    IComboBox,
    IComboBoxOption,
    SelectableOptionMenuItemType,
  } from 'office-ui-fabric-react/lib/index';
import axios from 'axios'
class Emegency extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         }
    }
    
    render() { 
        return ( 
        <Modal isOpen={true} >
            <div className='conveyorBox'  >
                <h2 style={{color:'red'}}>Dừng khẩn cấp</h2>
                <div style={{marginTop:'10px',marginLeft:'5px'}}>
                    
                Nhấn reset để chạy lại
                </div>
                
                
                     
                    
             
                <div style={{ display:'flex',justifyContent:'center',marginBottom:'0px',marginTop:'20px',position:'absolute'}}>
                    
                   
                </div>
               
            </div> 
        </Modal> );
    }
}
 
export default Emegency;