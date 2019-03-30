import React from 'react'
// import ReactDOM from 'react-dom';
import './index.css'
// import Table from '../Table';

// function GoBack() {
//   Details = null;
//   // ReactDOM.render(<></>, document.getElementsByClassName("Main")[0])
//   // ReactDOM.render(<div><Table /></div>, document.getElementById("root"))

// }

let Details;
export default function User(props) {
  Details = props.data;
  if (Details === Object) {
    return <div></div>
  }
  // if(Details)
  return <div className="Main">
    {/* <div>
      <button style={{ fontSize: "20px", color: "lightgreen" }} onClick={GoBack}>{"X"}</button>
    </div> */}
    <h2>
      {Details.first_name + " " + Details.last_name}
    </h2>
    <hr style={{ color: "teal", borderWidth: "20px" }} />
    <div style={{ padding: "10px" }}>
      <div className="MainContainer">
        <div className="MaxWidth">Company</div>
        <div className="MaxWidth1">{Details.company_name}</div>
      </div>
      <div className="MainContainer">
        <div className="MaxWidth">City</div>
        <div className="MaxWidth1">{Details.city}</div>
      </div>
      <div className="MainContainer">
        <div className="MaxWidth">State</div>
        <div className="MaxWidth1">{Details.state}</div>
      </div>
      <div className="MainContainer">
        <div className="MaxWidth">ZIP</div>
        <div className="MaxWidth1">{Details.zip}</div>
      </div>
      <div className="MainContainer">
        <div className="MaxWidth">Email</div>
        <div className="MaxWidth1">{Details.email}</div>
      </div>
      <div className="MainContainer">
        <div className="MaxWidth">Web</div>
        <div className="MaxWidth1">{Details.web}</div>
      </div>
      <div className="MainContainer">
        <div className="MaxWidth">Age</div>
        <div className="MaxWidth1">{Details.age}</div>
      </div>
    </div>
  </div>

}