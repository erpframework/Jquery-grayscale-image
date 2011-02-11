// Grise une image
jQuery.fn.grayscaleImage = function(turnGray) {
    return this.each(function(index, imgObj) {
        if(turnGray) {
            if($(imgObj).attr('src') && $(imgObj).attr('src') != "" && !$(imgObj).attr('oldSrc')) {
                if($.browser.msie && $.browser.version.substr(0,1) != 9){
                    $(imgObj).css('filter','progid:DXImageTransform.Microsoft.BasicImage(grayScale=1)');
                } else {
                    var canvas = document.createElement('canvas');
                    var canvasContext = canvas.getContext('2d');

                    var imgW = imgObj.width;
                    var imgH = imgObj.height;
                    canvas.width = imgW;
                    canvas.height = imgH;
                    canvasContext.drawImage(imgObj, 0, 0);
                    var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);

                    for(var y = 0; y < imgPixels.height; y++){
                        for(var x = 0; x < imgPixels.width; x++){
                            var i = (y * 4) * imgPixels.width + x * 4;
                            var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                            imgPixels.data[i] = avg;
                            imgPixels.data[i + 1] = avg;
                            imgPixels.data[i + 2] = avg;
                        }
                    }

                    canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
                    $(imgObj).attr('oldSrc',$(imgObj).attr('src'));
                    $(imgObj).attr('src',canvas.toDataURL());
                }
            }
        } else {
            if($.browser.msie && $.browser.version.substr(0,1) != 9){
                $(imgObj).css('filter','');
            } else {
                if($(imgObj).attr('oldSrc')) {
                    $(imgObj).attr('src',$(imgObj).attr('oldSrc'));
                    $(imgObj).removeAttr('oldSrc');
                }
            }
        }
    });
}