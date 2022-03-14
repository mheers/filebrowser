ace.define("ace/snippets/demo",["require","exports","module"], function (require, exports, module) {
  "use strict";

  exports.snippetText = "# demo\n\
snippet #demo\n\
	#demo ( ${1:macroName} ${2:\\$var1, [\\$var2, ...]} )\n\
		${3:## demo code}\n\
	#end\n\
";
  exports.scope = "demo";
});                (function() {
                    ace.require(["ace/snippets/demo"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            