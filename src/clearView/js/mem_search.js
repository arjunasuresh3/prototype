var tmplpage = '<fieldset>\
                  <legend>Member Search</legend>\
                  <form name="pat_search" id="pat_search" enctype="multipart/form-data">\
                    <div id="demo" class="yui3-g">\
                      <div class="yui3-u-1-4 label">\
                        <label for="ac-input">Name:</label>\
                      </div>\
                      <div class="yui3-u-1-4">\
                        <input id="ac-input" name="memname" type="text" formvalidator:FormField="yes" formvalidator:Type="TextBaseField">\
                      </div>\
                      <div class="yui3-u-1-4 label">\
                        <label for="dob-input">DOB:</label>\
                      </div>\
                      <div class="yui3-u-1-4">\
                        <input id="dob-input" name="dob" class="ze-calendar" type="text">\
                      </div>\
                      <div class="yui3-u-1-4 label">\
                        <label for="member-id">Member Id:</label>\
                      </div>\
                      <div class="yui3-u-1-4">\
                        <input id="member-id" name="memid" type="text">\
                      </div>\
                      <div class="yui3-u-1-4 label">\
                        <label for="member-type">Member Type:</label>\
                      </div>\
                      <div class="yui3-u-1-4">\
                        <select id="member-type" name="memtype">\
                          <option value="">-- Select -- </option>\
                          <option value="1">Id</option>\
                          <option value="2">SSN</option>\
                        </select>\
                      </div>\
                    </div>\
                    <div style="clear:both"></div>\
                    <div align="center">\
                      <input type="submit" name="search" value="Search"/>\
                    </div>\
                  </form>\
                </fieldset>'
               + '<fieldset class="resultsfieldset" style="display:none;"><div align="center" class="results">\
               </div></fieldset>';
                
  Y.MemSearchView = Y.Base.create('memsearchView', Y.ZeView, [Y.ContentSwapper], {
    containerTemplate: '<div id="testmvc"></div>',
    events: {
      '[name=search]': {click: 'search'},
      '*.ze-calendar': {
        'focus': 'showcal'
      }
    },
    template: tmplpage,
    initializer: function (cfg) {
      // initializing of views
        this._tables = [];
    },
    _refresh: function() {
        this._contentBox.setHTML(this.template);
        this.setSwapContainer(this._contentBox.one('.results'),0);
        this._contentBox.one('#ac-input').plug(Y.Plugin.AutoComplete, {
                                                   source: 'select * from search.suggest where query="{query}"',
                                                   yqlEnv: 'http://pieisgood.org/yql/tables.env'
                                               });
    },
    showcal: function (ev) {
        YUI.Ze.calendar.showUnder(ev.target);
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
      var _this = this;
      Y.use('model-list-zope','modelsyncZope', function () {
        var MemberModelList = Y.Base.create('MemberModelList', Y.ModelListZope, [Y.ModelSync.Zope], {
                                    root: '/memresults'
                                }),
        ml = new MemberModelList();
        ml.save(qs,function (error, resp) {
                    Y.use('datatable',function() {
                              var table = new Y.DataTable({
                                                              columns: [
                                                                  {   key: 'MemberId',   label: 'Member Id' },
                                                                  {   key: 'Name',  label: 'Member Name' },
                                                                  {   key: 'DOB', label: 'Date Of Birth' },
                                                                  {   key:        'select',
                                                                      allowHTML:  true, // to avoid HTML escaping
                                                                      label: 'Actions'
                                                                      // default:      '<button class="mbrModify" type="button">Modify</button>',
                                                                      // emptyCellValue: '<button class="mbrModify" type="button">Modify</button>'
                                                                  }
                                                              ],
                                                              data: Y.JSON.parse(resp.responseText)
                                                          });
                              
                              table.delegate("click", function(e) {
                                                 // alert the modify row
                                                 var rowId = e.target.getAttribute('cellVal');
                                                 alert(rowId);
                                             }, ".yui3-datatable-data .yui3-datatable-col-select button", table);

                              table.on('render', function (ev) {
                                           Y.one('.resultsfieldset').setStyle('display','');
                                       });
                              _this.setSwapView(table.render(),0);
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