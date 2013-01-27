YUI.add('module-tests', function(Y) {

    var A = Y.Assert,
        suite = new Y.Test.Suite('modelsynczope');

    suite.add(new Y.Test.Case({
        name: 'Lifecycle',

        setUp: function () {
            Y.TestModel = Y.Base.create('customModel', Y.Model, [Y.ModelSync.Zope]);

            Y.TestModelList = Y.Base.create('testModelList', Y.ModelList, [Y.ModelSync.Zope], {
                model: Y.TestModel
            });
        },

        tearDown: function () {
            delete Y.TestModel;
            delete Y.TestModelList;
        },
        'test simple model load': function () {

            Y.io = function (url, config) {
                A.areEqual("rr?action=read&id=123", url);
                A.isUndefined(config.data);
                A.areEqual('GET', config.method);
                config.on.success.call(
                    config.context,
                    1,
                    '{"id":123,"fname":"Joe","lname":"Doe"}',
                    config['arguments']
                );
            };
            var m = new Y.TestModel({root:'rr', id: 123});
            A.isUndefined(m.get('fname'));
            A.isUndefined(m.get('lname'));
            A.areEqual(123, m.get('id'));
            A.isFalse(m.isNew());
            A.isFalse(m.isModified());
            m.load( function () {
                A.areEqual('Joe', m.get('fname'));
                A.areEqual('Doe', m.get('lname'));
                A.areEqual(123, m.get('id'));
                A.isFalse(m.isNew());
                A.isFalse(m.isModified());
            });

        },
        'test simple model list load': function () {

            Y.io = function (url, config) {
                A.areEqual("rr?action=read", url);
                A.isUndefined(config.data);
                A.areEqual('GET', config.method);
                config.on.success.call(
                    config.context,
                    1,
                    '[{"id":123,"fname":"Joe","lname":"Doe"},{"id":456,"fname":"John","lname":"Smith"}]',
                    config['arguments']
                );

            };
            var ml = new Y.TestModelList({root:'rr'});
            A.areEqual(0, ml.size());
            ml.load( function () {
                A.areEqual(2, ml.size());
                A.areEqual(123, ml.item(0).get('id'));
                A.areEqual('Joe', ml.item(0).get('fname'));
                A.areEqual('Doe', ml.item(0).get('lname'));
                A.areEqual(456, ml.item(1).get('id'));
                A.areEqual('John', ml.item(1).get('fname'));
                A.areEqual('Smith', ml.item(1).get('lname'));
            });

        },
        'test new model save': function () {
            Y.io = function (url, config) {
                A.areEqual("rr?action=create", url);
                A.areEqual('{"fname":"José","lname":"Pérez"}', config.data);
                A.areEqual('POST', config.method);
                config.on.success.call(
                    config.context,
                    1,
                    '{"id":123}',
                    config['arguments']
                );
            };
            var m = new Y.TestModel({root:'rr', fname: 'José', lname: 'Pérez'});
            A.isTrue(m.isNew(),'isNew before');
            A.isTrue(m.isModified(), 'isModified before');
            m.save( function () {
                A.areEqual('José', m.get('fname'));
                A.areEqual('Pérez', m.get('lname'));
                A.areEqual(123, m.get('id'));
                A.isFalse(m.isNew(), 'isNew after');
                A.isFalse(m.isModified(), 'isModified after');
            });

        },
        'test modified model save': function () {

            Y.io = function (url, config) {
                if (url === "rr?action=read&id=123" ) {
                    A.areEqual("rr?action=read&id=123", url);
                    A.isUndefined(config.data);
                    A.areEqual('GET', config.method);
                    config.on.success.call(
                        config.context,
                        1,
                        '{"id":123,"fname":"Joe","lname":"Doe"}',
                        config['arguments']
                    );
                } else {
                    A.areEqual("rr?action=update&id=123", url);
                    A.areEqual('{"id":123,"fname":"José","lname":"Pérez"}', config.data);
                    A.areEqual('POST', config.method);
                    config.on.success.call(
                        config.context,
                        1,
                        '{"id":123,"fname":"José","lname":"Pérez"}',
                        config['arguments']
                    );
                }
            };
            var m = new Y.TestModel({root:'rr', id: 123});
            A.isUndefined(m.get('fname'));
            A.isUndefined(m.get('lname'));
            A.areEqual(123, m.get('id'));
            A.isFalse(m.isNew());
            A.isFalse(m.isModified());
            m.load( function () {
                A.areEqual('Joe', m.get('fname'));
                A.areEqual('Doe', m.get('lname'));
                A.areEqual(123, m.get('id'));
                A.isFalse(m.isNew());
                A.isFalse(m.isModified());
                m.set('fname', 'José');
                m.set('lname', 'Pérez');
                m.save(function () {
                    A.areEqual('José', m.get('fname'));
                    A.areEqual('Pérez', m.get('lname'));
                    A.areEqual(123, m.get('id'));

                });
            });

        },
        'test model delete': function () {

            Y.io = function (url, config) {
                if (url === "rr?action=read&id=123") {
                    A.areEqual("rr?action=read&id=123", url);
                    A.isUndefined(config.data);
                    A.areEqual('GET', config.method);
                    config.on.success.call(
                        config.context,
                        1,
                        '{"id":123,"fname":"Joe","lname":"Doe"}',
                        config['arguments']
                    );
                } else {
                    A.areEqual('rr?remove=true&action=delete&id=123', url);
                    A.isUndefined(config.data);
                    A.areEqual('GET', config.method);
                    config.on.success.call(
                        config.context,
                        1,
                        '',
                        config['arguments']
                    );
                }
            };
            var m = new Y.TestModel({root:'rr', id: 123});
            A.isUndefined(m.get('fname'));
            A.isUndefined(m.get('lname'));
            A.areEqual(123, m.get('id'));
            A.isFalse(m.isNew());
            A.isFalse(m.isModified());
            m.load( function () {
                A.areEqual('Joe', m.get('fname'));
                A.areEqual('Doe', m.get('lname'));
                A.areEqual(123, m.get('id'));
                A.isFalse(m.isNew());
                A.isFalse(m.isModified());
                m.destroy({remove:true});
            });

        },
        'test failed model load': function () {

            Y.io = function (url, config) {
                A.areEqual("rr?action=read&id=123", url);
                A.isUndefined(config.data);
                A.areEqual('GET', config.method);
                config.on.failure.call(
                    config.context,
                    1,
                    {
                        status:500,
                        statusText:'server error'
                    },
                    config['arguments']
                );
            };
            var m = new Y.TestModel({root:'rr', id: 123});
            m.load( function (err) {
                A.areEqual(500, err.code);
                A.areEqual('server error', err.msg);
            });

        }


    }));

    Y.Test.Runner.add(suite);


},'', {
    requires: [ 'test', 'model', 'model-list', 'base-build' ,'model-sync-zope']
});
