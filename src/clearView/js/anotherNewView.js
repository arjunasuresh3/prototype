var AnotherNewView = Y.Base.create('anothernewView',Y.ZeView, [], {
                                       template: 'Click Me AnotherNewView <button id="btn2" type="button">Click Me AnotherNewView!</button>'
                                           + '<div class="acFields">'
                                           + '<br>Autocomplete Field 1: <input class="acFields" id="ac-input1" type="text">'
                                           + '&nbsp;Autocomplete Field 2: <input class="acFields" id="ac-input2" type="text">'
                                           + '<br>Autocomplete Field 3: <input class="acFields" id="ac-input3" type="text">'
                                           + '&nbsp;Autocomplete Field 4: <input class="acFields" id="ac-input4" type="text">'
                                           + '</div>',
                                       events: {
                                           button: {
                                               click: function () {
                                                   this.fire('swap', {which: 'NewView',
                                                                      view: this});
                                               }
                                           }
                                       },
                                       _clickMe2: function(ev){
                                           console.log("asd");
                                       },
                                       _render:  function (container) {
                                           container.setHTML(this.template);
                                           var _this = this,
                                           acFields = container.all('input.acFields');
                                           acFields.each(function(eachacField) {
                                                             var ac = new Y.AutoComplete({
                                                                                              inputNode: eachacField,
                                                                                              render   : true,
                                                                                              resultHighlighter: 'phraseMatch',
                                                                                              source: 'select * from search.suggest where query="{query}"',
                                                                                              yqlEnv: 'http://pieisgood.org/yql/tables.env'
                                                                                          });
                                                             _this._destroyOnExit.push(ac);
                                                         });
                                       }
                                   });

Y.AnotherNewView = AnotherNewView;