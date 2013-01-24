YUI().use('zeView', 'contentSwapper', function(Y) {

    YUI.namespace('Ze');
    YUI().use('zecalendar', function (Y) {
                  YUI.Ze.calendar = new Y.ZeCalendar({
                                                         contentBox: "#mycalendar",
                                                         showPrevMonth: true,
                                                         showNextMonth: true,
                                                         visible: false,
                                                         render:true,
                                                         date: new Date()});
                  YUI.Ze.calendar.get('boundingBox').setStyle("display", "none");
              });


    var MyView = Y.Base.create('myView', Y.ZeView, [Y.ContentSwapper], {
        template: '<p border="1">This is the fixed div container, next comes the variable part:</p><div class="variableContent"></div><div style="width: 800px;overflow:hidden;"><div style="width:400px;float:left;" class="allFixedPanels">DIV1</div><div style="width:400px;float:left;" class="detailsPanel">DIV2</div></div>',
        initializer: function () {
            this._eventHandles.push(
                this.on('*:swap', this.swap)
            );
        },
        swap: function (ev) {
            switch (ev.which) {
            case 'NewView':
                Y.use("newView",function(){
                          myView.setSwapView(new Y.NewView().render(),1);       
                      });
                break;
            case 'AnotherNewView':
                Y.use("anotherNewView",function(){
                          myView.setSwapView(new Y.AnotherNewView().render(),1);       
                      });
                break;
            }
        },
        _refresh: function () {
            this._contentBox.setHTML(this.template);
            this.setSwapContainer(this._contentBox.one('.variableContent'),1);
            this.setSwapContainer(this._contentBox.one('.allFixedPanels'),0);
            return this;
        }
    });

    var myView = new MyView();
    myView.render(Y.one('#mainContent'));
    Y.use("newView",function() {
              myView.setSwapView(new Y.NewView().render(),1);       
          });

    Y.all(".tabsa").on("click", function(e) {
        console.log(e);
        e.preventDefault();
        if (e.currentTarget.get('id') === 'tab1') {
            Y.use("clearView",function(){
                      myView.setSwapView(new Y.ClearView().render(),1);       
                  });
        }
        else if (e.currentTarget.get('id') === 'tab2') {
            Y.use("anotherNewView",function() {
                      myView.setSwapView(new Y.AnotherNewView().render(),1);       
                  });
        }
        else if (e.currentTarget.get('id') === 'tab3') {
            Y.use("newView",function() {
                      myView.setSwapView(new Y.NewView().render(),1);       
                  });
        }
        else if (e.currentTarget.get('id') === 'tab4') {
            Y.use("modalView",function() {
                      var oldModal = new Y.ModalView().render();
                  });
        }
        else if (e.currentTarget.get('id') === 'tab5') {
            Y.use("mypanelView", function() {
                      var pan = new Y.MyPanelView().render();
                  });
        }
        else if (e.currentTarget.get('id') === 'tab6') {
            Y.use("memsearchView" ,function() {
                      myView.setSwapView(new Y.MemSearchView().render(),1);
                  });
        }
        else if (e.currentTarget.get('id') === 'tab7') {
            Y.use("memberDetails" ,function() {
                      var myPan = new Y.MemberDetails().render();
                  });
        }
    });
});