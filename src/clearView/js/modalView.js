var ModalView = Y.Base.create('modalView',Y.ZeView, [], {
                                  initializer:  function () {
                                      this.regmodals = [];
                                  },
                                  template: '<div class="acFields">'
                                      + '<br>Autocomplete Field 1: <input class="acFieldsPanel" id="ac-input5" type="text">'
                                      + 'Autocomplete Field 2: <input class="acFieldsPanel" id="ac-input6" type="text">'
                                      + '<br>Autocomplete Field 3: <input class="acFieldsPanel" id="ac-input7" type="text">'
                                      + 'Autocomplete Field 4: <input class="acFieldsPanel" id="ac-input8" type="text">'
                                      + '</div>',
                                  events: {
                                  },
                                  _refresh:  function () {
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
                                                        // _this._destroyOnExit.push(ac);
                                                    });
                                      var panel = new Y.Panel({
                                                                  width   : 400,
                                                                  centered: true,
                                                                  render  : true,
                                                                  modal  : true,
                                                                  zIndex  : 5,
                                                                  bodyContent : this._contentBox
                                                              });
                                      panel.set('headerContent','Modal');
                                      this.regmodals.push(panel);
                                  }
                              });

Y.ModalView = ModalView;