import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import User from '../User'
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: 'block',
            items: [],
            Page: 1,
            item: Object
        };
    }

    componentDidMount() {
        fetch("http://demo9197058.mockable.io/users")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        items: result,
                        Page: 1,
                        item: this.state.item
                    });
                    console.log(this.state.items)
                    this.showBottomNav(1)
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    showBottomNav(Val) {
        //Re-render the Table
        this.setState({
            Page: Val,
            items: this.state.items,
            item: this.state.item
        });
        ReactDOM.render(this.BottomNav([(this.state.items.length / 5), Val]), document.getElementById("BottomNavRender"))
    }
    BottomNav(props) {
        var Tracking = 1;
        let Val = props[1];

        let Length = props[0];
        if (Val < 1) {
            Val = 0;
        }
        else if (Val > Length) {
            Val = Length - 1;
        }
        // console.log(props.length);

        //Previous Button
        let PreviousButton = React.createElement("div", { className: "myClass", onClick: () => this.showBottomNav(Tracking - 1) }, "<");
        //In Between
        let item = [];
        let i = 0;
        if (Val === 1 || Val === 2 || Val === 3 || Val === 4) {
            let Max = Length >= 5 ? 5 : Length;
            for (let j = 1; j <= Max; j++) {
                if (Val === j) {
                    item[i] = React.createElement("div", { className: "myClass", onClick: () => this.showBottomNav(j), style: { color: "blue" } }, j);
                    Tracking = j;

                } else {
                    item[i] = React.createElement("div", { className: "myClass", onClick: () => this.showBottomNav(j) }, j);
                }
                i++;

            }
            item[i] = React.createElement("div", { className: "myClass" }, "...");
            i++;
            item[i] = React.createElement("div", { className: "myClass", onClick: () => this.showBottomNav(Length) }, Length);
            i++;
        } else if (Val < Length - 3) {
            item[i] = React.createElement("div", { className: "myClass", onClick: () => this.showBottomNav(1) }, 1);
            i++;
            item[i] = React.createElement("div", { className: "myClass" }, "...");
            i++;
            for (let j = Val - 3; j < Val + 3; j++) {
                if (Val === j) {
                    item[i] = React.createElement("div", { className: "myClass", onClick: () => this.showBottomNav(j), style: { color: "blue" } }, j);
                    Tracking = j;

                } else {
                    item[i] = React.createElement("div", { className: "myClass", onClick: () => this.showBottomNav(j) }, j);
                }
                i++;
            }
            item[i] = React.createElement("div", { className: "myClass" }, "...");
            i++;
            item[i] = React.createElement("div", { className: "myClass", onClick: () => this.showBottomNav(Length) }, Length);
            i++;
        } else {
            item[i] = React.createElement("div", { className: "myClass", onClick: () => this.showBottomNav(1) }, 1);
            i++;
            item[i] = React.createElement("div", { className: "myClass" }, "...");
            i++;
            for (let j = Val - 7; j <= Length; j++) {
                if (Val === j) {
                    item[i] = React.createElement("div", { className: "myClass", onClick: () => this.showBottomNav(j), style: { color: "blue" } }, j);
                    Tracking = j;

                } else {
                    item[i] = React.createElement("div", { className: "myClass", onClick: () => this.showBottomNav(j) }, j);
                }
                i++;
            }
        }
        //Next Button
        let NextButton = React.createElement("div", { className: "myClass", onClick: () => this.showBottomNav(Tracking + 1) }, ">");
        return <div style={{ display: "flex" }}>{PreviousButton}{item}{NextButton}</div>;
    }
    sorter(TF, param) {
        if (TF === true) {
            this.setState({
                Page: this.state.Page,
                items: param,
                item: this.state.item
            });
        }
        else {
            this.setState({
                Page: this.state.Page,
                items: this.state.items,
                item: param
            });
            // console.log(param)
            // console.log(this.state.item)
            // ReactDOM.render(<User data={param}/>, document.getElementById('User'))
        }
    }

    render() {
        return <div>
            <ShowTable data={[this.state.Page, this.state.items]} action={(TF, e) => this.sorter(TF, e)} />


            <div id="BottomNavRender">

            </div>

            {/* <div id="User">Test</div> */}
            <User data={this.state.item} />

        </div>
    }

}
let Min_Max = true;
function ShowTable(props) {
    let [Page, items] = props.data;
    let TR = [];
    // let i = Page*5;
    let j = 0;
    if (items[0] === undefined) {
        return <p>Loading</p>
    }
    for (let i = ((Page - 1) * 5); i < (Page * 5); i++) {
        TR[j] = React.createElement("tr", {
            onClick: () =>
                props.action(false, items[i])

        }, getTR(items[i]));
        j++;
    }
    let TD = [];
    let i = 0;
    Properties.forEach(e => {
        // TD[i] = <td><b>{e}</b></td>;
        TD[i] = React.createElement("td", {
            onClick: (elt) => props.action(
                Min_Max ? (true,
                    RenderTableLowToHigh(Properties.indexOf(
                        elt.target.innerHTML),
                        items)) :
                    (true,
                        RenderTableHighToLow(Properties.indexOf(
                            elt.target.innerHTML),
                            items))
            )
        }, <b>{e}</b>)
        i++;
    });
    return <table><thead><tr>{TD}</tr></thead><tbody>{TR}</tbody></table>;
}
function RenderTableLowToHigh(Col, items) {
    if (Col === 5 || Col === 8) {
        items.sort(function (a, b) {
            return a[Properties[Col]] - b[Properties[Col]]
        });
    }
    else {
        items.sort(function (a, b) {
            return a[Properties[Col]].localeCompare(b[Properties[Col]])
        });
    }
    Min_Max = !Min_Max;
    return items;
}
function RenderTableHighToLow(Col, items) {
    if (Col === 5 || Col === 8) {
        items.sort(function (b, a) {
            return a[Properties[Col]] - b[Properties[Col]]
        });
    }
    else {
        items.sort(function (b, a) {
            return a[Properties[Col]].localeCompare(b[Properties[Col]])
        });
    }
    Min_Max = !Min_Max;
    return items;
}
function getTR(props) {
    let TD = [];
    let i = 0;
    if (props === undefined) {
        return TD;
    }
    Properties.forEach(e => {
        TD[i] = <td>{props[e]}</td>;
        i++;
    });
    return TD;
}
let Properties = [
    "first_name",
    "last_name",
    "company_name",
    "city",
    "state",
    "zip",
    "email",
    "web",
    "age"
];

export default Table
