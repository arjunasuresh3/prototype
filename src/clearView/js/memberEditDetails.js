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
                                      MemberEditDetails.superclass._refresh.call(this);
                                      var regpanel = new Y.Panel({
                                                                     width   : 400,
                                                                     render  : true,
                                                                     zIndex : 5,
                                                                     headerContent : 'Panel',
                                                                     bodyContent : this._contentBox,
                                                                     buttons: [this.cancelButton]
                                                              });
                                      var palign = this.get('palign');
                                      regpanel.align(palign[0],[palign[1], palign[2]]);

                                      // regpanel.align(Y.one('.detailsPanel'),[Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.TL]);
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
                                       }
                                   }
                               });

Y.MemberEditDetails = MemberEditDetails;