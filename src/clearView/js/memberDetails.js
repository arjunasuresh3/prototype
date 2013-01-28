var MemberDetails = Y.Base.create('memberDetails',Y.ZeView, [], {
                                  initializer :  function (cfg) {
                                      this.regpanels = [];
                                      this.acs = [];
                                  },
                                  template : '<div class="acFields">'
                                      + '<br>Member Id: {memId}'
                                      + '<br>Member Name: {memName}'
                                      + '<br>DOB: {dob}'
                                      + '<br><button type="button">Click Me!!!</button>'
                                      + '</div>',
                                  events : {
                                      button: {
                                          click: '_clickMeToo'
                                      }
                                  },
                                  _clickMeToo : function(ev) {
                                      Y.use("memberEditDetails", function() {
                                                new Y.MemberEditDetails({
                                                          palign : [Y.one('.detailsPanel'),Y.WidgetPositionAlign.TL,Y.WidgetPositionAlign.TL]
                                                      }).render();
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
                                      // MemberDetails.superclass._refresh.call(this);
                                      this._contentBox.setHTML(Y.Lang.sub(this.template, this.getAttrs(['dob','memId','memName'])));
                                      // this._contentBox.setHTML(this.template);
                                      var regpanel = new Y.Panel({
                                                                     width   : 400,
                                                                     render  : true,
                                                                     zIndex : 5,
                                                                     headerContent : 'Panel',
                                                                     buttons: [this.cancelButton]
                                                              }),
                                      palign = this.get('palign'),
                                      acFields = this._contentBox.all('input.acFieldsPanel'),
                                      _this = this;

                                      regpanel.align(palign[0],[palign[1], palign[2]]);

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
                                  },
                                  {
                                      ATTRS : {
                                          palign: {
                                              value: null
                                          },
                                          memName : {
                                              value: 'Satyam'
                                          },
                                          memId : {
                                              value: '12345'
                                          },
                                          dob : {
                                              value: '01/02/1985'
                                          }
                                      }
                                  });

Y.MemberDetails = MemberDetails;