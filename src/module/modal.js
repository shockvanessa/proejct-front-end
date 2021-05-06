import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"



export class ModalBase extends React.Component {
    render() {
        return (<>
            <Modal show={ this.props.show } size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered backdrop="static" className="smallModal">
                <Modal.Body className="show-grid body">
                    <Row className="justify-content-end">
                        <Col className="modalClose">
                            <Button variant="light" className="close" aria-label="Close" onClick={ this.props.close }><span
                                aria-hidden="true">&times;</span></Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <center className="modalLabel">{ this.props.message }</center>
                            <div className="modalContainer">{ this.props.content }</div>
                            <p id={ `${this.props.error}ErrorInfo` } className="errorInfo" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <center><p><Button variant="success" onClick={ this.props.ok }>確認</Button></p></center>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>)
    }
}

export class TaskModal extends React.Component {
    render() {
        return (<>
            <Modal show={ this.props.show } size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered backdrop="static" className="smallModal">
                <Modal.Body className="show-grid body">
                    <Row className="justify-content-end">
                        <Col className="modalClose">
                            <div className="close" aria-label="Close" onClick={ this.props.close }><span
                                aria-hidden="true">&times;</span></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <center className="modalLabel">{ this.props.message }</center>
                            <Row>
                                { this.props.tag.map(placement => {
                                    return (<Col sm={ "auto" }>
                                        #{placement }
                                    </Col>)

                                }) }
                            </Row>
                            <div className="modalContainer">{ this.props.content }</div>
                            <p id={ `${this.props.error}ErrorInfo` } className="errorInfo" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <center><p><Button variant="secondary" onClick={ this.props.ok }>關閉視窗</Button></p></center>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>)
    }
}

export class ReportModal extends React.Component {
    render() {
        return (<>
            <ModalBase
                show={ this.props.show } message="檢舉"
                ok={ this.props.ok }
                close={ this.props.close }
                content={ (<>
                
                    {this.props.rule && this.props.rule.map((item, index) => {
                        return (<div><input type="checkbox" name="report" id="" value={item.id}/>{ item.context }</div>)
                    }) }
                    <p>備註：</p>
                    <input type="text" />
                </>) } />
        </>)
    }
}


export class ProposalEditModal extends React.Component {
    render() {
        return (<>
            <ModalBase
                show={ this.props.show } message="提案編輯"
                ok={ this.props.ok }
                close={ this.props.close }
                content={ (<>
                
                   
                   各種輸入框
                </>) } />
        </>)
    }
}

