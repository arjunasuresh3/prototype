var CS = function () {},
    isFn = Y.Lang.isFunction,
    each = Y.Array.each;


CS.prototype = {
    _swapContainer: null,
    _swapView: null,
    initializer: function () {
        this._swapContainer = [];
        this._swapView = [];
        this._eventHandles.push(
            this.after('destroy', this._beforeDestroy)
        );
    },
    setSwapContainer: function (container, index) {
        index = index || 0;
        var prev = this._swapContainer[index],
            view = this._swapView[index];
        this._swapContainer[index] = container;
        if (view) {
            if (container) {
                container.setHTML(view.get('contentBox'));
            } else {
                prev.setHTML('');
            }
        }
        return this;
    },
    getSwapContainer: function (index) {
        return this._swapContainer[index || 0];
    },
    setSwapView: function (view, index) {
        index = index || 0;
        var container = this._swapContainer[index];
        if (view === null || (isFn(view.render) && isFn(view.destroy))) {
            this._swapView[index] = view;
            if (view) {
                container.setHTML(view.get('contentBox'));
                view.addTarget(this);
            } else {
                container.setHTML('');
            }
        }
        return this;
    },
    getSwapView: function (index) {
        return this._swapView[index || 0];
    },
    _beforeDestroy: function () {
        each(this._swapView, function (view) {
            view.destroy();
        });
    }

};
Y.ContentSwapper = CS;