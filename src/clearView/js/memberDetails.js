var MemberDetails = Y.Base.create('memberDetails',Y.ZeView, [], {
                                  initializer :  function () {
                                      this.regpanels = [];
                                      this.acs = [];
                                  },
                                  template : '<div class="acFields">'
                                      + '<br>Item Id: ga-3475'
                                      + 'Item Name: <input class="acFieldsPanel" id="ac-input10" type="text">'
                                      + '<br>Item Price: $6.99'
                                      + 'Item Cost: $5.99'
                                      + '<button type="button">Click Me!!!</button>'
                                      + '</div>',
                                  events : {
                                      button: {
                                          click: '_clickMeToo'
                                      }
                                  },
                                  _clickMeToo : function(ev) {
                                      console.log("asd");
                                      Y.use("memberEditDetails", function() {
                                                new Y.MemberEditDetails().render();
                                            });
                                  },
                                  okButton : {
                                      value: 'ok',
                                      section: Y.WidgetStdMod.FOOTER,
                                      action: function (ev) {
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
                                      MemberDetails.superclass._refresh.call(this);
                                      this._contentBox.setHTML(this.template);
                                      var regpanel = new Y.Panel({
                                                                     width   : 400,
                                                                     render  : true,
                                                                     zIndex : 5,
                                                                     headerContent : 'Panel',
                                                                     buttons: [this.cancelButton]
                                                              });
                                      regpanel.align(Y.one('.allFixedPanels'),[Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.TL]);
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
                                                    });

                                      regpanel.set('bodyContent', this._contentBox);
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

Y.MemberDetails = MemberDetails;