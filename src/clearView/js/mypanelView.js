var MyPanelView = Y.Base.create('mypanelView',Y.ZeView, [], {
                                  initializer:  function () {
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
                                  _refresh: function () {
                                      this._contentBox.setHTML(this.template);
                                      var acFields = this._contentBox.all('input.acFieldsPanel');
                                      acFields.each(function(eachacField) {
                                                        var ac = new Y.AutoComplete({
                                                                                        inputNode: eachacField,
                                                                                        render   : true,
                                                                                        resultHighlighter: 'phraseMatch',
                                                                                        source: 'select * from search.suggest where query="{query}"',
                                                                                        yqlEnv: 'http://pieisgood.org/yql/tables.env'
                                                                                    });
                                                        // regpanel.setStdModContent(Y.WidgetStdMod.BODY,ac.get('boundingBOX'),Y.WidgetStdMod.AFTER);
                                                    });
                                      

                                      // regpanel.setStdModContent(Y.WidgetStdMod.BODY,container);
                                      // regpanel.set('bodyContent', this._contentBox);
                                      var regpanel = new Y.Panel({
                                                                     width   : 400,
                                                                     centered: true,
                                                                     render  : true,
                                                                     zIndex : 5,
                                                                     headerContent : 'Panel',
                                                                     bodyContent : this._contentBox
                                                              }).plug(Y.Plugin.Drag).plug(Y.Plugin.Resize);
                                      this.regpanels.push(regpanel);
                                  }
                              });

Y.MyPanelView = MyPanelView;