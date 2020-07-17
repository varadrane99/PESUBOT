// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
var c="";
var books="";
var sem="";
var clubs="";
var arrays=[];
var teach=[];
var x={};
var y=[];
var ref=[];
var count=0;

var new1 = 0;
var new2 = new1 + 2;

var teachers="";
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Suggestion} = require('dialogflow-fulfillment');
const admin = require('firebase-admin');
const {dialogflow, Suggestions, Card, Table, Button, Image} = require('actions-on-google');
 
//process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
process.env.DEBUG = 'dialogflow:*'; // enables lib debugging statements
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const app = dialogflow({
  debug: true
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  //console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  //console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
}
 
function getAnchorName(agent) {
    const subcode = agent.parameters.subject;
	const dialogflowAgentDoc = db.collection("anchors").where("Course_Code", "==",subcode);

    return dialogflowAgentDoc.get()
      .then(function(querySnapshot) 
            {
      var count=0;
        querySnapshot.forEach(function(doc) {
          	//console.log(doc.data().Name);
          	agent.add(doc.data().Name);
          	count+=1;
        }
                              );
       if(count === 0)
             {
                  agent.add("Anchor details not present.");
             }
             
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }
  
  
function display(){
 for(new1;new1<new2;new1++){
 	agent.add(ref[new1]);
 	ref=[];}
}
  
  function getAnchorEmail(agent) {
    //const subcode = (agent.contexts)[0].parameters.subject;
    const subcode = agent.getContext('anchor-email').parameters.subject;
          	console.log(subcode);

    //const subcode = agent.parameters.subject;
    const dialogflowAgentDoc = db.collection("anchors").where("Course_Code", "==",subcode);
    
    return dialogflowAgentDoc.get()
      .then(function(querySnapshot) 
            {
            var count=0;
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
          	console.log(doc.data().Email_ID);
          	agent.add(doc.get('Email_ID'));
            count+=1;
          //console.log(doc.id, " => ", doc.data());
        });
      if(count === 0)
             {
                  agent.add("Email ID not present.");
             }
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    
  }

function pushing(i,j){
  for(i;i<j;i++)
    ref.push(i);
  	agent.add(ref[i]);
  	ref=[];
}  
  
function getrefbooks(agent) {
    const coursecode = agent.parameters.subject;
    const ref = agent.parameters.reference;
    console.log(coursecode);
	if(coursecode.includes('UE17CS20'))
  		sem="sem3";
	else if(coursecode.includes('UE17CS25') || coursecode.includes('UE17MA251'))
  		sem="sem4";
	else if((coursecode.includes('UE16CS30'))||(coursecode.includes('UE16CS31')) || (coursecode.includes('UE16CS32')))
  		sem="sem5";
	else if((coursecode.includes('UE16CS35'))||(coursecode.includes('UE16CS34'))||(coursecode.includes('UE16CS33')))
  		sem="sem6";
  	const dialogflowAgentDoc = db.collection("courses").doc("cse").collection(sem).where("Course_Code","==",String(coursecode));
  	return dialogflowAgentDoc.get()
      .then(function(querySnapshot) 
            {
        querySnapshot.forEach(function(doc) {
          	books = doc.get('reference');
          	console.log(books);
           	if(!books.includes(";")) {
              agent.add(doc.get('reference'));}
            else if (books.includes(";")) {
              arrays = books.split(";");
              for (var i = 0; i < arrays.length; i++) {
                  agent.add(arrays[i]);}
/*                books+=arrays[i];
                books+="  \n";
              }
              agent.add(books);
              */
              books="";
            }
        });
        arrays=[];
        books="";
      sem="";
    })
    .catch(function(error) {
        agent.add("error in getting the reference books"); 
        console.log("Error getting documents: ", error);
    });
}
/*  
function getrefbooks(agent) {
    const coursecode = agent.parameters.subject;
    const ref = agent.parameters.reference;
    console.log(coursecode);
    if(coursecode.includes('UE17CS20'))
        sem="sem3";
    else if(coursecode.includes('UE17CS25'))
        sem="sem4";
    else if((coursecode.includes('UE16CS30'))||(coursecode.includes('UE16CS31')) || (coursecode.includes('UE16CS32')))
        sem="sem5";
    else if((coursecode.includes('UE16CS35'))||(coursecode.includes('UE16CS34'))||(coursecode.includes('UE16CS33')))
        sem="sem6";
    const dialogflowAgentDoc = db.collection("courses").doc("cse").collection(sem).where("Course_Code","==",String(coursecode));
    return dialogflowAgentDoc.get()
      .then(function(querySnapshot) 
            {
        querySnapshot.forEach(function(doc) {
            books = doc.get('reference');
            console.log(books);
            if(!books.includes(";")) {
              agent.add(doc.get('reference'));}
            else if (books.includes(";")) {
              arrays = books.split(";");
              var len = (arrays.length)/2;
              if(arrays.length > 2)
                while(count <= len){
                  pushing(new1,new2);
                  display();
                  new1+=2;
                  new2+=2;
                  pushing(new1,new2);
                  count+=1;}
            }
        });
      sem="";
    })
    .catch(function(error) {
        agent.add("error in getting the reference books"); 
        console.log("Error getting documents: ", error);
    });
}
*/
function removeDups(names) {
  let unique = {};
  names.forEach(function(i) {
    if(!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
}  
  
function getTeacher(agent) {
  	console.log(teach);
  	teach=[];
    const coursecode = agent.parameters.subject;
      var sec = agent.parameters.section;

    console.log(coursecode);
  	var dialogflowAgentDoc = null;
    if(coursecode.includes('UE16CS33'))
      sec = "Ele-3";
    else if(coursecode.includes('UE16CS34'))
      sec = "Ele-4";
    else if(coursecode.includes('UE15CS45'))
      sec = "Ele-6";
    
  	if(sec==="")
    {
    	  dialogflowAgentDoc = db.collection("teachers").where("Course Code","==",coursecode);
    }
  	else  	
    {
		 dialogflowAgentDoc = db.collection("teachers").where("Course Code","==",coursecode).where("Section", "==", sec);
    }
      return dialogflowAgentDoc.get()
      .then(function(querySnapshot) 
            {
        querySnapshot.forEach(function(doc) {
          	teach.push((doc.get('Name of the Faculty'))); 
        });
        x = removeDups(teach);
        console.log(x);
        console.log(typeof(x));
        y = Object.values(x);
        for(var i=0; i<y.length;i++){
          c+=y[i];
      	  c+="  \n";}
        agent.add(c);
        c="";
    })
    .catch(function(error) {
        agent.add("error name of the Faculty"); 
        console.log("Error getting documents: ", error);
    });
  }
  
  function getClubType(agent) {
    const clubtype = agent.parameters.ClubType;
    console.log(clubtype);
  const dialogflowAgentDoc = db.collection("clubs").where("Type","==",clubtype);
    //const dialogflowAgentDoc = db.collection("teachers").where("Section", "==", sec);
    
      return dialogflowAgentDoc.get()
      .then(function(querySnapshot) 
            {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
           	clubs+=doc.get('Name');
          	clubs+="  \n";
          //console.log(doc.id, " => ", doc.data());
        });
        agent.add(clubs);
        clubs="";
    })
    .catch(function(error) {
        agent.add("error getting info"); 
        console.log("Error getting documents: ", error);
    });
  }
  
 function getKeyPerson(agent) {
    const desgn = agent.parameters.admin;
    console.log(desgn);
  const dialogflowAgentDoc = db.collection("key_personnel").where("Designation","==",desgn);
    //const dialogflowAgentDoc = db.collection("teachers").where("Section", "==", sec);
    
      return dialogflowAgentDoc.get()
      .then(function(querySnapshot) 
            {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            agent.add(doc.get('Name')); 
          //console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        agent.add("error getiing info"); 
        console.log("Error getting documents: ", error);
    });
  }
  
  function getDetails(agent) {
    const post = agent.parameters.admin;
    console.log(post);
	const dialogflowAgentDoc = db.collection("university").where("designation","==",post);
    
      return dialogflowAgentDoc.get()
      .then(function(querySnapshot) 
            {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
          	agent.add(doc.get('name')); 
          //console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        agent.add("error getting designation of the Faculty"); 
        console.log("Error getting documents: ", error);
    });
  }
  
  function addZ(n){
    return n<10? '0'+n:''+n;
  }
  
  const data = {
  columns: ['Calories', 'Protein'],
  items: {
    'Chicken Pasta': ['283', '20g'],
    'Beef Pot Pie': ['234', '15g'],
    'Spinach Filo Puffs': ['160', '4g']
  }
};
  const makeCard = (conv, key) => {
  // https://developers.google.com/actions/assistant/responses#table_card
  return new Table({
    dividers: true,
    title: key,
    columns: data.columns,
    rows: [
      data.items[key]
    ]
  });
};
  
  function startQuiz()
  {   
     agent.add(new Table({
  dividers: true,
  columns: ['header 1', 'header 2', 'header 3'],
  rows: [
    ['row 1 item 1', 'row 1 item 2', 'row 1 item 3'],
    ['row 2 item 1', 'row 2 item 2', 'row 2 item 3'],
  ],
}));
    //agent.ask(makeCard(agent,"tabletest"));
  }
  
  
  
   function getHoliday(agent) {
    const date = agent.parameters.date;
    console.log("date is "+date);
    var date_2 = new Date(date);
    if(date_2>new Date("2019-04-27")||date_2.getDay()===0)
    {
      agent.add("It is a holiday.");
    }
     else
    {
    var date_final = addZ(date_2.getDate())+"-"+addZ(date_2.getMonth()+1)+"-"+date_2.getFullYear();
    console.log("full date is "+date_final);
	const dialogflowAgentDoc = db.collection("calendar").where("Date","==",date_final);
      
     return dialogflowAgentDoc.get()
      .then(function(querySnapshot) 
            {
            var count=0;
        querySnapshot.forEach(function(doc) {
          console.log(doc.data().Type);
          if(doc.data().Type=="Holiday")
             {
          	agent.add("It is a holiday on account of "+doc.data().Reason);
               
            count+=1;
             }
        });
      if(count === 0)
             {
                  agent.add("It is a working day.");
             }
    })
    .catch(function(error) {
        agent.add("error getting designation of the Faculty"); 
        console.log("Error getting documents: ", error);
    });
    }
  }
 
  
  function getCourseName(agent) {
    const semno = agent.parameters.semester;
    console.log(semno);
	const dialogflowAgentDoc = db.collection('courses').doc('cse').collection(semno);
    return dialogflowAgentDoc.get()
      .then(function(querySnapshot) 
            {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
          	console.log(doc.data().Course_Title + " " + doc.data().Course_Code + " " + doc.data().Credits);
          	c += doc.data().Course_Title + "-" + doc.data().Course_Code + "  \n";
        });
      agent.add(c);
      c="";
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }
  
  function getClubDesc(agent) {
    const club = agent.parameters.clubs;
	const dialogflowAgentDoc = db.collection("clubs").where("Name", "==",club);

    return dialogflowAgentDoc.get()
      .then(function(querySnapshot) 
            {
      var count=0;
        querySnapshot.forEach(function(doc) {
          	//console.log(doc.data().Name);
          	agent.add(doc.data().Description);
          	count+=1;
        }
                              );
       if(count === 0)
             {
                  agent.add("Club details not present.");
             }
             
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }
  
  
  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('subject.anchor', getAnchorName);
  intentMap.set('quiz', startQuiz);
  intentMap.set('anchor.email', getAnchorEmail);
  intentMap.set('teacher.sectionwise',getTeacher);
  intentMap.set('university.general',getDetails);
  intentMap.set('course.info',getCourseName); 
  intentMap.set('key.person',getKeyPerson); 
  intentMap.set('calendar_of_events',getHoliday);
  intentMap.set('reference_books',getrefbooks);
  intentMap.set('Clubs',getClubType);
  intentMap.set('club_desc',getClubDesc);
  agent.handleRequest(intentMap);
});
/*
const {
dialogflow,
Permission
} = require('actions-on-google');
 
const app = dialogflow();
 
app.intent('location', (conv) => {
 
conv.data.requestedPermission = 'DEVICE_PRECISE_LOCATION';
return conv.ask(new Permission({
context: 'to locate you',
permissions: conv.data.requestedPermission,
}));
 
});
app.intent('user_info', (conv, params, permissionGranted) => {
if (permissionGranted) {
const {
requestedPermission
} = conv.data;
if (requestedPermission === 'DEVICE_PRECISE_LOCATION') {
 
const {
coordinates
} = conv.device.location;
// const city=conv.device.location.city;
 
if (coordinates) {
return conv.close(`You are at ${coordinates.latitude} and ${coordinates.longitude}`);
} else {
// Note: Currently, precise locaton only returns lat/lng coordinates on phones and lat/lng coordinates
// and a geocoded address on voice-activated speakers.
// Coarse location only works on voice-activated speakers.
return conv.close('Sorry, I could not figure out where you are.');
}
 
}
} else {
return conv.close('Sorry, permission denied.');
}
});
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

app.intent('location', (conv) => {
 
    conv.data.requestedPermission = 'DEVICE_PRECISE_LOCATION';
    return conv.ask(new Permission({
        context: 'to locate you',
        permissions: conv.data.requestedPermission,
    }));
 
});

app.intent('user_info', (conv, params, permissionGranted) => {
    if (permissionGranted) {
        const {
            requestedPermission
        } = conv.data;
        if (requestedPermission === 'DEVICE_PRECISE_LOCATION') {
 
            const {
                coordinates
            } = conv.device.location;
            // const city=conv.device.location.city;
 
            if (coordinates) {
                return conv.close(`You are at ${coordinates.latitude}`);
            } else {
                // Note: Currently, precise locaton only returns lat/lng coordinates on phones and lat/lng coordinates
                // and a geocoded address on voice-activated speakers.
                // Coarse location only works on voice-activated speakers.
                return conv.close('Sorry, I could not figure out where you are.');
            }
 
        }
    } else {
        return conv.close('Sorry, permission denied.');
    }
});*/
