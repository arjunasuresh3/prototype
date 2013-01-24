YUI.add('zeView-test', function (Y) {

var ArrayAssert  = Y.ArrayAssert,
    A       = Y.Assert,
    ObjectAssert = Y.ObjectAssert,
    CBX = 'contentBox',

    suite;


// -- View Suite ---------------------------------------------------------------
suite = new Y.Test.Suite('View');

// -- View: Lifecycle ----------------------------------------------------------
suite.add(new Y.Test.Case({
    name: 'Lifecycle',

    'contentBox should be a <div> node by default': function () {
        var view = new Y.ZeView(),
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
            }),

            a = new MyView();
        A.areSame(0, attachEvents, 'attachEvents() should not be called before the contentBox is retrieved');

        a.get(CBX);
        A.areSame(1, attachEvents, 'attachEvents() should be called the first time the contentBox is retrieved');

        a.get(CBX);
        A.areSame(1, attachEvents, 'attachEvents() should not be called more than once');
    },

    'events property should be an empty object by default': function () {
        var view = new Y.ZeView();

        A.isObject(view.events);
        A.isTrue(Y.Object.isEmpty(view.events));
    },

    'events with missing handler functions should not cause an error during destruction': function () {
        var view = new Y.ZeView({
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
        var view = new Y.ZeView({contentBoxTemplate: '<div class="my-contentBox"/>'});

        A.areSame('<div class="my-contentBox"/>', view.contentBoxTemplate);
        A.isUndefined(view.get('contentBoxTemplate'), 'contentBoxTemplate config should not become an ad-hoc attr');
    },

    'initializer should allow setting events at init': function () {
        var events = {
                '.foo': {
                    click: '_onFooClick'
                }
            },

            view = new Y.ZeView({events: events});

        ObjectAssert.ownsKey('.foo', view.events);
        A.areSame('_onFooClick', view.events['.foo'].click);
        A.isUndefined(view.get('events'), 'events config should not become an ad-hoc attr');
    },

    'initializer should allow setting a template at init': function () {
        var template = {},
            view     = new Y.ZeView({template: template});

        A.areSame(template, view.template);
        A.isUndefined(view.get('template'), 'template config should not become an ad-hoc attr');
    }


}));


// -- View: Methods ------------------------------------------------------------
suite.add(new Y.Test.Case({
    name: 'Methods',

    'remove() should remove the contentBox node from the DOM': function () {
        var view = new Y.ZeView();

        Y.one('body').append(view.get(CBX));
        A.isTrue(view.get(CBX).inDoc());

        view.remove();
        A.isFalse(view.get(CBX).inDoc());
    },

    'render() should be a chainable noop': function () {
        var view = new Y.ZeView();
        A.areSame(view, view.render());
    }
}));
    Y.Test.Runner.add(suite);

}, '@VERSION@', {
    requires: ['model', 'model-list', 'zeView', 'test']
});
