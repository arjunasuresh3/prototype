var MyPanelView = Y.Base.create('mypanelView',Y.ZeView, [], {
                                  initializer:  function (container) {
                                      this.regpanels = [];
                                  },
                                  template: '<div class="acFields">'
                                      + '<br>Autocomplete Field 1: <input class="acFieldsPanel" id="ac-input9" type="text">'
                                      + 'Autocomplete Field 2: <input class="acFieldsPanel" id="ac-input10" type="text">'
                                      + '<br>Autocomplete Field 3: <input class="acFieldsPanel" id="ac-input11" type="text">'
                                      + 'Autocomplete Field 4: <input class="acFieldsPanel" id="ac-input12" type="text">'
                                      + '</div>',
                                  events: {
                                  },
                                  _render: function (container) {
                                      container.setHTML(this.template);
                                      var _this = this,
                                      acFields = container.all('input.acFieldsPanel');
                                      acFields.each(function(eachacField) {
                                                        var ac = new Y.AutoComplete({
                                                                                        inputNode: eachacField,
                                                                                        render   : true,
                                                                                        resultHighlighter: 'phraseMatch',
                                                                                        source: 'select * from search.suggest where query="{query}"',
                                                                                        yqlEnv: 'http://pieisgood.org/yql/tables.env'
                                                                                    });
                                                        // _this._destroyOnExit.push(ac);
                                                    });

                                      var regpanel = new Y.Panel({
                                                                     srcNode: container,
                                                                     width   : 400,
                                                                     centered: true,
                                                                     render  : true,
                                                                     zIndex : 5,
                                                                     headerContent : 'Panel'
                                                              }).plug(Y.Plugin.Drag).plug(Y.Plugin.Resize);
                                      // regpanel.plug(Y.Plugin.Drag);
                                      // regpanel.setStdModContent(Y.WidgetStdMod.BODY,container);
                                      // regpanel.set('bodyContent', container.getHTML());
                                      this.regpanels.push(regpanel);
                                  }
                              });

Y.MyPanelView = MyPanelView;