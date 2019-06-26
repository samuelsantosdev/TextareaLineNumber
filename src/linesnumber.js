import { loadConfigs, eventKey } from './utils';

let LibLinesNumber = function( ){

    return LibLinesNumber = {

        defaults : {
            "textareaPaddingLeft" : "20",
            "textareaFontSize" : "12",
            "textareaFontFamily" : "arial",            
            "linenumberBackgroundColor" : "#666",
            "linenumberColor" : "#eee"            
        },

        element : null,
        configs : null,

        lines : 1,
        currentCountLines : 0,
        nFor : 0,
        lineNumber : 1,
        container : null,

        init : function( htmlElement, customConfigs )
        {
            this.element = htmlElement;
            this.configs = customConfigs;

            this.configs = loadConfigs(this.defaults, this.configs );
            this.element.style.padding="0px"
            this.element.style.border="1px solid #eee"
            this.element.style.borderLeft = `solid ${this.configs.textareaPaddingLeft}px ${this.configs.linenumberBackgroundColor}`;
            this.element.style.fontSize = this.configs.textareaFontSize+'px';
            this.element.style.fontFamily = this.configs.textareaFontFamily;
            

            this.createLineNumberContainer();
            this.fixSizes();

            eventKey(this.element, 'keyup', this.createLinesInCounter)
            eventKey(this.element, 'scroll', this.eventScroll)

        },

        createLineNumberContainer: function()
        {
            this.container = document.createElement('div')
            this.container.style.position="absolute"
            this.container.style.top="0px"
            this.container.style.left="0px"
            this.container.style.height="100%"
            this.container.style.textAlign="center"
            this.container.style.color=this.configs.linenumberColor
            this.container.style.backgroundColor=this.configs.linenumberBackgroundColor
            this.container.style.width=this.configs.textareaPaddingLeft + "px";
            this.container.style.fontSize = this.configs.textareaFontSize+'px';
            this.container.style.fontFamily = this.configs.textareaFontFamily;
        },
        fixSizes: function()
        {
            parent = this.element.parentElement
            parent.style.position="relative"
            parent.style.overflow="hidden"
            parent.style.backgroundColor=this.configs.linenumberBackgroundColor
            parent.style.height= this.element.offsetHeight + "px";
            parent.style.width= this.element.offsetWidth + "px";

            parent.appendChild(this.container)
        },

        createLinesInCounter: function()
        {
            let txt = LibLinesNumber.element.value
            let lineNumberC = (txt.match(/\n/g) || []).length + 1
            let elementsToCreate = lineNumberC - LibLinesNumber.currentCountLines;
            
            LibLinesNumber.lineNumber = lineNumberC
            
            if(elementsToCreate > 0){
                LibLinesNumber.increaseLines()
            }else if( elementsToCreate < 0 ){
                LibLinesNumber.decreaseLines()
            }

            LibLinesNumber.currentCountLines = document.querySelectorAll("span.lines").length;
            return LibLinesNumber;
        },

        increaseLines: function()
        {
            for(let n=LibLinesNumber.currentCountLines; n<LibLinesNumber.lineNumber; n++){

                if( typeof document.getElementsByClassName(`line-${n+1}`)[n] == 'undefined' ){
                    const span = document.createElement('span')
                    span.className = `lines line-${n+1}`
                    span.innerHTML = n+1
                    
                    const br = document.createElement('br')
                    br.className = `lines line-${n+1}`

                    LibLinesNumber.container.append(span);
                    LibLinesNumber.container.append(br);
                }
            }
        },

        decreaseLines: function()
        {
            for(let n=LibLinesNumber.lineNumber+1; n <= LibLinesNumber.currentCountLines; n++){
                for(let idxc in document.getElementsByClassName("line-" + n )){
                    if( typeof document.getElementsByClassName("line-" + n )[0] != 'undefined' )
                        document.getElementsByClassName("line-" + n )[0].remove(); 
                }
            }
        },

        eventScroll : function(e)
        {
            LibLinesNumber.container.style.top="-"+LibLinesNumber.element.scrollTop+"px";            
        }
    }

}

HTMLElement.prototype.LinesNumber = function ( configs ) {
    return {
        element : this,
        lib :  new LibLinesNumber().init(this, configs)
    }
}