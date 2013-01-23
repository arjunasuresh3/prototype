Y.ZeCalendar = Y.Base.create('zecalendar', Y.Calendar, [], {
                                     initializer: function() {
                                         this.events = [
                                             this.on("selectionChange", function (ev) {
                                                         console.log("selectionChange");
                                                         var newDate = ev.newSelection[0];
                                                         this.tr.set('value',this.dtdate.format(newDate, {format:"%m-%d-%Y"}));
                                                         this.hide();
                                                         this.get('boundingBox').setStyle("display", "none");
                                                         this.tr_click.detach();
                                                     }),
                                             this.get('boundingBox').on(['focusoutside','clickoutside'], function(ev) {
                                                                            console.log("focusoutside");
                                                                            this.hide();                          
                                                                            this.get('boundingBox').setStyle("display", "none");
                                                                            // this.tr_click.detach();
                                                                        },this)
                                         ];
                                     },
                                     destructor: function() {
                                         for (var i=0;i<this.events.length;i++) {
                                             this.events[i].detach();
                                         }
                                     },
                                     showUnder: function(tr) {
                                         this.tr = tr;
                                         var oReg = tr.get('region');
                                         this.dtdate = Y.DataType.Date;
                                         this.show();
                                         this.get('boundingBox').setStyle("display", "");
                                         this.tr_click = tr.on('click',function(ev){
                                                                  ev.stopPropagation();
                                                              });
                                         this.get('boundingBox').setXY([oReg.left,oReg.bottom]);
                                     }
                                 });