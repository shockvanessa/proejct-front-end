import React from 'react';
import { Pages } from "../pages.js"

import { Tab, Button, Divider, Transition, Grid, Select } from 'semantic-ui-react'

import style from "../../css/user.module.css"
import { ProposalR } from '../request/proposalR.js';
import { MemberR } from '../request/memberR';
import { trackPromise } from 'react-promise-tracker';
import pic from "./pic.png"
import { ModalBase } from '../modal.js';

class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "login": !!localStorage.getItem("login"),
            userName: localStorage.getItem("login"),
        }
    }

    componentDidMount() {
        MemberR.user(this.state.userName).then(res => {
            let d = {}
            console.log(res)
            for (let i of res.data.data) {
                d[i.name] = i.data
            }
            this.setState(d)
        })
    }

    render() {
        let items = [
            { name: "我的個人檔案", in: <MyProfile data={ this.state.user } area={ this.state.area } />, icon: "address card" },
            { name: "我的收藏", in: <MySave login={ this.state.userName } data={ this.state.save } />, icon: "heart" },
            { name: "我的留言&投票紀錄", in: <MyRecord userName={ this.state.userName } msg={ this.state.msg } />, icon: "comment" }
        ]

        return (<Pages page={
            (<>
                <Tab menu={ { secondary: true, pointing: true, vertical: true, } } panes={ items.map(item => {
                    return ({
                        menuItem: { icon: item.icon, content: item.name },
                        render: () => <Tab.Pane attached={ false }>   { item.in }</Tab.Pane>,
                    })
                }) } />
            </>)
        } />)
    }
}
class MyProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = { areaShow: false, pswShow: false, classShow: false }

    }
    componentWillReceiveProps(newState) {
        console.log(newState)
        let area = []
        for (let a of newState.area) {
            area.push({ key: a.id, value: a.id, text: a.name })
        }
        this.setState({ user: newState.data[0], area: area })
    }
    areaShow = () =>
        this.setState((prevState) => ({ areaShow: !prevState.areaShow }))

    pswShow = (show) => this.setState({ pswShow: show })
    editPsw = () => {
        return true
    }
    editClass = () => {
      
        return {error:"abc",errorText:"ddd"}
    }

    render() {
        return (<>
            <Grid> 
                <Grid.Row columns={ "equal" }>
                <Grid.Column width={16} textAlign={"center"}>
                <div><h5>大頭貼照</h5></div>
                    <img className={ style.pic } src={ pic } alt="" />
                </Grid.Column>
                <Grid.Column >
                  
                    <div className={ style.data }>
                        <h5 className={ style.topicBold }>暱稱</h5>
                        <div>{ this.state.user && this.state.user.name }</div>
                    </div>
                    <div className={ style.data }>
                        <h5 className={ style.topicBold }>生日</h5>
                        <div>{ this.state.user && this.state.user.birthday }</div>
                    </div>
                    <div className={ style.data }>
                        <h5 className={ style.topicBold }>性別</h5>
                        <div>{ this.state.user && this.state.user.gender }</div>
                    </div>
                </Grid.Column>
                <Grid.Column>

                    <Button content={ "修改地區" } onClick={ this.areaShow } />
                    <Divider hidden />
                    <Transition visible={ this.state.areaShow } animation='scale' duration={ 500 }>
                        <div>
                            <Select options={ this.state.area } placeholder={ "請選擇你的地區" } />
                            <Button content={ "確定" } color='green' />

                        </div>

                    </Transition>
                    <p><ModalBase message={ "修改興趣" } btnText={ "修改興趣" } toDo={ this.editClass } /></p>
                    <p><ModalBase message={ "修改密碼" } btnText={ "修改密碼" } toDo={ this.editPsw } /></p>

                </Grid.Column>
            </Grid.Row></Grid>

        </>);
    }
}

class MySave extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillReceiveProps(newState) {
        this.setState({ save: newState.data })
    }
    changePage = (url) => {
        const path = `${window.location.href.split("/user")[0]}/${url}`
        window.location.href = path
    }
    render() {
        return (<>

            {
                this.state.save !== undefined ? this.state.save.map((item, index) => {
                    console.log(item)
                    return (<>
                        <div onClick={ () => { this.changePage(`PolicyContent/${item.proposal_id}`) } }>{ item.title }</div>
                    </>)
                }) : <></>
            }


        </>);
    }



}

class MyRecord extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentWillReceiveProps(newState) {
        this.setState({ msg: newState.msg })
    }
    changePage = (url) => {
        const path = `${window.location.href.split("/user")[0]}/${url}`
        window.location.href = path
    }
    render() {
        const panes = [
            { menuItem: '投票', render: () => <Tab.Pane></Tab.Pane> },
            {
                menuItem: '留言', render: () => <Tab.Pane>

                    { this.state.msg != undefined ? this.state.msg.map((item, index) => {
                        return (<>
                            <Grid> <Grid.Row columns={ "equal" }
                                onClick={ () => { this.changePage(`PolicyContent/${item.proposal_id}`) } }>
                                <Grid.Column>{ item.title } </Grid.Column>
                                <Grid.Column>{ item.content }</Grid.Column>
                            </Grid.Row></Grid>

                        </>)
                    }) : <></> }
                </Tab.Pane>
            },

        ]
        return (<>
            <Tab menu={ { secondary: true } } panes={ panes } />


        </>);
    }
}





export default User = {
    routeProps: {
        path: "/user",
        component: User
    },
    name: "個人檔案"
}