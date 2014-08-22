(function(module){

	var editor;

	init();

	function init(){
		editor = ace.edit("editor");
		editor.setTheme("ace/theme/monokai");
		editor.getSession().setMode("ace/mode/javascript");

	}
    function runCode(doc){
		//js eval
		eval("(function(module){" + editor.getValue() + " if(module){module.exports.setPosAndLED = setPosAndLED;}})(module);");
    }
    // does code conform to JS standards?
    function checkCode(doc){

    }

    // does code conform to height delta restrictions?
    function codeBreaksEdison(doc){

    }
    if(module){
        module.exports.runCode = runCode;
        module.exports.checkCode = checkCode;
        module.exports.codeBreaksEdison = codeBreaksEdison;
    }
})(module);