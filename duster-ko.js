// DUST utilities

/**
* helper dust function to run a template sychronously, without mucking with callbacks.
* @params template the name of the dust template to be rendered
* @params ctx the context to render with
*/
function _renderTemplate(template,ctx){
	var result
	dust.render(template,ctx,function(err,out){
		if(err)
			throw template+": "+err.message
		result= out
	})
	return result
}

/**
* cache of Function objects that the dust.helpers.eval uses.
*/
var _dustEvalCache= {}

// DUST integration with knockout

/**
* an eval helper, for executing arbitrary javascript inside dust.
*/
var _dustEvalGlobal= function(chunk,ctx,bodies,params){
	var code,
	  block= bodies&&bodies.block,
	  param= params&&params.src
	if(block){
		code= block(new dust.chunk(), ctx).data
	}else if(params && params.src){
		code= params.src
	}

	var val= eval(code)
	//console.log("=DEVAL=",this,arguments,"|",code,"|",val)
	chunk.write(val)
}

/**
* a new filter, o, which will evaluate Knockout's observable objects.
*/
dust.filters.o= function(val){
	if(!!val && typeof val == "function" && val.name == "observable")
		return val()
	return val
}

/**
* override the default html-escaping filter with one which also evaluates observables.
*/
dust.filters.h= function(val){
	return dust.escapeHtml(dust.filters.o(val))
}


// KNOCKOUT duster template engine

ko.dusterTemplateEngine = function () { }
ko.dusterTemplateEngine.prototype = ko.utils.extend(new ko.templateEngine(), {
	renderTemplateSource: function (templateSource, bindingContext, options) {

		var name= typeof options == "string" ? options : options.name,
		  template= dust.cache[name]
		if(!template)
			throw "template "+name+" not found"

		var ctx= dust.makeBase({
			eval: _dustEvalGlobal
		})
		ctx= ctx.push(bindingContext.$root)
		for(var i in bindingContext.$parents){
			ctx= ctx.push(bindingContet.$parents[i])
		}
		ctx= ctx.push(bindingContext.$data)
		//console.log("=RTS=",this,templateSource,bindingContext,options,"|",name,ctx)

		var render= _renderTemplate(name,ctx)
		return ko.utils.parseHtmlFragment(render)
	},
	createJavaScriptEvaluatorBlock: function(script) {
		//console.log("=EVAL=",this,script)
		var escaped= script.replace("\"", "\\\"")
		return "{#eval src="+script+"/}"
	}
});
ko.setTemplateEngine(new ko.dusterTemplateEngine())
