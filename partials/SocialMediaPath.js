import React, { Component } from 'react';
import PathCard from './PathCard';

class SocialMediaPath extends Component {
    render() {
        const tab = [
            {
                icon : "/assets/imgs/fb_card.png",
                title : "Facebook" ,  
                text : "Small description that explains this step" 
            },
            {
                icon : "/assets/imgs/insta_card.png" ,
                title : "Instagram" ,  
                text : "Small description that explains this step"
            },
            {
                icon: "/assets/imgs/twitter_card.png",
                title : "Twitter" ,  
                text : "Small description that explains this step "
            }
        ];
        return (
            <div>
                <div className="works_title">OUR ONLINE PAGES
            <div className="yellow_line">
            </div>
            </div>
            <div className="asking_path row">
                 
            <div className="col-4 down"> <PathCard Title = {tab[0].title} icon = {tab[0].icon} Text = {tab[0].text}></PathCard></div>
            <div className="col-4"> <PathCard Title = {tab[1].title} icon = {tab[1].icon} Text = {tab[1].text}></PathCard></div>
            <div className="col-4 down"> <PathCard Title = {tab[2].title} icon = {tab[2].icon} Text = {tab[2].text}></PathCard>
            </div>
           
            </div>
            </div>
        );
    }
}

export default SocialMediaPath;