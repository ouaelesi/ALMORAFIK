import React , {Component} from 'react' ; 
import WhoAreWe from "../../partials/WhoAreWe"
import SocialMediaPath from '../../partials/SocialMediaPath'

class About extends Component {
    render() {
        return (
            <div>
                 <WhoAreWe/>
             <SocialMediaPath/>
            </div>
        );
    }
}

export default About;