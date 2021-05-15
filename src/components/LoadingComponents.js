// @flow
import * as React from 'react';
import {Spin} from "antd";

 const windth = window.innerWidth
 const height = window.innerHeight
export const  LoadingComponents= ()=>  {
        return (
            <div style={{width: window.innerWidth, height:  window.innerHeight,opacity:1}}>
                <Spin style={{marginLeft: (windth/3), paddingTop: (height/2) ,display:"flex", alignItems:"center"}} size="large" />
            </div>
        );

};