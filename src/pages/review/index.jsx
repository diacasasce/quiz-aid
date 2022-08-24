import React from 'react'
import { Carousel, Card, Space, Button } from 'antd'
import { Qcard } from '../../components';
import { data } from '../../data';
import {useParams, useNavigate} from 'react-router-dom';
export const Review = () => {
  const {QId} = useParams();
  const navigate = useNavigate();
  const slideChange = (from,to) => {
    navigate(`/review/${to+1}`, {replace: true});
  }
  return (
    <> 
      <Card title='Revision' className='quiz'
          extra={
            <Space size='middle'>
              <Button type='primary' shape="round" onClick={() => navigate('/')} >
                Preguntas
              </Button>
              <Button type='primary' shape="round" onClick={() =>  navigate('/quiz')} >
                Quiz
              </Button>
            </Space>
          }
          bodyStyle={{
            padding:0
          }}
        >
        <Carousel 
          className='carousel' 
          beforeChange={slideChange}
          infinite={false}
          initialSlide={QId-1}
          lazyLoad='ondemand'
          >
          {data.map((item,index) => (
            <Qcard data ={item} isQuiz={false} key ={`card${index}`} />
            ))}
        </Carousel>
      </Card>
    </>
  )
}
