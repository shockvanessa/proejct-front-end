import React from 'react';
import { Pages } from "../pages.js"
import { ListGroup,Tab } from "react-bootstrap"
import { Person, Clipboard, Comment } from 'akar-icons';
import Politician from "./manage/politician"
import Check from "./manage/check"
import Article from "./manage/acrticle"
import Proposal from "./manage/proposal"
import User from "./manage/user"
import 'react-awesome-slider/dist/styles.css';
import style from "../../css/user.module.css"
import { Grid } from 'semantic-ui-react'

class Manage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [
                { key: "check", name: "審核檢舉", in: <Check /> },
                { key: "article", name: "廣告及公告管理", in: <Article /> },
                { key: "proposal", name: "提案管理", in: <Proposal /> },
                { key: "politician", name: "政治人物管理", in: <Politician /> },
                { key: "welcome", name: "使用者管理", in: <User /> }
            ]

        }
    }

    render() {
        return (<Pages page={
            (<>
                <Tab.Container id="list-group-tabs-example" defaultActiveKey="check">
                   <Grid> <Grid.Row>
                        <Grid.Column width={ 2 }>
                            <ListGroup>
                                { this.state.items.map((item, index) => {
                                    return (<>
                                        <ListGroup.Item eventKey={ item.key }>
                                        { item.name }
                                        </ListGroup.Item>
                                    </>)
                                }) }
                            </ListGroup>
                        </Grid.Column>
                        <Grid.Column >
                            <Tab.Content>
                                { this.state.items.map((item, index) => {
                                    return (<>
                                        <Tab.Pane eventKey={ item.key }>
                                            { (item.in) }
                                        </Tab.Pane>

                                    </>)
                                }) }
                            </Tab.Content>
                        </Grid.Column>
                   </Grid.Row></Grid>  
                </Tab.Container>
            </>)
        } />)
    }
}







export default Manage = {
    routeProps: {
        path: "/manage",
        component: Manage
    },
    name: "管理者"
}