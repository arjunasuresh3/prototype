YUI.add('zeView-test', function (Y) {

var A       = Y.Assert,
    ObjectAssert = Y.ObjectAssert,
    CBX = 'contentBox',

    suite,
    view, cbx;


// -- View Suite ---------------------------------------------------------------
suite = new Y.Test.Suite('View');

// -- View: Lifecycle ----------------------------------------------------------
suite.add(new Y.Test.Case({
    name: 'Lifecycle',
    tearDown: function () {
        if (view) {
            view.destroy();
        }
    },
    'contentBox should be a <div> node by default': function () {
        view = new Y.ZeView();
        cbx = view.get(CBX);

        A.isInstanceOf(Y.Node, cbx);
        A.areSame('div', cbx.get('tagName').toLowerCase());
        A.isTrue(cbx.hasClass('ze-view-zeView'));
        A.isFalse(cbx.inDoc());
        A.areEqual('',cbx.getHTML());

    },

    'default contentBox should be created lazily': function () {
        var attachEvents = 0,

            MyView = Y.Base.create('myView', Y.ZeView, [], {
                _attachEvents: function () {
                    attachEvents += 1;
                    return Y.ZeView.prototype._attachEvents.apply(this, arguments);
                }
            });

        view = new MyView();
        A.areSame(0, attachEvents, 'attachEvents() should not be called before the contentBox is retrieved');

        view.get(CBX);
        A.areSame(1, attachEvents, 'attachEvents() should be called the first time the contentBox is retrieved');

        view.get(CBX);
        A.areSame(1, attachEvents, 'attachEvents() should not be called more than once');
    },

    'events property should be an empty object by default': function () {
        view = new Y.ZeView();

        A.isObject(view.events);
        A.isTrue(Y.Object.isEmpty(view.events));
    },

    'events with missing handler functions should not cause an error during destruction': function () {
        view = new Y.ZeView({
            events: {
                '.foo': {click: 'missingHandlerFn'}
            }
        });

        // Cause events to be attached.
        view.get(CBX);

        A.areSame(0, view._eventHandles.length, 'Event was attached but is missing a handler function.');

        view.destroy();
    },

    'initializer should allow setting a contentBoxTemplate at init': function () {
        view = new Y.ZeView({contentBoxTemplate: '<div class="my-contentBox"/>'});

        A.areSame('<div class="my-contentBox"/>', view.contentBoxTemplate);
        A.isUndefined(view.get('contentBoxTemplate'), 'contentBoxTemplate config should not become an ad-hoc attr');
    },

    'initializer should allow setting events at init': function () {
        var events = {
                '.foo': {
                    click: '_onFooClick'
                }
            };

        view = new Y.ZeView({events: events});

        ObjectAssert.ownsKey('.foo', view.events);
        A.areSame('_onFooClick', view.events['.foo'].click);
        A.isUndefined(view.get('events'), 'events config should not become an ad-hoc attr');
    },

    'initializer should allow setting a template at init': function () {
        var template = {};
        view     = new Y.ZeView({template: template});

        A.areSame(template, view.template);
        A.isUndefined(view.get('template'), 'template config should not become an ad-hoc attr');
    }


}));


// -- View: Methods ------------------------------------------------------------
suite.add(new Y.Test.Case({
    name: 'Methods',
    tearDown: function () {
        if (view) {
            view.destroy();
        }
    },

    'remove() should remove the contentBox node from the DOM': function () {
        view = new Y.ZeView();

        Y.one('body').append(view.get(CBX));
        A.isTrue(view.get(CBX).inDoc());

        view.remove();
        A.isFalse(view.get(CBX).inDoc());
    },

    'render() should be a chainable noop': function () {
        view = new Y.ZeView();
        A.areSame(view, view.render());
    },
    'view without model should render the raw template': function () {
        view = new Y.ZeView({template: 'hello'}).render('#test');
        A.areEqual('hello', Y.one('#test .ze-view-zeView').getHTML());
    },
    'view with model should render formatted': function () {
        view = new Y.ZeView({
            template: 'a is {a}, b is {b} and c should remain {c}',
            model: new Y.Model({
                a:1,
                b:2
            })
        }).render('#test');
        A.areEqual('a is 1, b is 2 and c should remain {c}', Y.one('#test .ze-view-zeView').getHTML());

    },
    'view with formatters': function () {
        view = new Y.ZeView({
            template: 'date: {date}, bool: {bool}',
            model: new Y.Model({
                date: new Date(2012, 11, 8),
                bool:2
            })
        });
        view.formatters = {
            date: function (value) {
                return Y.Date.format(value);
            },
            bool: function (value) {
                return (value ? 'yes' : 'no');
            }

        };
        view.render('#test');
        A.areEqual('date: 2012-12-08, bool: yes', Y.one('#test .ze-view-zeView').getHTML());

    },
    'replacing content': function () {
        Y.one('#test').setHTML('existing');
        view = new Y.ZeView({
            template: 'content'
        }).render('#test');
        A.areEqual('<div class="ze-view-zeView">content</div>', Y.one('#test').getHTML());

    },
    'explicitly replacing content': function () {
        Y.one('#test').setHTML('existing');
        view = new Y.ZeView({
            template: 'content'
        }).render('#test', 'replace');
        A.areEqual('<div class="ze-view-zeView">content</div>', Y.one('#test').getHTML());

    },
    'appending to content': function () {
        Y.one('#test').setHTML('existing');
        view = new Y.ZeView({
            template: 'content'
        }).render('#test', 'append');
        A.areEqual('existing<div class="ze-view-zeView">content</div>', Y.one('#test').getHTML());

    },
    'inserting before content': function () {
        Y.one('#test').setHTML('existing');
        view = new Y.ZeView({
            template: 'content'
        }).render('#test', 'insert');
        A.areEqual('<div class="ze-view-zeView">content</div>existing', Y.one('#test').getHTML());

    },
    'inserting at 0': function () {
        Y.one('#test').setHTML('existing');
        view = new Y.ZeView({
            template: 'content'
        }).render('#test', 0);
        A.areEqual('<div class="ze-view-zeView">content</div>existing', Y.one('#test').getHTML());

    }
}));
    Y.Test.Runner.add(suite);

}, '@VERSION@', {
    requires: ['model', 'model-list', 'zeView', 'test', 'datatype-date-format']
});
