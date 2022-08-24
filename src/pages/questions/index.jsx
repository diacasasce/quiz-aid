import React from 'react';
import {data} from '../../data';
import {Card, Collapse, Tag, Space, Button} from 'antd';
import { useNavigate } from 'react-router-dom';

const { Panel } = Collapse;
export const Questions = () => {
  const navigate = useNavigate();
  return (
    <Card 
      title="Preguntas"
      bodyStyle={{
        'max-height': '90vh',
        'overflow-y': 'scroll'
      }}
      extra = {
        <Space size='middle'>
          <Button type='primary' shape="round" onClick={() => navigate('/review/1')} >
            Revision
          </Button>
          <Button type='primary' shape="round" onClick={() =>  navigate('/quiz')} >
            Quiz
          </Button>
        </Space>
      }
    >
      <Collapse>
        {data.map((item,index) => (
            <Panel header={
              <Space size='middle'>
                {`${++index} - ${item.question}`}
                <Tag key={index} color={item.isOld?'purple':'green'} > {item.type} </Tag>
              </Space>
              } key={`panel${index}`}>
              <p>{item.answer}</p>
              {item.keywords.split(',').map((keyword,index) => (
                <Tag key={index} color='cyan'> {keyword} </Tag>
              ))}
            </Panel>
        ))}
      </Collapse>
    </Card>
  )
}
