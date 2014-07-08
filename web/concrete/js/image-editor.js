Kinetic.Node.prototype.closest=function(a){for(var b=this.parent;void 0!==b;){if(b.nodeType===a)return b;b=b.parent}return!1},Kinetic.Stage.prototype.createCopy=function(){var a,b=[],c=this.getChildren();for(a=0;a<c.length;a++)b.push(c[a].clone());return b},Kinetic.Stage.prototype.getScaledWidth=function(){return Math.ceil(this.getWidth()/this.getScale().x)},Kinetic.Stage.prototype.getScaledHeight=function(){return Math.ceil(this.getHeight()/this.getScale().y)},Kinetic.Stage.prototype.getSaveWidth=function(){return this.im.saveWidth},Kinetic.Stage.prototype.getSaveHeight=function(){return this.im.saveHeight},Kinetic.Stage.prototype.getTotalDimensions=function(){var a=(this.getSaveHeight()/2-this.im.center.y)*this.getScale().y,b=a+this.getHeight()-this.getSaveHeight()*this.getScale().y,c=(this.getSaveWidth()/2-this.im.center.x)*this.getScale().x,d=c+this.getWidth()-this.getSaveWidth()*this.getScale().x;return{min:{x:c,y:a},max:{x:d,y:b},width:this.getScaledWidth(),height:this.getScaledHeight(),visibleWidth:Math.max(this.getSaveWidth(),2*this.getScaledWidth()-this.getSaveWidth()),visibleHeight:Math.max(this.getSaveHeight(),2*this.getScaledHeight()-this.getSaveHeight())}},Kinetic.Stage.prototype.loadCopy=function(a){var b;for(this.removeChildren(),b=0;b<a.length;b++)this.add(a[b]);this.draw()},Kinetic.Stage.prototype.elementType="stage",Kinetic.Image.prototype.getImageData=function(){var a=new Kinetic.Canvas(this.attrs.image.width,this.attrs.image.height),b=a.getContext();b.drawImage(this.attrs.image,0,0);try{var c=b.getImageData(0,0,a.getWidth(),a.getHeight());return c}catch(d){Kinetic.Util.warn("Unable to get imageData.")}},Kinetic.Layer.prototype._cacheddraw=(new Kinetic.Layer).draw,Kinetic.Layer.prototype.draw=function(){if("undefined"==typeof im||"undefined"==typeof im.trigger)return this._cacheddraw();var a=this._cacheddraw();return a},Kinetic.Layer.prototype.elementType="layer",Kinetic.Group.prototype.elementType="group",Kinetic.Text.prototype.rasterize=function(a){var b=this.parent,c=this;this.toImage({callback:function(d){var e=new Kinetic.Image({image:d,x:c.getPosition().x,y:c.getPosition().y});c.remove(),b.add(e).draw(),a.callback(e)}})};var control_sets=[],components=[],filters=[],ImageEditor=function(a){"use strict";if(void 0===a)return this;a.pixelRatio=1;var b=this,c=function(a){return Math.round(a)};b.width=a.width,b.height=a.height,b.saveWidth=a.saveWidth||c(b.width/2),b.saveHeight=a.saveHeight||c(b.height/2),b.strictSize=void 0!==a.saveWidth?!0:!1,b.stage=new Kinetic.Stage(a),b.namespaces={},b.controlSets={},b.components={},b.settings=a,b.filters={},b.fileId=b.settings.fID,b.scale=1,b.crosshair=new Image,b.uniqid=b.stage.getContainer().id,b.editorContext=$(b.stage.getContainer()).parent(),b.domContext=b.editorContext.parent(),b.controlContext=b.domContext.children("div.controls"),b.controlSetNamespaces=[],b.showLoader=$.fn.dialog.showLoader,b.hideLoader=$.fn.dialog.hideLoader,b.stage.im=b,b.stage.elementType="stage",b.crosshair.src="/concrete/images/image_editor/crosshair.png",b.center={x:Math.round(b.width/2),y:Math.round(b.height/2)},b.centerOffset={x:b.center.x,y:b.center.y};var d=function(a){return $(a,b.domContext)},e=function(){if(a.debug===!0&&"undefined"!=typeof console){var b=arguments;1==b.length&&(b=b[0]),console.log(b)}},f=function(){if(a.debug===!0&&"undefined"!=typeof console){var b=arguments;1==b.length&&(b=b[0]),console.warn(b)}},g=function(){if("undefined"!=typeof console){var a=arguments;1==a.length&&(a=a[0]),console.error("Image Editor Error: "+a)}};b.stage._setDraggable=b.stage.setDraggable,b.stage.setDraggable=function(a){return f("setting draggable to "+a),b.stage._setDraggable(a)},b.bindEvent=b.bind=b.on=function(a,c,d){var e=d||b.stage.getContainer();e instanceof jQuery&&(e=e[0]),ConcreteEvent.sub(a,c,e)},b.fireEvent=b.fire=b.trigger=function(a,c,d){var e=d||b.stage.getContainer();e instanceof jQuery&&(e=e[0]),ConcreteEvent.pub(a,c,e)},b.addElement=function(a,c){var d=new Kinetic.Layer;a.elementType=c,d.elementType=c,d.add(a),b.stage.add(d),d.moveDown(),b.stage.draw()},b.on("backgroundBuilt",function(){void 0!==b.activeElement&&void 0!==b.activeElement.doppelganger&&(b.foreground.add(b.activeElement.doppelganger),b.activeElement.doppelganger.setPosition(b.activeElement.getPosition()))}),b.setActiveElement=function(a){return a.defer?b.setActiveElement(a.defer):void(b.activeElement!=a&&(void 0!==b.activeElement&&void 0!==b.activeElement.doppelganger&&b.activeElement.doppelganger.remove(),a===b.stage||"Stage"==a.nodeType?(b.trigger("ChangeActiveAction",b.controlSetNamespaces.length?b.controlSetNamespaces[0]:void 0),$("div.control-sets",b.controlContext).find("h4.active").removeClass("active")):void 0!==a.doppelganger&&(b.foreground.add(a.doppelganger),b.foreground.draw()),b.trigger("beforeChangeActiveElement",b.activeElement),b.alterCore("activeElement",a),b.trigger("changeActiveElement",a),b.stage.draw()))},b.bind("ClickedElement",function(a,c){b.setActiveElement(c)}),b.bind("stageChanged",function(){(b.activeElement.getWidth()>b.stage.getScaledWidth()||b.activeElement.getHeight()>b.stage.getScaledHeight())&&b.setActiveElement(b.stage)});var h=d(b.stage.getContainer()).parent().children(".bottomBar");h.attr("unselectable","on");var i={};i.zoomIn=d("<div class='bottombarbutton plus'><i class='fa fa-plus'></i></div>"),i.zoomOut=d("<div class='bottombarbutton'><i class='fa fa-minus'></i></div>"),i.zoomIn.appendTo(h),i.zoomOut.appendTo(h),i.zoomIn.click(function(a){b.fire("zoomInClick",a)}),i.zoomOut.click(function(a){b.fire("zoomOutClick",a)});var j=d("<div></div>").addClass("scale").text("100%");b.on("scaleChange",function(){j.text(Math.round(1e4*b.scale)/100+"%")}),j.click(function(){b.scale=1,b.stage.setScale(b.scale);var a=b.stage.getDragBoundFunc()({x:b.stage.getX(),y:b.stage.getY()});b.stage.setX(a.x),b.stage.setY(a.y),b.fire("scaleChange"),b.buildBackground(),b.stage.draw()}),j.appendTo(h);var k=5/6;b.on("zoomInClick",function(){var a=(-b.stage.getX()+b.stage.getWidth()/2)/b.scale,c=(-b.stage.getY()+b.stage.getHeight()/2)/b.scale;b.scale/=k,b.scale=Math.round(1e3*b.scale)/1e3,b.alterCore("scale",b.scale);var d=(-b.stage.getX()+b.stage.getWidth()/2)/b.scale,e=(-b.stage.getY()+b.stage.getHeight()/2)/b.scale;b.stage.setX(b.stage.getX()-(a-d)*b.scale),b.stage.setY(b.stage.getY()-(c-e)*b.scale),b.stage.setScale(b.scale);var f=b.stage.getDragBoundFunc()({x:b.stage.getX(),y:b.stage.getY()});b.stage.setX(f.x),b.stage.setY(f.y),b.fire("scaleChange"),b.buildBackground(),b.stage.draw()}),b.on("zoomOutClick",function(){var a=(-b.stage.getX()+b.stage.getWidth()/2)/b.scale,c=(-b.stage.getY()+b.stage.getHeight()/2)/b.scale;b.scale*=k,b.scale=Math.round(1e3*b.scale)/1e3,b.alterCore("scale",b.scale);var d=(-b.stage.getX()+b.stage.getWidth()/2)/b.scale,e=(-b.stage.getY()+b.stage.getHeight()/2)/b.scale;b.stage.setX(b.stage.getX()-(a-d)*b.scale),b.stage.setY(b.stage.getY()-(c-e)*b.scale),b.stage.setScale(b.scale);var f=b.stage.getDragBoundFunc()({x:b.stage.getX(),y:b.stage.getY()});b.stage.setX(f.x),b.stage.setY(f.y),b.fire("scaleChange"),b.buildBackground(),b.stage.draw()});var l={};if(l.width=d("<span/>").addClass("saveWidth"),l.height=d("<span/>").addClass("saveHeight"),l.crop=d('<div><i class="icon-resize-full"/></div>').addClass("bottombarbutton").addClass("crop"),l.both=l.height.add(l.width).width(32).attr("contenteditable",!0),l.area=d("<span/>").css({"float":"right"}),b.on("adjustedsavers",function(){l.width.text(b.saveWidth),l.height.text(b.saveHeight)}),l.crop.click(function(){b.adjustSavers()}),b.strictSize?l.both.attr("disabled","true"):l.both.keyup(function(a){b.fire("editedSize",a)}),b.bind("editedSize",function(){b.saveWidth=parseInt(l.width.text()),b.saveHeight=parseInt(l.height.text()),isNaN(b.saveWidth)&&(b.saveWidth=0),isNaN(b.saveHeight)&&(b.saveHeight=0),b.buildBackground()}),b.bind("saveSizeChange",function(){l.width.text(b.saveWidth),l.height.text(b.saveHeight)}),b.setCursor=function(a){$(b.stage.getContainer()).css("cursor",a)},b.save=function(){b.fire("ChangeActiveAction"),b.stage.toDataURL({callback:function(a){var c=$("<img />").addClass("fake_canvas").appendTo(b.editorContext.children(".Editor"));c.attr("src",a),c.css({position:"absolute",top:0,left:0,backgroundColor:"white"});var d=b.stage.getPosition(),e=b.scale;b.stage.setPosition(-b.saveArea.getX(),-b.saveArea.getY()),b.stage.setScale(1),b.background.hide(),b.foreground.hide(),b.stage.draw(),b.stage.toDataURL({width:b.saveWidth,height:b.saveHeight,callback:function(a){b.stage.setPosition(d),b.background.show(),b.foreground.show(),b.stage.setScale(e),b.stage.draw(),c.remove(),$.post("/index.php/tools/required/files/importers/imageeditor",{fID:b.fileId,imgData:a},function(a){var b=JSON.parse(a);1===b.error?alert(b.message):0===b.error&&(window.location=window.location,window.location.reload())})}})}})},b.actualPosition=function(a,c,d,e){var f=c-e,g=a-d,h=b.activeElement.getRotation()+Math.atan2(f,g),i=Math.sqrt(Math.pow(g,2)+Math.pow(f,2));return[d+i*Math.cos(h),e+i*Math.sin(h)]},b.getActualRect=function(a,c,d){var e=[],f=d.getRotation();return e.push(b.actualPosition(d.getX(),d.getY(),a,c,f)),e.push(b.actualPosition(d.getX()+d.getWidth()*d.getScaleX(),d.getY(),a,c,f)),e.push(b.actualPosition(d.getX()+d.getWidth()*d.getScaleX(),d.getY()+d.getHeight()*d.getScaleY(),a,c,f)),e.push(b.actualPosition(d.getX(),d.getY()+d.getHeight()*d.getScaleY(),a,c,f)),e},b.adjustSavers=function(a){if("Stage"!==b.activeElement.nodeType){b.foreground.autoCrop=!1,b.background.autoCrop=!1;var c,c,d={min:{x:!1,y:!1},max:{x:!1,y:!1}},e=b.activeElement,f=e.parent,g=b.getActualRect(0,0,e);for(c=g.length-1;c>=0;c--){var h=g[c],i=h[0]+f.getX(),j=h[1]+f.getY();(i>d.max.x||d.max.x===!1)&&(d.max.x=i),(i<d.min.x||d.min.x===!1)&&(d.min.x=i),(j>d.max.y||d.max.y===!1)&&(d.max.y=j),(j<d.min.y||d.min.y===!1)&&(d.min.y=j)}var k={width:d.max.x-d.min.x,height:d.max.y-d.min.y};b.alterCore("saveWidth",Math.round(k.width)),b.alterCore("saveHeight",Math.round(k.height)),b.buildBackground();var l=[b.center.x-b.activeElement.getWidth()*b.activeElement.getScaleX()/2,b.center.y-b.activeElement.getHeight()*b.activeElement.getScaleY()/2],m=b.actualPosition(l[0],l[1],b.center.x,b.center.y,b.activeElement.getRotation());b.activeElement.parent.setPosition(m.map(Math.round)),a!==!1&&b.fire("adjustedsavers"),b.stage.draw()}},b.bind("imageLoad",function(){setTimeout(b.adjustSavers,0)}),b.extend=function(a,b){this[a]=b},b.alterCore=function(a,c){var d,e=b;if(b.namespace){{e.namespace}e=b.realIm}b[a]=c;for(d in b.controlSets)b.controlSets[d].im.extend(a,c);for(d in b.filters)b.filters[d].im.extend(a,c);for(d in b.components)b.components[d].im.extend(a,c)},b.clone=function(a){var c,d=new ImageEditor;d.realIm=b;for(c in b)d[c]=b[c];return d.namespace=a,d},b.addControlSet=function(a,c,d){jQuery&&d instanceof jQuery&&(d=d[0]),d.controlSet=function(b,c){b.disable=function(){b.enabled=!1,$(d).parent().parent().addClass("disabled")},b.enable=function(){b.enabled=!0,$(d).parent().parent().removeClass("disabled")},this.im=b,this.$=$,f("Loading ControlSet",b);try{new Function("im","$",c).call(this,b,$)}catch(e){console.log(e.stack);var h=e.stack.replace(/[\S\s]+at HTMLDivElement.eval.+?<anonymous>:(\d+:\d+)[\S\s]+/,"$1").split(":");if(h[1]&&!isNaN(parseInt(h[1]))){var i=c.split("\n"),j="Parse error at line #"+h[0]+" char #"+h[1]+" within "+a;j+="\n"+i[parseInt(h[0])-1],j+="\n"+new Array(parseInt(h[1])).join(" ")+"^",g(j)}else g('"'+e.message+'" in "'+b.namespace+'"')}return this};var e=b.clone(a),h=d.controlSet.call(d,e,c);return b.controlSets[a]=h,h},b.addFilter=function(a,c){var d=function(b,c){this.namespace=b.namespace,this.im=b;try{new Function("im","$",c).call(this,b,$)}catch(d){g(d),window.lastError=d;var e=d.stack.replace(/[\S\s]+at HTMLDivElement.eval.+?<anonymous>:(\d+:\d+)[\S\s]+/,"$1").split(":");if(2!=e.length)g(d.message),g(d.stack);else{var f=c.split("\n"),h="Parse error at line #"+e[0]+" char #"+e[1]+" within "+a;h+="\n"+f[parseInt(e[0])-1],h+="\n"+new Array(parseInt(e[1])||0).join(" ")+"^",g(h)}}return this},e=b.clone(a),f=new d(e,c);return b.filters[a]=f,f},b.addComponent=function(a,c,d){jQuery&&d instanceof jQuery&&(d=d[0]),d.component=function(b,c){b.disable=function(){$(this).parent().parent().addClass("disabled")},b.enable=function(){$(this).parent().parent().removeClass("disabled")},this.im=b,f("Loading component",b);try{new Function("im","$",c).call(this,b,$)}catch(d){var e=d.stack.replace(/[\S\s]+at HTMLDivElement.eval.+?<anonymous>:(\d+:\d+)[\S\s]+/,"$1").split(":");if(e[1]&&!isNaN(parseInt(e[1]))){var h=c.split("\n"),i="Parse error at line #"+e[0]+" char #"+e[1]+" within "+a;i+="\n"+h[parseInt(e[0])-1],i+="\n"+new Array(parseInt(e[1])).join(" ")+"^",g(i)}else g('"'+d.message+'" in "'+b.namespace+'"')}return this};var e=b.clone(a),h=d.component.call(d,e,c);return b.components[a]=h,h},b.background=new Kinetic.Layer,b.foreground=new Kinetic.Layer,b.stage.add(b.background),b.stage.add(b.foreground),b.bgimage=new Image,b.saveArea=new Kinetic.Rect,b.background.add(b.saveArea),b.bind("load",function(){b.saveArea.setFillPatternImage(b.bgimage),b.saveArea.setFillPatternOffset([-(b.saveWidth/2),-(b.saveHeight/2)]),b.saveArea.setFillPatternScale(1/b.scale),b.saveArea.setFillPatternX(0),b.saveArea.setFillPatternY(0),b.saveArea.setFillPatternRepeat("repeat"),b.background.on("click",function(){b.setActiveElement(b.stage)})},b.bgimage),b.bgimage.src="/concrete/images/testbg.png",b.buildBackground=function(){var a=b.stage.getTotalDimensions();b.saveArea.setFillPatternOffset([-(b.saveWidth/2)*b.scale,-(b.saveHeight/2)*b.scale]),b.saveArea.setX(Math.round(b.center.x-b.saveWidth/2)),b.saveArea.setY(Math.round(b.center.y-b.saveHeight/2)),b.saveArea.setFillPatternScale(1/b.scale),b.saveArea.setWidth(b.saveWidth),b.saveArea.setHeight(b.saveHeight),b.coverLayer||(b.coverLayer=new Kinetic.Rect,b.coverLayer.setStroke("rgba(150,150,150,.5)"),b.coverLayer.setFill("transparent"),b.coverLayer.setListening(!1),b.coverLayer.setStrokeWidth(Math.max(a.width,a.height,500)),b.foreground.add(b.coverLayer));var c=2*Math.max(a.width,a.height);b.coverLayer.setPosition(b.saveArea.getX()-c/2,b.saveArea.getY()-c/2),b.coverLayer.setSize(b.saveArea.getWidth()+c,b.saveArea.getHeight()+c),b.coverLayer.setStrokeWidth(c),b.fire("backgroundBuilt"),b.saveArea.draw(),b.coverLayer.draw()},b.buildBackground(),b.on("stageChanged",b.buildBackground),b.stage.setDragBoundFunc(function(a){var c=b.stage.getTotalDimensions(),d=Math.max(c.max.x,c.min.x)+100,e=Math.min(c.max.x,c.min.x)-100,f=Math.max(c.max.y,c.min.y)+100,g=Math.min(c.max.y,c.min.y)-100;return a.x=Math.floor(a.x),a.y=Math.floor(a.y),a.x>d&&(a.x=d),a.x<e&&(a.x=e),a.y>f&&(a.y=f),a.y<g&&(a.y=g),a.x=Math.floor(a.x),a.y=Math.floor(a.y),a}),b.setActiveElement(b.stage),b.stage.setDraggable(!0),b.autoCrop=!0,b.on("imageLoad",function(){var a=50,c=b.stage.getWidth()-2*a,d=b.stage.getHeight()-2*a;if(!(b.saveWidth<c&&b.saveHeight<d)){var e=Math.max(b.saveWidth/c,b.saveHeight/d);b.scale=1/e,b.scale=Math.round(100*b.scale)/100,b.alterCore("scale",b.scale),b.stage.setScale(b.scale),b.stage.setX((b.stage.getWidth()-b.stage.getWidth()*b.stage.getScale().x)/2),b.stage.setY((b.stage.getHeight()-b.stage.getHeight()*b.stage.getScale().y)/2);var f=b.stage.getDragBoundFunc()({x:b.stage.getX(),y:b.stage.getY()});b.stage.setX(f.x),b.stage.setY(f.y),b.fire("scaleChange"),b.fire("stageChanged"),b.buildBackground()}}),b.fit=function(a,c){if(c===!1)return{width:b.saveWidth,height:b.saveHeight};var d=a.height,e=a.width;return e>b.saveWidth&&(d/=e/b.saveWidth,e=b.saveWidth),d>b.saveHeight&&(e/=d/b.saveHeight,d=b.saveHeight),{width:e,height:d}},a.src){b.showLoader("Loading Image..");var m=new Image,n=!1;b.bind("ControlSetsLoaded",function(){n=!0}),b.bind("load",function(){function a(){_.defer(function(){b.stage.draw(),b.setActiveElement(d),b.fire("changeActiveAction",b.controlSetNamespaces[0])})}b.strictSize||(b.saveWidth=m.width,b.saveHeight=m.height,b.fire("saveSizeChange"),b.buildBackground());var c={x:Math.floor(b.center.x-m.width/2),y:Math.floor(b.center.y-m.height/2)},d=new Kinetic.Image({image:m,x:0,y:0});d.setPosition(c),b.addElement(d,"image"),_.defer(function(){b.fire("imageload")}),n?a():b.bind("ControlSetsLoaded",a)},m),m.src=a.src}else b.fire("imageload");return b.bind("imageload",function(){var c,d=a.controlsets||{},f=(a.filters||{},0);e("Loading ControlSets"),b.showLoader("Loading Control Sets.."),b.fire("LoadingControlSets");for(c in d){var g="ControlSet_"+c;b.controlSetNamespaces.push(g),$.ajax(d[c].src,{dataType:"text",cache:!1,namespace:c,myns:g,beforeSend:function(){f++},success:function(a){f--;var c=b.addControlSet(this.myns,a,d[this.namespace].element);e(c),b.fire("controlSetLoad",c),0==f&&b.trigger("ControlSetsLoaded")},error:function(){f--,0==f&&b.trigger("ControlSetsLoaded")}})}}),b.bind("ControlSetsLoaded",function(){b.fire("LoadingComponents"),b.showLoader("Loading Components..");var c,d=a.components||{},f=0;e("Loading Components");for(c in d){var g="Component_"+c;$.ajax(d[c].src,{dataType:"text",cache:!1,namespace:c,myns:g,beforeSend:function(){f++},success:function(a){f--;var c=b.addComponent(this.myns,a,d[this.namespace].element);e(c),b.fire("ComponentLoad",c),0==f&&b.trigger("ComponentsLoaded")},error:function(){f--,0==f&&b.trigger("ComponentsLoaded")}})}0==f&&b.trigger("ComponentsLoaded")}),b.bind("ComponentsLoaded",function(){e("Loading Filters"),b.showLoader("Loading Filters..");var c,d,f=a.filters||{},g=0;b.fire("LoadingFilters");for(c in f)f.hasOwnProperty(c)&&!function(a){var c=_.clone(f[a]),e="Filter_"+a,h=c.name;d||(d=e),g++,$.ajax(f[a].src,{dataType:"text",cache:!1,namespace:a,myns:e,name:h,success:function(a){var d=b.addFilter(this.myns,a);d.name=this.name,d.settings=c,b.fire("filterLoad",d),g--,0===g&&b.trigger("FiltersLoaded")},error:function(){g--,0===g&&b.trigger("FiltersLoaded")}})}(c)}),b.bind("ChangeActiveAction",function(a,c){if(c!==b.activeControlSet){for(var e in b.controlSets)d(b.controlSets[e]),e!==c&&d(b.controlSets[e]).slideUp();if(b.activeControlSet=c,b.alterCore("activeControlSet",c),!c)return void $("div.control-sets",b.controlContext).find("h4.active").removeClass("active");var f=$(b.controlSets[c]),g=f.show().height();0!=f.length&&f.hide().height(g).slideDown(function(){$(this).height("")})}}),b.bind("ChangeActiveComponent",function(a,c){if(c!==b.activeComponent){for(var e in b.components)e!==c&&d(b.components[e]).slideUp();if(b.activeComponent=c,b.alterCore("activeComponent",c),c){var f=$(b.components[c]),g=f.show().height();0!=f.length&&f.hide().height(g).slideDown(function(){$(this).height("")})}}}),b.bind("ChangeNavTab",function(a,c){b.trigger("ChangeActiveAction",c),b.trigger("ChangeActiveComponent",c);var e=d("div.editorcontrols");switch(c){case"add":e.children("div.control-sets").hide(),e.children("div.components").show();break;case"edit":e.children("div.components").hide(),e.children("div.control-sets").show()}}),b.bind("FiltersLoaded",function(){b.hideLoader()}),b.slideOut=$("<div/>").addClass("slideOut").css({width:0,"float":"right",height:"100%","overflow-x":"hidden",right:b.controlContext.width()-1,position:"absolute",background:"white","box-shadow":"black -20px 0 20px -25px"}),b.slideOutContents=$("<div/>").appendTo(b.slideOut).width(300),b.showSlideOut=function(a,c){b.hideSlideOut(function(){b.slideOut.empty(),b.slideOutContents=a.width(300),b.slideOut.append(b.slideOutContents),b.slideOut.addClass("active").addClass("sliding"),b.slideOut.stop(1).slideOut(300,function(){b.slideOut.removeClass("sliding"),"function"==typeof c&&c()})})},b.hideSlideOut=function(a){b.slideOut.addClass("sliding"),b.slideOut.slideIn(300,function(){b.slideOut.css("border-right","0"),b.slideOut.removeClass("active").removeClass("sliding"),"function"==typeof a&&a()})},b.controlContext.after(b.slideOut),b.setActiveElement(b.stage),window.c5_image_editor=b,window.im=b,b};$.fn.ImageEditor=function(a){void 0===a&&(a={}),a.imageload=$.fn.dialog.hideLoader;var b=$(this);if(a.container=b[0],0==b.height())return void setTimeout(function(){b.ImageEditor(a)},50);b.closest(".ui-dialog").find(".ui-resizable-handle").hide(),b.height("-=30"),$("div.editorcontrols").height(b.height()-90),b.width("-=330").parent().width("-=330").children("div.bottomBar").width("-=330"),void 0===a.width&&(a.width=b.width()),void 0===a.height&&(a.height=b.height()),$.fn.dialog.showLoader();var c=new ImageEditor(a),d=c.domContext;return $("div.control-sets > div.controlset",d).each(function(){var a=$(this),b=a.data("namespace");a.find("h4").click(function(){a.hasClass("active")||c.fire("ChangeActiveAction","ControlSet_"+b)}),c.bind("ChangeActiveAction",function(c,e){if(e==="ControlSet_"+b){d.find("div.controlset.active").removeClass("active").children(".control").slideUp(250),a.addClass("active");var f=a.children(".control").height("auto");f.slideDown(250)}})}),$("div.controls > div.controlscontainer",d).children("div.save").children("button.save").click(function(){c.save()}).end().children("button.cancel").click(function(){confirm("Are you sure?")&&$.fn.dialog.closeTop()}),c.on("ChangeActiveAction",function(a,b){b||$("h4.active",d).removeClass("active")}),c.on("ChangeActiveComponent",function(a,b){b||$("div.controlset.active",d).removeClass("active")}),c.bind("imageload",$.fn.dialog.hideLoader),c},$.fn.slideOut=function(a,b){var c=$(this),d=c.width(),e=255;return c.css("overflow-y","auto"),d==e?(c.animate({width:e},0,b),this):(c.width(d).animate({width:e},a||300,b||function(){}),this)},$.fn.slideIn=function(a,b){var c=$(this);return c.css("overflow-y","hidden"),0===c.width()?(c.animate({width:0},0,b),this):(c.animate({width:0},a||300,b||function(){}),this)},ImageEditor.prototype=ImageEditor.fn={filter:{grayscale:Kinetic.Filters.Grayscale,sepia:function(a){var b,c=a.data;for(b=0;b<c.length;b+=4)c[b]=.393*c[b]+.769*c[b+1]+.189*c[b+2],c[b+1]=.349*c[b]+.686*c[b+1]+.168*c[b+2],c[b+2]=.272*c[b]+.534*c[b+1]+.131*c[b+2]},brightness:function(a,b){for(var c=b.level,d=a.data,e=0;e<d.length;e+=4)d[e]+=c,d[e+1]+=c,d[e+2]+=c},invert:function(a){for(var b=a.data,c=0;c<b.length;c+=4)b[c]=255-b[c],b[c+1]=255-b[c+1],b[c+2]=255-b[c+2]},restore:function(a,b){for(var c=(b.level,a.data),d=b.imageData.data,e=0;e<c.length;e+=4)c[e]=d[e],c[e+1]=d[e+1],c[e+2]=d[e+2]}}};