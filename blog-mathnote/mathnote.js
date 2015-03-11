(function ($) {
    var MathNote = function (element, options) {

        var delay = 150;           // delay after keystroke before updating
        var preview = null;     
        var previewJQSel = null; 
        var reviewId = null;   
        var buffer = null;     
        var bufferJQSel = null;
        var bufferId = null;    
        var mathInput = null;   
        var mathInputJQSel = null;
        var mathInputId = null; 
        var timeout = null;        // store setTimout id
        var mjRunning = false;     // true when MathJax is processing
        var oldText = null;        // used to check if an update is needed
        var callback = null;
        var elem = $(element);

        var obj = this;
        var settings = $.extend({
            param: 'defaultValue'
        }, options || {});

        var inputElem = elem.find('.input').first();
        var bufferElem = elem.find('.buffer').first();
        var previewElem = elem.find('.preview').first();

        if (!bufferElem.length) 
        {
            alert("Buffer could not be found");
            return;
        }

        if (!previewElem.length) 
        {
            alert("Preview could not be found");
            return;
        }

        mathInputId = inputElem.attr("id");
        bufferId = bufferElem.attr("id");
        previewId = previewElem.attr("id");

        preview = document.getElementById(previewId);
        buffer = document.getElementById(bufferId);

        //
        //  Switch the buffer and preview, and display the right one.
        //  (We use visibility:hidden rather than display:none since
        //  the results of running MathJax are more accurate that way.)
        //
        var SwapBuffers = function () {
            var bufferTemp = preview, previewTemp = buffer;
            buffer = bufferTemp; preview = previewTemp;
            buffer.style.visibility = "hidden"; buffer.style.position = "absolute";
            preview.style.position = ""; preview.style.visibility = "";
        };

        //
        //  This gets called when a key is pressed in the textarea.
        //  We check if there is already a pending update and clear it if so.
        //  Then set up an update to occur after a small delay (so if more keys
        //    are pressed, the update won't occur until after there has been 
        //    a pause in the typing).
        //  The callback function is set up below, after the Preview object is set up.
        //
        var Update = function () {
            if (timeout) { clearTimeout(timeout) }
            timeout = setTimeout(callback, delay);
        };

        //
        //  Indicate that MathJax is no longer running,
        //  and swap the buffers to show the results.
        //
        var PreviewDone = function () {
            console.log('PreviewDone from ' + elem.attr("id"));
            mjRunning = false;
            SwapBuffers();
        };
        
        //
        //  Creates the preview and runs MathJax on it.
        //  If MathJax is already trying to render the code, return
        //  If the text hasn't changed, return
        //  Otherwise, indicate that MathJax is running, and start the
        //    typesetting.  After it is done, call PreviewDone.
        //
        var CreatePreview = function () {
            console.log('Create preview');
            timeout = null;
            if (mjRunning) return;
            var text = mathInputJQSel.val();
            if (text === oldText) return;

            text = text.replace(/[\n\r]/g, '<br />');

            buffer.innerHTML = oldtext = text;
            mjRunning = true;
            MathJax.Hub.Queue(
                ["Typeset", MathJax.Hub, buffer],
                [PreviewDone]
            );
        };
        
        //
        // Get the preview and buffer DIV's
        //
        var Init = function () {
            preview = document.getElementById(previewId);
            buffer = document.getElementById(bufferId);

            // Set up JQuery selector
            mathInputJQSel = $("#" + mathInputId);
            bufferJQSel = $("#" + bufferId);
            previewJQSel = $("#" + previewId);

            // Initial settings: input is hidden and preview is shown
            mathInputJQSel.hide();
            bufferJQSel.show();

            // Show input box if user clicks on note
            bufferJQSel.click(function (e) {
                console.log(mathInputJQSel);
                mathInputJQSel.show();
                mathInputJQSel.select();
                e.stopPropagation();
            });
            previewJQSel.click(function (e) {
                console.log(mathInputJQSel);
                mathInputJQSel.show();
                mathInputJQSel.select();
                e.stopPropagation();
            });

            // Close input if user clicks on the canvas
            $('html').click(function () {
                mathInputJQSel.hide();
            });

            // If user clicks on the input, do not propagate event
            mathInputJQSel.click(function (e) {
                e.stopPropagation();
            });

            // On blur, hide input
            mathInputJQSel.blur(function (e) {
                mathInputJQSel.hide();
            });

            mathInputJQSel.keyup(function () {
                Update();
            });

            Update();
        };
        callback = MathJax.Callback([CreatePreview]);
        callback.autoReset = true;

        Init();
    };

    $.fn.MathNote = function (options) {
        return this.each(function () {
            var element = $(this);

            // Return early if this element already has a plugin instance
            if (element.data('MathNote')) return;

            // pass options to plugin constructor
            var myplugin = new MathNote(this, options);

            // Store plugin object in this element's data
            element.data('MathNote', myplugin);

            // Access plugin
            // var myplugin = $('#id').data('MathNote');
        });
    };
})(jQuery);