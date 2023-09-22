// IIFE - Immediately Invoked Function Expression
// this can run automatically - it is "self-executing"
// any vars live only inside the IIFE so not wasting global memory
(function() 
{
    let LoadHeader = () => {
        /* use jQuery to fetch the contents of header.html
        use the callback structure to render these contents once js is done reading the file */
        $.get("./views/shared/header.html", (htmlData) => {
            //console.log(htmlData);
            $("header").html(htmlData);
        
            // once navbar loaded, attach event handlers to each link
            $("li>a.nav-link").each(() => {
                $("li>a").on("click", (event) => {
                    // don't fire as a normal html link
                    event.preventDefault();

                    // set the page title to the id attribute of the selected a element
                    document.title = $(event.currentTarget).prop("id");
                    LoadContent();
                })            
            })
        });
    }

    let LoadFooter = () => {
        $.get("./views/shared/footer.html", (htmlData) => {
            $("footer").html(htmlData);
        })
    }

    let LoadContent = () => {
        let activePage = document.title;
        $.get(`./views/${activePage}.html`, (htmlData) => {
            $("main").html(htmlData);

            // manually add the current page to the top of the history stack
            history.pushState({}, "", `/${document.title}`);
        });
    }

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

        LoadHeader();

        LoadFooter();

        // we need to rewrite this version to use a callback
        // let data = GetContacts();
        GetContacts((data) => {
            let list = document.getElementById('contactList');

            //console.log(data);
            // create & attach a list item for each row in the data
            data.forEach(contact => {
                let listItem = document.createElement('li');
                let emailLinks = `<a href="mailto:${contact.Email}">${contact.Name}</a>`;
                //listItem.innerText = contact.Name;
                listItem.innerHTML = emailLinks;
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