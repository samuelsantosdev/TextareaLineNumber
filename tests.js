const testing = require('testing');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const fs = require('fs');
const path = require('path');


        
function testCreate( callback ){
    
    try{

        const js = fs.readFileSync(path.resolve(__dirname, './public/linesnumber.min.js'), 'utf8');
        const dom = new JSDOM("<!DOCTYPE html><head></head><html><body><div><textarea id='test'></textarea></div><script>\
        "+js+"\
        document.getElementById('test').LinesNumber();\
        </script>\
        </body></html>");
        
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