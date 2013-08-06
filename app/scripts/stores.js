var YStores = function() {

    var compiledTemplate, isCompiled, renderQueue, renderCallback, renderData;
    var log = bows( 'YStores' );

    var settings = {
        template : 'scripts/templates/storeList.template'
    };

    var dom = {
        mainContainer   : '.js-product-item',
        expandContainer : '.js-product-expand-container',
        infoContainer   : '.js-product-info'
    };


    var messages = {
        init       : 'Initialized YStores handler',
        getHtml    : 'requested html',
        noData     : 'requested html, but no data provided. Abort',
        noCallback : 'requested html but no callback provided. Abort'
    };


    (function init() {
        log( messages.init );
        preLoadTemplate();
    })();


    function getHtml( data, callback ) {
        log( messages.getHtml );

        if( data ) {
            if ( isCompiled ) {
                var html = compiledTemplate( data );
                if ( callback ) {
                    callback ( html );
                } else {
                    log( messages.noCallback );
                }
            } else {
                if ( callback ) {
                    renderQueue = true;
                    renderCallback = callback;
                    renderData = data;
                } else {
                    log( messages.noCallback );
                }
            }
        } else {
            log( messages.noData );
        }
    }

    /**
     * preload and compile the info box template
     */
    function preLoadTemplate() {
        $.ajax({
            type     : 'GET',
            url      : settings.template,
            success  : function( template ) {
                compiledTemplate = Handlebars.compile( template );
                isCompiled = true;
                if ( renderQueue ) {
                    var html = compiledTemplate( renderData );
                    renderCallback( html );
                }
            }
        });
    }


    return {
        getHtml : getHtml
    };

};
