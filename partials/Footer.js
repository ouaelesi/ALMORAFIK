import React , {Component} from "react"
import { Col } from "reactstrap";


class Footer extends React.Component{
    render(){
        return(
           <div>
               <div className="footer">
                 <div className="row footer_row">
                 <div className="col-12">  <img src='/assets/imgs/logo_white.png' className='footerlogo'/></div>
                 </div>
                 <div className="row footer_row">
                 <div className="col-12"><p className="footer_nav"> FOLLOW US ON MEDIA</p></div>   
                 </div>
                 <div className="row footer_row">
               
                     <div className="socialmedia ml-auto mr-auto ">
                         <div className="row  d-flex justify-content-between">
                             <div className="col-3"><img src="/assets/imgs/fb_icon.png"></img></div>
                             <div className="col-3"><img src="/assets/imgs/twitter_icon.png"></img></div>
                             <div className="col-3"><img src="/assets/imgs/insta_icon.png"></img></div>
                             <div className="col-3"><img src="/assets/imgs/gmail_icon.png"></img></div>
                         </div>
                        
                     </div>
                 
                 </div>
                 <div className="row footer_row">
                 <div className="col-12"><p className="footer_nav"> Copyright ©2020 SA9SINI Reserved.</p></div>   
                 </div>
           
             </div>
           </div>
        );
    }
}
export default Footer;  