import React, {Component} from 'react'

class NextPrevious extends Component{
    render(){
        return(
            <>
             <div className="pagination py-3">
                 <button className="previous btn" > prev </button>
                 <button className="Next btn">Next  </button>
             </div>
            </>
        );
    }
}

export default NextPrevious ; 