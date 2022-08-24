import React, {useState} from 'react'
import { Card , Button, Tag, Collapse, Space, Input, Grid, Badge } from 'antd'
import { CheckSquareOutlined, CloseSquareOutlined} from '@ant-design/icons'; 

export const Qcard = (props) => {
  const { data, isQuiz, addScore } = props;
  const {question, answer, keywords,type, isOld} = data;
  const splitKeywords = keywords.split(',');
  console.log(splitKeywords);
  const {Panel} = Collapse;
  const { TextArea } = Input;
  const [revealedKeywords, setRevealedKeywords] = useState([]);
  const [revealedIndex, setRevealedIndex] = useState(0);
  const [answered, setAnswered] = useState(false)
  const [result, setResult] = useState(0)
  const revealKeyword = () => {
    setRevealedKeywords([...revealedKeywords, splitKeywords[revealedIndex]]);
    setRevealedIndex(revealedIndex + 1);
  }
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const calculateScore = (isCorrect) => {
    setAnswered(true);
    setResult(isCorrect ? 1 : -1);
    if (isCorrect) {
      return 1 * parseFloat(1 - parseFloat(parseFloat( revealedKeywords.length / splitKeywords.length )*0.5));
    } 
    return 0;
  };
  return (
    <div className='Qcard' style={screens.md?{padding:'10vh'}:{padding:'3vh 2vh'}}>
      <Badge.Ribbon text={type} color={isOld?'purple':'cyan'} >
        <Card 
          title={question} 
          bordered={false} 
          className='Qcard_card' 
          style={screens.md?{padding:'10vh'}:{padding:'2vh'}}
        >
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <TextArea rows={4} />
            <Space wrap>
            <Button type="primary" shape="round" onClick={revealKeyword} disabled={splitKeywords.length === revealedKeywords.length}>
                Pista
            </Button>
              {
                revealedKeywords.map((keyword, index) => (
                  <Tag key={index} color='blue'>{keyword}</Tag>
                ))
              }
            </Space>
            
            <Collapse >
              <Panel showArrow={false} header="respuesta" className='answer' key="1" >
                <p>{answer}</p>
              </Panel>
            </Collapse>
            {isQuiz && (
              <div className='centerDiv'>
                <Space size={50}>
                  <Button 
                    type="primary" size='large' shape="circle" className={`correctButton ${result >0 ? 'correctAnwsered' : ''}`} icon={ <CheckSquareOutlined /> } 
                    onClick={() => {
                      addScore(calculateScore(true));
                    }}
                    disabled={answered}
                  />
                  <Button 
                    type="primary" size='large' shape="circle" danger icon={ <CloseSquareOutlined /> } 
                    onClick={() => {
                      addScore(calculateScore(false));
                    }}
                    className={result <0 ? 'incorrectAnwsered' : ''}
                    disabled={answered}
                  />
                </Space>
              </div>
            )}
          </Space>
        </Card>
      </Badge.Ribbon>
    </div>
  )
}
