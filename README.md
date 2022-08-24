# Quiz Aid
this is a simple Qcard app for prepearing a test of a the cuestion set divided into two types, the questions should go on the Data.js file folowing this structure
```
{
  question: question prompt,
  answer: desired answer,
  keywords: [ keyword Array],
  type: 'type name',
  isOld: true, //Boolean value for type 
}
```
the app has 3 routes
- ### the base route "/" 
    contains the full question Set 
- ### the review route "/review/:questionId" 
- ### the review route "/quiz" 
    contains a simple quiz functionality that select one random question per type and set up a score depending on the answer

