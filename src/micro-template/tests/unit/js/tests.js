YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('micro-template');

    var MyView = Y.Base.create('myView', Y.ZeView, [Y.MicroTemplate], {
        template: '<h1>Animals</h1>' +
            '<ul class="<%= this.classNames.list %>">' +
              '<% Y.Array.each(this.animals, function (animal, i) { %>' +
                '<li class="<% i % 2 ? "odd" : "even" %>">' +
                    '<%= animal %>' +
                '</li>' +
              '<% }); %>' +
            '</ul>'
    });
    suite.add(new Y.Test.Case({
        name: 'Automated Tests',
        setUp: function () {

        },
        'test rendering': function() {
               var view = new MyView({
                    model: new Y.Model({
                        classNames: {list: 'animals'},

                        animals: [
                            'Rhino',
                            'Plain Tiger butterfly',
                            'Spotted Cuscus'
                        ]
                    })
               }).render('#container');
            Y.Assert.areEqual('<h1>Animals</h1><ul class="animals"><li class="">Rhino</li><li class="">Plain Tiger butterfly</li><li class="">Spotted Cuscus</li></ul>', Y.one('#container .ze-view-myView').getHTML());
            view.destroy({remove:true});
        }
    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'test','zeView','model','micro-template' ] });
