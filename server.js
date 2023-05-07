const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

MongoClient.connect('mongodb+srv://johnjevora94:tKDOt2UruFoWgWUg@cluster1.dfvncsn.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('palindrome-checker')
    const palindromesCollection = db.collection('palindromes')

    app.set('view engine', 'ejs')

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(bodyParser.json())

app.get('/api', (req, res) => {

    if(req.query.input){
      let string = req.query.input.trim()
      let reverseStr = string.replace(' ','').toLowerCase()
      let newStr = reverseStr.split('').reverse().join('')
      let isTrue = null

      if (reverseStr === newStr){
        isTrue = true

      }
      else{
        false
      }

      const objToJson = {
        isPali: isTrue,
        originalWord: 'newStr',
        reverseWord: 'reverseStr'

      }
      res.send(objToJson);
    }
  })
  
  app.get('/', (req, res) => {
    db.collection('palindromes')
      .find()
      .toArray()
      .then(results => {
        res.render('index.ejs', { palindromes: results })
      })
      .catch(error => console.error(error))
  })

  app.get('/palindromes', (req, res) => {
    db.collection('palindromes')
      .find()
      .toArray()
      .then(results => {
        res.render('palindromes.ejs', { palindromes: results })
      })
      .catch(error => console.error(error))
  })

  app.post('/palindromes', (req, res) => {
    palindromesCollection
      .insertOne(req.body)
      .then(result => {
        setTimeout(() => { res.redirect('/palindromes') }, 1500);
        
      })
      .catch(error => console.error(error))
  })

  app.delete('/palindromes', (req, res) => {
    const palindromeToDelete = req.body.palindrome;
    console.log('Deleting palindrome:', palindromeToDelete);
    db.collection('palindromes').findOneAndDelete({palindrome: palindromeToDelete}, (err, result) => {
      if (err) {
        console.log('Error deleting palindrome:', err);
        return res.send(500, err);
      }
      res.send('Deleted!');
    });
    console.log('Palindrome Deleted:', result);
  });
  
  app.listen(7610, ()=>console.log("App Is Running on Port 7610"))
})