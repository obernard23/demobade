//DATABASE SHIT STARTS HERE
//FROM BIG BERN 
const firebaseConfig = {
    apiKey: "AIzaSyBED3d1-cLAwWrbQJsH0LJBU1A3iDQbBi0",
    authDomain: "bigbern-erp.firebaseapp.com",
    databaseURL: "https://bigbern-erp-default-rtdb.firebaseio.com",
    projectId: "bigbern-erp",
    storageBucket: "bigbern-erp.appspot.com",
    messagingSenderId: "129741589367",
    appId: "1:129741589367:web:2dfd5bf29e5936bdd1af72",
    measurementId: "G-L3T956JGTM"
};

import { getDatabase, ref, child,onValue, get,}
from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
// initialize firebase
const app = firebase.initializeApp(firebaseConfig);
initializeApp(firebaseConfig);


// form image 
var files = [];
document.getElementById("files").addEventListener("change", function(e) {
    files =  e.target.files;
    for (let i = 0; i < files.length; i++) {
    }
    //checks if files are selected
    if (files.length != 0) {
      //Loops through all the selected files
      for (let i = 0; i < files.length; i++) {
        //create a storage reference
        var storage = firebase.storage().ref(`gkStoreage/${files[i].name}`);
  
        //upload file
        var upload = storage.put(files[i])
  
        //update progress bar
        upload.on(
          "state_changed",alert('Image Selected')
          // function progress(snapshot) {
          //   var percentage =
          //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //   document.getElementById("progress").value = percentage;
          // },
        );
      }
    } else {
      alert("No file chosen");
    }
  
    upload.then(snapshot => {
         return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
     }).then(downloadURL => {
      // set image url for form
      document.getElementById('imageLoader').value = `${downloadURL}`;
      
      // display image on form
      document.getElementById('productImage').style.backgroundImage = `url(${downloadURL})`;
      
     }).catch(error => {
        // Use to signal error if something goes wrong.
        alert(`Failed to upload file and get link - ${error}`);
     });
   
  });