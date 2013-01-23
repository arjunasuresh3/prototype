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
        template: '<p border="1">This is the fixed div container, next comes the variable part:</p><div class="variableContent"></div><div class="mainPanels"></div><div class="modalPanels"></div><div class="allPanels"></div>',
        initializer: function () {
            this._eventHandles.push(
                this.on('*:swap', this.swap)
            );
        },
        swap: function (ev) {
            switch (ev.which) {
            case 'NewView':
                Y.use("newView",function(){
                          myView.setSwapView(new Y.NewView(),1);       
                      });
                break;
            case 'AnotherNewView':
                Y.use("anotherNewView",function(){
                          myView.setSwapView(new Y.AnotherNewView(),1);       
                      });
                break;
            }
        },
        _render: function (container) {
            container.setHTML(this.template);
            this.setSwapContainer(container.one('.allPanels'),0);
            this.setSwapContainer(container.one('.variableContent'),1);
            this.setSwapContainer(container.one('.mainPanels'),2);
            this.setSwapContainer(container.one('.modalPanels'),3);
        }
    });

    var myView = new MyView();
    myView.render(Y.one('#mainContent'));
    Y.use("newView",function(){
              myView.setSwapView(new Y.NewView(),1);       
          });

    Y.all(".tabsa").on("click", function(e) {
        console.log(e);
        e.preventDefault();
        if (e.currentTarget._node.id === 'tab1') {
            Y.use("clearView",function(){
                      myView.setSwapView(new Y.ClearView(),1);       
                      // myView.setSwapView(new Y.ClearView({template:''}),2);       
                      // myView.setSwapView(new Y.ClearView({template:''}),3);       
                  });
        }
        else if (e.currentTarget._node.id === 'tab2') {
            Y.use("anotherNewView",function(){
                      myView.setSwapView(new Y.AnotherNewView(),1);       
                  });
        }
        else if (e.currentTarget._node.id === 'tab3') {
            Y.use("newView",function(){
                      myView.setSwapView(new Y.NewView(),1);       
                  });
        }
        else if (e.currentTarget._node.id === 'tab4') {
            Y.use("modalView",function(){
                      var oldModal = myView.getSwapView(3);
                      if(oldModal === undefined) {
                          var mod = new Y.ModalView();
                          myView.setSwapView(mod,3);
                      }
                      else {
                          oldModal.regmodals[0].show();                          
                      }
                  });
        }
        else if (e.currentTarget._node.id === 'tab5') {
            Y.use("mypanelView", function() {
                      var oldPanel = myView.getSwapView(2);
                      if(oldPanel === undefined) {
                          var pan = new Y.MyPanelView();
                          myView.setSwapView(pan,2);
                      }
                      else {
                          oldPanel.regpanels[0].show();                          
                      }
                  });
        }
        else if (e.currentTarget._node.id === 'tab6') {
            Y.use("memsearchView" ,function() {
                      myView.setSwapView(new Y.MemSearchView(),1);
                  });
        }
        else { 
            Y.use("multipleTabs" ,function() {
                      myView.setSwapView(new Y.MultipleTabs(),0);
                  });
        }
    });
});