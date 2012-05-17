# Duster-Ko #

Duster-KO is a Dust.JS[1] implementation & hack-up of a Knockout[2] Template Engine[3]. There's not a lot of the well famed uber-schmancy asynchronous & parallel Dust.js super-powers going on; this is a pretty straight & simple means of using Dust.js templates.

# Usage #

Is pretty straightforwards: 

* include and give an id for each compiled dust template: `<script type="application/javascript" src="mytemplate.dust.js" id="mytemplate"/>`
* bind to it. `<div data-bind="mytemplate"/>`
* `ko.applyBindings(myModelView)`
* ...
* uh, you also neeed to hack Dust. `:(` (hack already done & provided)

# Implementation #

Oh, pretty straightforwards, not much magic.

* Create a Dust helper-filter and make it default, to evaluate Observerable objects properly (call as a function with no arguments).
* Derive a utterly vanilla Knockout Template Engine that calls into Dust.
* A small hack to Dust to keep it from trying to evaluate Observables like functional Dust tags. See: `:(`

# Why the Dust hack #

:(

Unpleasant business, that.

Dust expects any functional tags to accept a set of parameters (chunk, context). We could build a Dust-friendly wrapper for every KO Observer, and build Dust contexts out of these, but that seems like an awful lot of unnecessary object creation.

Instead, we just hack Dust to not evaluate Observers like it normally would, and handle the aftermath with a more stock standard helper-filter.

# References #

[1] http://akdubya.github.com/dustjs/
[2] http://knockoutjs.com/
[3] https://github.com/SteveSanderson/knockout/blob/master/src/templating/templateEngine.js

