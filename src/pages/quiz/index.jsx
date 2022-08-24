import React, {useState} from 'react'
import { Button, Space, Card, Carousel, Tag, Grid } from 'antd'
import { Qcard } from '../../components';
import { data } from '../../data';
import { useNavigate} from 'react-router-dom';

export const Quiz = () => {
  const navigate = useNavigate();
  const typeone = data.filter(item => item.isOld);
  const typetwo = data.filter(item => !item.isOld);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  
  const getRandomIndexes = (max, num) => {
    const indexes = [];
    while (indexes.length < num) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);

      }
    }
    return indexes;
  }
  const typeoneIndexes = getRandomIndexes(typeone.length, 1);
  const typetwoIndexes = getRandomIndexes(typetwo.length, 1);
  const typeoneQuestions = typeoneIndexes.map(index => typeone[index]);
  const typetwoQuestions = typetwoIndexes.map(index => typetwo[index]);
  const questions = [...typeoneQuestions, ...typetwoQuestions];
  const [score, setScore] = useState(0);

  const addScore = (points) => {
    setScore(score + points);
  }
  return (
    <>
        <Card title={
          <Space size='middle'>
              <h4> Resultado</h4>
              <Tag color={
                (score/2)>0.5?'green':
                (score/2)>0.3?'yellow':
                'red'}>{`${50*score}%`
                }</Tag> 
          </Space>
        } className='quiz'
          extra={
            <Space size='middle'>
              <Button type='primary' shape="round" onClick={() => navigate('/')} >
                {screens.md?'Preguntas':'Pre'}
              </Button>
              <Button type='primary' shape="round" onClick={() =>  navigate('/review/1')} >
                {screens.md?'Revision':'Rev'}
              </Button>
              
            </Space> 
          }
          bodyStyle={{
            padding:0
          }}
        >
        <Carousel 
          className='carousel'
          infinite={false}
          lazyLoad='ondemand'
          dotPosition='top'
          >
          {questions.map((item,index) => (
            <Qcard data ={item} isQuiz={true} key ={`card${index}`} addScore={addScore} />
          ))}
        </Carousel>
        </Card>
    </>
  )
}
