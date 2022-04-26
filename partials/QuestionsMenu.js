import React , {Component} from 'react'
import {Row } from 'reactstrap'

class QuestionsMenu extends Component{
  render(){
      return(
          <> 
          <div className="categories pt-3">
          <div className="form-group align-middle "> <input className="form-control search-form" placeholder="search" ></input></div>
          <Row className='pt-3' >
              <div className="col-6 font-weight-bold ask_text align-items-center" >All Questions</div>
              <div className="col-4 ml-auto " > <a href="/askQuestion"><button className="btn btn-light ask_btn">Ask Your Question</button></a>  </div>
          </Row>
         <div class="btn-group fields" role="group" aria-label="Basic example">
 <button type="button" class="btn btn-secondary">RECENT QUESTIONS</button>
 <button type="button" class="btn btn-secondary">MATH</button>
 <button type="button" class="btn btn-secondary">SCIENCE</button>
 <button type="button" class="btn btn-secondary">PHISICS</button>
 <button type="button" class="btn btn-secondary"> .... </button>
</div>
          </div>
  
          </>
      );

  }
}

export default QuestionsMenu ; 