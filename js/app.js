// IIFE - Immediately Invoked Function Expression
// this can run automatically - it is "self-executing"
// any vars live only inside the IIFE so not wasting global memory
(function() 
{
    let GetContacts = (callback) => {
        // use jQuery's GET method to read our json file
        // the data param represents the response of the file read operation
        $.getJSON('./data/contacts.json', (contactData) => {
            // once the file read is all finished, log the contents
            //console.log(contactData)
            //console.log(contactData[0]) // get the first row only
            //console.log(contactData[0].Name)  // get the name of the first row only
            
            // we can't use return - it happens too fast!
            // we'll replace with a callback instead which will wait
            //return contactData;
            callback(contactData);
        })
    }

    let Start = () => {
        let x = 1;
        console.log('First App Started');
        console.log(x);

        // we need to rewrite this version to use a callback
        // let data = GetContacts();
        GetContacts((data) => {
            let list = document.getElementById('contactList');

            //console.log(data);
            // create & attach a list item for each row in the data
            data.forEach(contact => {
                let listItem = document.createElement('li');
                listItem.innerText = contact.Name;
                list.appendChild(listItem);
            })
        })
    }

    // attach to window onLoad event listener
    window.addEventListener('load', Start);
    //console.log(x);
})();

// update counter without using Closure structure
let updateCounterWithoutClosure = () => {
    let counter = 0;
    counter++;
    document.getElementById('clickCount').innerHTML = counter;
}

// update counter with Closure to keep the current count before incrementing
let updateCounterWithClosure = (() =>{
    let counter = 0;

    return () => {
        counter++;
        document.getElementById('clickCount').innerHTML = counter;
    }
})();