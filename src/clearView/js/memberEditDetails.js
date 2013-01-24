var MemberEditDetails = Y.Base.create('memberEditDetails',Y.ZeView, [], {
                                  initializer:  function () {
                                      this.regpanels = [];
                                      this.acs = [];
                                  },
                                  template: '<div class="acFields">'
                                      + '<br><b>This is Item details!!!</b>'
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
                                      var regpanel = new Y.Panel({
                                                                     width   : 400,
                                                                     render  : true,
                                                                     zIndex : 5,
                                                                     headerContent : 'Panel',
                                                                     bodyContent : this._contentBox,
                                                                     buttons: [this.cancelButton]
                                                              });
                                      regpanel.align(Y.one('.detailsPanel'),[Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.TL]);
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

Y.MemberEditDetails = MemberEditDetails;