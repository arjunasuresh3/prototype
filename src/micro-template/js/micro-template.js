/**
 * Extension to use Y.Template.Micro to render templates in views.
 *
 * @module micro-template
 */
/**
 * Extension to `Y.View` to use Y.Micro.Template to process templates
 * instead of plain placeholder substitution.
 * @class MicroTemplate
 */

var MT = function () {};

MT.prototype = {
    /**
    Lifecycle method.
    Compiles any templates found in `this.template` using `Y.Template.Micro`.
    @method initializer
    @private
    */
    initializer: function () {
        var compiler = new Y.Template();
        switch (Y.Lang.type(this.template)) {
            case 'string':
                this._compiledTemplate = compiler.compile(this.template);
                break;
            case 'function':
                this._compiledTemplate = this.template;
                break;
        }

    },
    /**
    Renders the content of the `contentBox` using the precompiled template.

    If there are formatting functions set up in the `formatters` hash it will apply
    those formatters to the fields before doing the substitution.

    Classes inheriting from ZeView may override this method to insert into the
    contentBox the elements they need.

    @method _refresh
    @protected
    @chainable
    */

    _refresh: function () {
        var cbx = this._contentBox,
            m = this.get('model'),
            f = this.formatters || {},
            values;
        if (cbx) {
            if (m) {
                values = m.toJSON();
                Y.Object.each(f, function (fn, field) {
                    values[field] = fn.call(this, values[field], m);
                }, this);
                cbx.setHTML(this._compiledTemplate(values));
            } else {
                cbx.setHTML(this._compiledTemplate());
            }
        }
        return this;
    }
};
Y.MicroTemplate = MT;
