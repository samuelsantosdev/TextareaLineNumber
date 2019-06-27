const testing = require('testing');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const fs = require('fs');
const path = require('path');


function testCreate( callback ){
    
    try{

        const html = fs.readFileSync(path.resolve(__dirname, './public/index.html'), 'utf8');
        const dom = new JSDOM(html);
        return testing.success(callback);

    }
    catch(ex){
         console.log(ex)
    }
    testing.failure("Lib error", callback);
}

testing.run([
        testCreate
    ], function(e){

        console.log(e)
        return true

});