import React from "react";
import {Button} from 'reactstrap'
import PathCard from './PathCard'
import Motivation from './MotivationSection'

class Welcome extends React.Component {
  render() {
    const tab = [
        {
            icon : "/assets/imgs/ask_ques.jpg",
            title : "Ask question" ,  
            text : "Small description that explains this step" 
        },
        {
            icon : "/assets/imgs/answer.png" ,
            title : "Answer questions" ,  
            text : "Small description that explains this step"
        },
        {
            icon: "/assets/imgs/validate.png",
            title : "Validate answer" ,  
            text : "Small description that explains this step "
        }
   
    ]
    return (
      <div className="">
        <div className="welcom row">
          <div className="col-12 col-md-6">
            <div className="welcome_title">
              WELCOME WITH US
              <div className="yellow_line"></div>
            </div>
            <p className="welcome_text">
              A learning platform to ask questions about everything related by
              studying in all materials , proposed for all the streams who have
              baccalaureate exam to find the answer from teachers , colleagues
              or baccalaurate holders .
            </p>
            <Button className="explore_btn signup">Explore more</Button>
          </div>
        </div>
        <div className="how_it_works">
          <div className="works_title">
            HOW IT WORKS
            <div className="yellow_line"></div>
            <div className="asking_path row">
              <div className="col-11 col-md-4 down">
                {" "}
                <PathCard
                  Title={tab[0].title}
                  icon={tab[0].icon}
                  Text={tab[0].text}
                ></PathCard>
              </div>
              <div className="col-11 col-md-4">
                {" "}
                <PathCard
                  Title={tab[1].title}
                  icon={tab[1].icon}
                  Text={tab[1].text}
                ></PathCard>
              </div>
              <div className="col-11 col-md-4 down">
                {" "}
                <PathCard
                  Title={tab[2].title}
                  icon={tab[2].icon}
                  Text={tab[2].text}
                ></PathCard>
              </div>
            </div>
            <div className="ask_ur_ques">
              <p>
                Questions are everywhere, answers are on HERE <br />
                So start ask your questions
              </p>
              <Button>Ask Your Question</Button>
            </div>
            <Motivation></Motivation>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome
