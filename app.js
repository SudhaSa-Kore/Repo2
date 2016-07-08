var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()
var Client = require('node-rest-client').Client;
var client = new Client();
 
 
app.set('port', (process.env.PORT || 5000))
 
// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
 
// Process application/json
app.use(bodyParser.json())
 
// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})
 
// for Facebook verification
app.post('/webhook/', function (req, res) {
   
    console.log("Req params: entry 0 " + JSON.stringify(req.body.entry[0]) )
   
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
      
        console.log("Sender Id : " + sender)
       
        if (event.postback) {
            console.log ("Payload : " + event.postback.payload)
            payload = JSON.parse(event.postback.payload);
            sendTextMessage(payload.id, "Someone is following you ","T")
           
        }
        if (event.message && event.message.text) {
            text = event.message.text
            url = "https://dry-falls-30126.herokuapp.com/getPremiumDate"
            client.get(url, function (data, response) {
               
               console.log(data);
                   text= {
       "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
          {
            "title":"Policies with Premium Due Dates",
            "image_url":"https://3.bp.blogspot.com/-CSVO5tqjKPk/Vx-AFGW47MI/AAAAAAAAALo/XTvdYqh76Es205Glo7kYUO9iwucMNOnxwCLcB/s640/income%2Btax%2Brules%2Bfor%2Binsurance%2Bpolicies.png",
            "subtitle":data.policies[i].policyName,
            "buttons":[
              {               
                "type":"postback",
                "title":data.policies[0].policyName,
                "payload":"{\"id\":\"10153635012668441\"}"
              },       
              {
                        
                "type":"postback",
                "title":data.policies[0].policyType,
                "payload":"{\"id\":\"10153807636891219\"}"
              },
              {
                 "type":"postback",
                "title":data.policies[0].policyNumber,
                "payload":"{\"id\":\"1081292718609707\"}"
              }             
            ]
          }
                
            ]
          }
      }
            sendTextMessage(sender, text,type)
        });
    }
    res.sendStatus(200)
    }
})
 
var token = "EAARc6kfSVyoBAMQm1Asgtk86CL2XBAImEaVIPVhCP9ZCMJSYfqdmrJALWGqe4GreJxA3hLBxAgsENfGtdZCXgv1ZCSDYXTDqQeDZCCjDs3yZA5z6VT2srZBbbuJEWHkEAkEiTlyZCU31oqQZAEdFqkic3C4ZCCtTXQDLqFWFk2Vy98OwKn52Ccuvh"
 
function sendTextMessage(sender, text,type) {
   
    if (type=="A")
    {
        messageData =
        {
            "attachment":text
      
         }
    }
    else
    {
      messageData =
        {
            text:text
        }  
    }
 
 
   
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}
 
 
// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})