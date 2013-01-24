var MyPanelView = Y.Base.create('mypanelView',Y.ZeView, [], {
                                  initializer:  function () {
                                      this.regpanels = [];
                                      this.acs = [];
                                  },
                                  template: '<div class="acFields">'
                                      + '<br>Autocomplete Field 1: <input class="acFieldsPanel" id="ac-input9" type="text">'
                                      + 'Autocomplete Field 2: <input class="acFieldsPanel" id="ac-input10" type="text">'
                                      + '<br>Autocomplete Field 3: <input class="acFieldsPanel" id="ac-input11" type="text">'
                                      + 'Autocomplete Field 4: <input class="acFieldsPanel" id="ac-input12" type="text">'
                                      + '</div>',
                                  events: {
                                  },
                                  okButton : {
                                      value: 'ok',
                                      section: Y.WidgetStdMod.FOOTER,
                                      action: function (ev) {
                                          // var numHounds = Y.Escape.html(Y.one('#hounds').get('value'));
                                          // Y.one('body').append('<p>Hounds released: ' + numHounds + '</p>');
                                          ev.preventDefault();
                                          this.hide();
                                      }
                                  },
                                  cancelButton : {
                                      value: 'close',
                                      section: Y.WidgetStdMod.FOOTER,
                                      action: function (ev) {
                                          ev.preventDefault();
                                          this.hide();                                      }
                                  },
                                  _refresh: function () {
                                      this._contentBox.setHTML(this.template);
                                      var acFields = this._contentBox.all('input.acFieldsPanel'),
                                      _this = this;
                                      acFields.each(function(eachacField) {
                                                        var ac = new Y.AutoComplete({
                                                                                        inputNode: eachacField,
                                                                                        render   : true,
                                                                                        resultHighlighter: 'phraseMatch',
                                                                                        source: 'select * from search.suggest where query="{query}"',
                                                                                        yqlEnv: 'http://pieisgood.org/yql/tables.env'
                                                                                    });
                                                        _this.acs.push(ac);
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
                                                                     bodyContent : this._contentBox,
                                                                     buttons: [this.okButton, this.cancelButton]
                                                              }).plug(Y.Plugin.Drag).plug(Y.Plugin.Resize);
                                      this.regpanels.push(regpanel);
                                  },
                                  destroy: function () {
                                      var contentBox = this._contentBox;
                                      if (contentBox) {
                                          contentBox.setHTML('');
                                      }
                                      delete this._contentBox;
                                      Y.Array.each(this.acs, function(ac) {
                                                       ac.destroy();
                                                   });
                                      Y.Array.each(this.regpanels, function(regpanel) {
                                                       regpanel.destroy();
                                                   });
                                  }
                              });

Y.MyPanelView = MyPanelView;