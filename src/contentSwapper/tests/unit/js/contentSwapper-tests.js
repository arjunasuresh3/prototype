YUI.add('contentSwapper-tests', function(Y) {
    var TMPL1 = 'Swap View 1 <button>swap</button>',
        TMPL2 = 'Swap View 2 <button>swap</button>';


    var SwapView1 = Y.Base.create('myView1', Y.ZeView, [], {
        template: TMPL1,
        events: {
            button: {
                click: function () {
                    this.fire('swap', {
                        which: 'SwapView2',
                        view: this
                    })
                }
            }
        }
    });

    var SwapView2 = Y.Base.create('myView2', Y.ZeView, [], {
        template: TMPL2,
        events: {
            button: {
                click: function () {
                    this.fire('swap', {
                        which: 'SwapView1',
                        view: this
                    })
                }
            }
        }
    });


    var MyView = Y.Base.create('myView', Y.ZeView, [Y.ContentSwapper], {
        template: '<p>This is the fixed content, next comes the variable part: <div class="variableContent"></div></p>',
        initializer: function () {
            this._eventHandles.push(
                this.on('*:swap', this.swap)
                );
        },
        swap: function (ev) {
            switch (ev.which) {
                case 'SwapView1':
                    this.setSwapView(new SwapView1().render());
                    break;
                case 'SwapView2':
                    this.setSwapView(new SwapView2().render());
                    break;

            }
        },
        _refresh: function () {
            MyView.superclass._refresh.call(this);
            this.setSwapContainer(this._contentBox.one('.variableContent'));
        }
    });

    var MyMultiView = Y.Base.create('myView', Y.ZeView, [Y.ContentSwapper], {
        template: '<p>This is the fixed content, next comes the variable part: <div class="variableContent1"></div><div class="variableContent2"></div></p>',
        initializer: function () {
            this._eventHandles.push(
                this.on('*:swap', this.swap)
                );
        },
        swap: function (ev) {
            var vc = ev.view.get('contentBox'),
            index = (vc === this.get('contentBox').one('.variableContent1 div')?1:2);


            switch (ev.which) {
                case 'SwapView1':
                    this.setSwapView(new SwapView1().render(),index);
                    break;
                case 'SwapView2':
                    this.setSwapView(new SwapView2().render(), index);
                    break;

            }
        },
        _refresh: function () {
            MyView.superclass._refresh.call(this);
            this.setSwapContainer(this._contentBox.one('.variableContent1'),1);
            this.setSwapContainer(this._contentBox.one('.variableContent2'),2);
        }
    });

    var myView,
        A = Y.Assert,
        suite = new Y.Test.Suite("Content Swapper Test Suite");

    suite.add(new Y.Test.Case({
        name: 'Content Swapper',
        setUp: function () {
            myView = new MyView().render('#container1');
        },
        tearDown: function () {
            myView.destroy();
            Y.one('#container1').setHTML('');
            Y.one('#container2').setHTML('');
        },
        'initial content, single': function () {


            A.areEqual('', Y.one('.variableContent').getHTML(), 'Initially it should be empty');

            myView.setSwapView(new SwapView1().render());
            A.isTrue(Y.one('.variableContent div').hasClass('ze-view-myView1'));
            A.areEqual(TMPL1, Y.one('.variableContent .ze-view-myView1').getHTML(), 'Then it should be Swap View 1');

            myView.setSwapView(new SwapView2().render());

            A.isTrue(Y.one('.variableContent div').hasClass('ze-view-myView2'));
            A.areEqual(TMPL2, Y.one('.variableContent .ze-view-myView2').getHTML(), 'Finally it should be Swap View 2');

        },
        'swapping container, single': function () {


            var sv = new SwapView1().render();

            myView.setSwapView(sv);
            A.areEqual(TMPL1, Y.one('#container1 .variableContent .ze-view-myView1').getHTML(),'It should be Swap View 1');
            A.areSame(Y.one('#container1 .variableContent .ze-view-myView1'), sv.get('contentBox'), 'The contentBox of the view should point to it')

            myView.setSwapContainer(Y.one('#container2'));

            A.areEqual(TMPL1, Y.one('#container2 .ze-view-myView1').getHTML());
            A.areEqual('', Y.one('#container1 .variableContent').getHTML());
            A.areSame(Y.one('#container2 .ze-view-myView1'), sv.get('contentBox'), 'The contentBox of the view should point to the new container')

        },
        'test clicking': function () {
            myView.setSwapView(new SwapView1().render());
            A.areEqual(TMPL1, Y.one('.variableContent .ze-view-myView1').getHTML(), 'It should be Swap View 1');

            Y.one('.variableContent button').simulate('click');
            A.areEqual(TMPL2, Y.one('.variableContent .ze-view-myView2').getHTML(), 'Now it should be Swap View 2');

            Y.one('.variableContent button').simulate('click');
            A.areEqual(TMPL1, Y.one('.variableContent .ze-view-myView1').getHTML(), 'Now it should be Swap View 1 again');


        }
    }));
    suite.add(new Y.Test.Case({
        name: 'Multi Content Swapper',
        setUp: function () {
            myView = new MyMultiView().render('#container1');
        },
        tearDown: function () {
            myView.destroy();
            Y.one('#container1').setHTML('');
            Y.one('#container2').setHTML('');
        },
        'initial content, multi': function () {


            A.areEqual('', Y.one('.variableContent1').getHTML(), 'Initially it should be empty');
            A.areEqual('', Y.one('.variableContent2').getHTML(), 'Initially it should be empty as well');

            myView.setSwapView(new SwapView1().render(),1);
            A.areEqual(TMPL1, Y.one('.variableContent1 .ze-view-myView1').getHTML(), 'Then it should be Swap View 1');

            myView.setSwapView(new SwapView2().render(),2);
            A.areEqual(TMPL2, Y.one('.variableContent2 .ze-view-myView2').getHTML(), 'Then it should be Swap View 2');

            myView.setSwapView(new SwapView2().render(),1);
            A.areEqual(TMPL2, Y.one('.variableContent1 .ze-view-myView2').getHTML(), 'Finally it should be Swap View 2');

            myView.setSwapView(new SwapView1().render(),2);
            A.areEqual(TMPL1, Y.one('.variableContent2 .ze-view-myView1').getHTML(), 'Finally it should be Swap View 1');

        },
        'swapping container, multi': function () {


            var sv = new SwapView1().render();

            myView.setSwapView(sv,1);
            A.areEqual(TMPL1, Y.one('#container1 .variableContent1 .ze-view-myView1').getHTML(),'It should be Swap View 1');
            A.areSame(Y.one('#container1 .variableContent1 .ze-view-myView1'), sv.get('contentBox'), 'The contentBox of the view should point to it')

            myView.setSwapContainer(Y.one('#container2'),1);

            A.areEqual(TMPL1, Y.one('#container2 .ze-view-myView1').getHTML(), 'contents should have moved');
            A.areEqual('', Y.one('#container1 .variableContent1').getHTML(), 'original should be empty');
            A.areSame(Y.one('#container2 .ze-view-myView1'), sv.get('contentBox'), 'The contentBox of the view should point to the new container')

        },
        'test clicking multi': function () {
            myView.setSwapView(new SwapView1().render(),1);
            A.areEqual(TMPL1, Y.one('.variableContent1 .ze-view-myView1').getHTML(), 'It should be Swap View 1');

            myView.setSwapView(new SwapView2().render(),2);
            A.areEqual(TMPL2, Y.one('.variableContent2 .ze-view-myView2').getHTML(), 'It should be Swap View 2');

            Y.one('.variableContent1 button').simulate('click');
            A.areEqual(TMPL2, Y.one('.variableContent1 .ze-view-myView2').getHTML(), 'Now it should be Swap View 2');

            Y.one('.variableContent1 button').simulate('click');
            A.areEqual(TMPL1, Y.one('.variableContent1 .ze-view-myView1').getHTML(), 'Now it should be Swap View 1 again');


        }
    }));
    Y.Test.Runner.add(suite);
},'', { requires: ['zeView','contentSwapper','test','test-console','node-event-simulate', 'base-build' ] });