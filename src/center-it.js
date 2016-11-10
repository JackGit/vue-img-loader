module.exports = CenterIt;

function CenterIt(containerWidth, containerHeight, itemWidth, itemHeight, options) {

    var defaultOptions = {
        /**
         * @option
         * @name type
         * @type String
         * @description 'contain': container contains the item; 'cover': item covers the container
         */
        type: 'contain'
    };

    for(var p in defaultOptions)
        if(options[p])
            defaultOptions[p] = options[p];

    this.options = defaultOptions;

    this._cWidth = containerWidth;
    this._cHeight = containerHeight;
    this._iWidth = itemWidth;
    this._iHeight = itemHeight;

    this._offset = {
        top: 0,
        left: 0
    };

    this._newHeight = 0;
    this._newWidth = 0;
    this._ratio = 1;

    switch(this.options.type) {
        case 'contain':
            this._containCenter();
            break;
        case 'cover':
            this._coverCenter();
            break;
    }
}

CenterIt.prototype = {

    constructor: CenterIt,

    /**
     * @method
     * @private
     * @name _coverCenter
     * @description do the center calculation for COVER type center.
     */
    _coverCenter: function() {

        var itemRatio = this._iWidth / this._iHeight;
        var containerRatio = this._cWidth / this._cHeight;
        var r = 1;

        if(itemRatio > containerRatio) { // left offset required
            r = this._cHeight / this._iHeight;

            this._newWidth = this._iWidth * r;
            this._newHeight = this._iHeight * r;
            this._offset = {
                top: 0,
                left: (this._newWidth - this._cWidth) / (-2)
            };

        } else if(itemRatio < containerRatio) { // top offset required
            r = this._cWidth / this._iWidth;

            this._newWidth = this._iWidth * r;
            this._newHeight = this._iHeight * r;
            this._offset = {
                top: (this._newHeight - this._cHeight) / (-2),
                left: 0
            };
        } else {
            r = this._cWidth / this._iWidth;

            this._newWidth = this._iWidth * r;
            this._newHeight = this._iHeight * r;
            this._offset = {
                top: 0,
                left: 0
            };
        }

        this._ratio = r;
    },

    /**
     * @method
     * @private
     * @name _containCenter
     * @description do the center calculation for CONTAIN type center.
     */
    _containCenter: function() {

        var itemRatio = this._iWidth / this._iHeight;
        var containerRatio = this._cWidth / this._cHeight;
        var r = 1;

        if(itemRatio > containerRatio) { // top offset required
            r = this._cWidth / this._iWidth;

            this._newWidth = this._iWidth * r;
            this._newHeight = this._iHeight * r;
            this._offset = {
                top: (this._cHeight - this._newHeight) / 2,
                left: 0
            };

        } else if(itemRatio < containerRatio) { // left offset required
            r = this._cHeight / this._iHeight;

            this._newWidth = this._iWidth * r;
            this._newHeight = this._iHeight * r;
            this._offset = {
                top: 0,
                left: (this._cWidth - this._newWidth) / 2
            };
        } else {
            r = this._cHeight / this._iHeight;

            this._newWidth = this._iWidth * r;
            this._newHeight = this._iHeight * r;
            this._offset = {
                top: 0,
                left: 0
            };
        }

        this._ratio = r;
    },

    /**
     * @method
     * @public
     * @name ratio
     * @description return ratio of newWidth / oldWidth (or newHeight / oldHeight)
     * @returns {number}
     */
    ratio: function() {
        return this._ratio;
    },

    /**
     * @method
     * @public
     * @name offset
     * @description return offset of centered item
     * @returns {{top: number, left: number}|*}
     */
    offset: function() {
        return this._offset;
    },

    /**
     * @method
     * @public
     * @name newWidth
     * @description return new width of centered item
     * @returns {number}
     */
    newWidth: function() {
        return this._newWidth;
    },

    /**
     * @method
     * @public
     * @name newHeight
     * @description return new height of centered item
     * @returns {number}
     */
    newHeight: function() {
        return this._newHeight;
    },

    /**
     * @method
     * @public
     * @name map
     * @description map from original item point to new point after centered
     * @param x (Number)
     * @param y (Number)
     * @param withoutContainer (Boolean). do we need to consider container while doing mapping
     */
    map: function(x, y, withoutContainer) {
        var r = this._newWidth / this._iWidth,
            p = {x: 0, y: 0};

        p.x = x * r;
        p.y = y * r;

        if(!withoutContainer) {
            p.x += this.offset().left;
            p.y += this.offset().top;
        }

        return p;
    }
};
