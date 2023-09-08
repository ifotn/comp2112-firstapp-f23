// IIFE - Immediately Invoked Function Expression
// this can run automatically - it is "self-executing"
// any vars live only inside the IIFE so not wasting global memory
(function() 
{
    function Start() {
        let x = 1;
        console.log('First App Started');
        console.log(x);
    }

    // attach to window onLoad event listener
    window.addEventListener('load', Start);
    console.log(x);
})();