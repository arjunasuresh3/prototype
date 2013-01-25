/**
 * Extension to allow swapping of child views within sections of a parent view
 *
 * @module contentSwapper
 */

/**
 * View extension to allow swapping other views into designated containers
 * within the host view.
 *
 * @class ContentSwapper
 */
var CS = function () {},
    isFn = Y.Lang.isFunction,
    isStr = Y.Lang.isString,
    each = Y.Array.each;


CS.prototype = {
    /**
     * Array containing the references to the containers where child views
     * can be swapped in.
     * @property _swapContainer
     * @type [Node]
     * @private
     */
    _swapContainer: null,

    /**
     * Array of child views to be shown in the given containers
     * @property _swapView
     * @type [ZeView]
     * @private
     */

    _swapView: null,
    /**
     * Lifecycle method
     * @method initializer
     * @protected
     */
    initializer: function () {
        this._swapContainer = [];
        this._swapView = [];
        this._eventHandles.push(
            this.on('destroy', this._beforeDestroy)
        );
    },

    /**
     * Sets the container where other views can be swapped into.
     * @method setSwapContainer
     * @param container {String | Node | null} Node reference or CSS selector of the container
     * @param [index=0] {Integer | String} Index or identifier to use to refer to this container
     * @chainable
     */
    setSwapContainer: function (container, index) {
        index = index || 0;
        if (isStr(container)) {
            container = this._contentBox.one(container);
        }
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
    /**
     * Returns a reference to a container
     * @method getSwapContainer
     * @param [index=0] {Integer | String} Index or identifier used when setting the container
     * @return {Node} Node where content can be swapped in or `null` if none
     */
    getSwapContainer: function (index) {
        return this._swapContainer[index || 0] || null;
    },

    /**
     * Sets the view to be displayed at the container of the given index
     * @method setSwapView
     * @param view {ZeView | null} view to be swapped in
     * @param [index=0] {Integer | String} Index or identifier of the
     * container where this view is to be shown
     * @chainable
     */
    setSwapView: function (view, index) {
        index = index || 0;
        var container = this._swapContainer[index];
        if (!view || (isFn(view.render) && isFn(view.destroy))) {
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

    /**
     * Returns the view in a particular container
     * @method getSwapView
     * @param [index=0] {Integer | String} Index or identifier of the container of the view
     * @return {ZeView} the view container or `null` of none
     */
    getSwapView: function (index) {
        return this._swapView[index || 0] || null;
    },

    /**
     * Destroys the views contained within when this view is destroyed.
     * @method _beforeDestroy
     * @private
     */
    _beforeDestroy: function () {
        each(this._swapView, function (view) {
            if (view) {
                view.destroy();
            }
        });
    }

};
Y.ContentSwapper = CS;