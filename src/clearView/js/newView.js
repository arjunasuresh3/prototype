var NewView = Y.Base.create('newView',Y.ZeView, [], {
                                template: "Click Me NewView<button id='btn1' type='button'>Click Me NewView!</button><div class='innerContainer'></div>",
                                events: {
                                    button: {
                                        click: function () {
                                            this.fire('swap', { which: 'AnotherNewView',
                                                                view: this});
                                        }
                                    }
                                },
                                _refresh:  function () {
                                    this._contentBox.setHTML(this.template);
                                    var table = new Y.DataTable({
                                                                    columns: ['id', 'name','price','cost'],
                                                                    data: [
                                                                        { id: "ga-3475", name: "gadget",   price: "$6.99", cost: "$5.99" },
                                                                        { id: "sp-9980", name: "sprocket", price: "$3.75", cost: "$3.25" },
                                                                        { id: "wi-0650", name: "widget",   price: "$4.25", cost: "$3.75" }
                                                                    ]
                                                                });
                                    table.render(this._contentBox.one('.innerContainer'));
                                    // this.setSwapContainer(this._contentBox.one('.innerContainer'),2);
                                    // this.setSwapView(table,2);
                                    this._destroyOnExit.push(table);
                                    return this;
                                }
                            });

Y.NewView = NewView;