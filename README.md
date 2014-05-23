## bearcat-jstrace
[jstrace](https://github.com/jstrace/jstrace) support for [bearcat](https://github.com/bearcatnode/bearcat) based on bearcat AOP   

## Installation
```
npm install bearcat-jstrace --save
```

update context.json, add bearcat-jstrace dependencies    
```
"dependencies": {
	"bearcat-jstrace": "*"
}
```

## Usage
bearcat-jstrace uses bearcat [AOP](https://github.com/bearcatnode/bearcat/wiki/Aspect-Object-Programming) as its backbone, the default pointcut defined is  
```
"pointcut": "around:\\w+Service.*?",
```

therefore all your POJOs' methods named with ***Service*** will be traced by jstrace  

you can overload this pointcut by setting up context.json in your project like  
```
"beans": [{
	"id": "jstraceAspect",
	"func": "node_modules.bearcat-jstrace.lib.aspect.jstraceAspect",
	"aop": [{
		"pointcut": "around:\\w+Dao.*?",
		"advice": "doJstrace",
		"runtime": true
	}]
}]
```

this changes to all POJOs' methods named with ***Dao*** will be traced by jstrace  

you can set up trace target by add ***traceName*** in your trace target like  
```
HelloService.prototype.traceName = "HelloService";
```

***note***: since the best practise of AOP target method is a function with callback function, when it is a sync function with ***return***, end trace will not be emitted  

## Probes
* bearcat:method:start
* bearcat:method:end

## License

(The MIT License)

Copyright (c) fantasyni and other contributors

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.