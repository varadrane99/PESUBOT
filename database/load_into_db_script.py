import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('./serviceAccountKey.json')
app = firebase_admin.initialize_app(cred)
db = firebase_admin.firestore.client(app)

with open("anchors.txt") as jfile:
    s = str(jfile.read())
    print(s)
    anchors = json.loads(s)
    for anchor in anchors:
        db.collection(u'anchors').document().set(anchor)