import React, {useState} from 'react'
import { Button, Space, Card, Carousel, Tag, Divider } from 'antd'
import { Qcard } from '../../components';
import { data } from '../../data';
import { useNavigate} from 'react-router-dom';

export const Quiz = () => {
  const navigate = useNavigate();
  const typeone = data.filter(item => item.isOld);
  const typetwo = data.filter(item => !item.isOld);
  console.log(typeone);
  console.log(typetwo);
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
        <Card title='Quiz' className='quiz'
          extra={
            <Space size='middle'>
              <h2> Resultado</h2>
              <Tag color={
                (score/2)>0.5?'green':
                (score/2)>0.3?'yellow':
                'red'}>{`${50*score}%`
                }</Tag> 
              <Divider type="vertical" className='Divider' />
              <Button type='primary' shape="round" onClick={() => navigate('/')} >
                Preguntas
              </Button>
              <Button type='primary' shape="round" onClick={() =>  navigate('/review/1')} >
                revision
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
