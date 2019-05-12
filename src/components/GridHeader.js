import React, { Component } from 'react'
import { Row, Col } from 'antd';
class GridHeader extends Component {

    
  render() {
      const headingStyle = {
        padding:'10px',
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        backgroundColor: "#fafafa",
        border: '1px solid grey'
      }
    return (
      <div style={headingStyle}>
         <Row gutter={12}>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">Name</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">Superpower</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">Date</div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default  GridHeader