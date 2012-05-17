(function(){
	dust.register("helloworld",body_0);
	function body_0(chk,ctx){
		return chk
			.write("Hellloooooo, ")
			.reference(ctx.get("name"),ctx,"h")
			.write("! ")
			.section(ctx.get("eval"),ctx,{"block":body_1},null)
			.write("  \nOf course, ")
			.reference(ctx.get("name"),ctx,"h")
			.write("! ")
			.section(ctx.get("eval"),ctx,{},{"src":"2 + 4"});
	}
	function body_1(chk,ctx){
		return chk
			.write(" 2 + ")
			.reference(ctx.get("n"),ctx,"h")
			.write(" ");
	}
	return body_0;
})();
