var tmplpage = '<fieldset>\
                  <legend>Multiple Tabs</legend>\
                </fieldset>'
               + '<fieldset class="resultsfieldset" style="display:none;"><div align="center" class="results">\
               </div></fieldset>';
                
  Y.Mytabs = Y.Base.create('myTabs', Y.ZeView, [Y.ContentSwapper], {
    containerTemplate: '<div id="testmvc"></div>',
    events: {
      '[name=search]': {click: 'search'},
      '.ze-calendar': {
        // 'focus': 'showcal'
        //,'blur': 'hidecal'
      }
    },
    template: tmplpage,
    initializer: function (cfg) {
      // initializing of views
        this._tables = [];
    },
    _render: function(container) {
      container.setHTML(this.template);
      this.setSwapContainer(container.one('.results'),0);

      Y.one('#ac-input').plug(Y.Plugin.AutoComplete, {
        source: 'select * from search.suggest where query="{query}"',
        yqlEnv: 'http://pieisgood.org/yql/tables.env'
      });
    },
    showcal: function (ev) {
      var oReg = ev.target.get('region');
      YUI.Ze.calendar.show();
      YUI.Ze.calendar.get('boundingBox').setXY([oReg.left,oReg.bottom]);
    },
    hidecal: function () {
      YUI.Ze.calendar.hide();
    },
    search: function (ev) {
      ev.halt();
      var fs = Y.all('#pat_search input[type=text],#pat_search select,#pat_search input[type=file]'), qs={};
      fs.each(function (f) {
        var val = f.get('value');
        if (val) {
          qs[f.get('name')] = val;
        }
      });
        console.log("asd");
      var _this = this;
      Y.use('model-list-zope','modelsyncZope', function () {
        var MyM = Y.Base.create('MyM', Y.ModelListZope, [Y.ModelSync.Zope], {
                                    root: '/memresults'
                                }),
        ml = new MyM();
        ml.save(qs,function (error, resp) {
                    Y.use('datatable',function() {
                              var table = new Y.DataTable({
                                                              columns: ['MemberId', 'Name', 'DOB'],
                                                              data: Y.JSON.parse(resp.responseText)
                                                          });
                              table.on('render',function (ev) {
                                           Y.one('.resultsfieldset').setStyle('display','');
                                       });
                              _this.setSwapView(table,0);
                              _this._tables.push(table);
                          });
                });
      });
    },
    destroy: function () {
      Y.one('#ac-input').destroy();
      Y.Array.each(this.tables,function(tab) {
                       tab.destroy();
                   });
    }
  });