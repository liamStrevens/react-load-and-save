import React, { Component } from 'react';
import { Row, Col } from 'antd';
import moment from 'moment'

class SingleDataRow extends Component {
    
    render(){
        const { item } = this.props
        return (<div className="gutter-example">
        <Row gutter={12}>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">{item.name.toUpperCase()}</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">{item.superpower.toUpperCase()}</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">{moment(item.end_of_an_era).format('YYYY-MM-DD hh:mm:ss')}</div>
          </Col>
        </Row>
      </div>)
          
    }
}

export default SingleDataRow;