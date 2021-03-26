import React from 'react';
import { Row, Col, Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Cross } from 'akar-icons';

import style from "./search.module.css"
export default class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            count: 0
        }

    }
    componentDidMount() {
        let d = document.getElementsByClassName(style.box)
        for (let i of d) {
            console.log(i)
            console.log(i.scrollHeight)
        }
        this.setState({ like: this.props.like })
    }

    remove = (c, v) => {
        let d = this.state.like
        d[c][v] = false
        this.setState({ like: d, count: this.state.count - 1 })
    }

    newOn = (e) => {
        const key = e.target
        let ccc = this.state.like
        let count = this.state.count
        let temp = ccc[key.name][key.value]
        ccc[key.name][key.value] = !temp
        console.log(temp)
        if (temp) { count -= 2 }
        this.setState({ like: ccc, count: count + 1 })
    }
    removeAll = () => {
        let d = this.state.like
        for (const [key, value] of Object.entries(d)) {
            console.log(value)
            for (const [k, v] of Object.entries(value)) {
                if (d[key][k]) { d[key][k] = false }
            }
        }
        this.setState({ like: d, count: 0 })
    }
    more = (c) => {
        let a = document.getElementById(c)
        console.log(a.scrollHeight)
        console.log(a.offsetHeight)
        console.log(a.clientHeight)
        if (a.offsetHeight < 40){
            a.classList.remove(style.box)
        }
        else{
            a.classList.add(style.box)
        }
            
    }

    render() {
        return (<>

            <Row className={ style.border }>
                <Col sm={ "auto" }>關鍵字搜尋</Col>
                <Col ><input type="text" className={ style.input } /></Col>
            </Row>
            {this.state.count > 0 ? <div>
                <Row className="align-items-center">
                    <Col sm={ 2 }>篩選條件</Col>
                    { this.state.like && Object.keys(this.state.like).map((placement, index) => {
                        return (<>{ Object.keys(this.state.like[placement]).map(item => {
                            if (this.state.like[placement][item]) {
                                return (<Col sm={ "auto" }>
                                    <Button variant="outline-primary"
                                        onClick={ () => { this.remove(placement, item) } } className={ style.button }>{ item }
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" id="Cross"><path d="M20 20L4 4m16 0L4 20" /></svg>
                                    </Button>
                                </Col>)
                            }

                        }) }</>)
                    }) }
                    <Col><Button variant="outline-secondary" onClick={ this.removeAll } className={ style.button }>清除全部</Button></Col>
                </Row>
            </div> : <></> }

            <Row >
                <Col>
                    { this.state.like && Object.keys(this.state.like).map((placement, index) => {
                        return (<><Row className={ style.border }>
                            <Col sm={ "auto" }>{ placement }</Col>
                            <Col><Row className={ style.box } id={ placement }>

                                { Object.keys(this.state.like[placement]).map((item) => {
                                    return (<><Col sm={ "auto" }>
                                        <input type="checkbox" name={ placement } value={ item }
                                            className={ style.checkbox }
                                            onChange={ this.newOn } checked={ this.state.like[placement][item] }
                                            id={ `${placement}-${item}` } />
                                        <label for={ `${placement}-${item}` } className={ style.label }>{ item }</label>
                                    </Col></>)
                                }) }</Row></Col>
                            <Col sm={ "auto" }><Button variant="outline-secondary" onClick={ () => { this.more(placement) } }>更多</Button></Col>
                        </Row></>)
                    }) }

                </Col>
            </Row>
        </>)
    }
}