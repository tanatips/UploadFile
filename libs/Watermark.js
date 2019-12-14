const Jimp = require("jimp");
class Watermark{
    constructor(){
    }  
    static genWatermark(ORIGINAL_IMAGE,LOGO,FILENAME){
        const LOGO_MARGIN_PERCENTAGE = 5;
        const main = async () => {
        const [image, logo] = await Promise.all([
            Jimp.read(ORIGINAL_IMAGE),
            Jimp.read(LOGO)
        ]);

        logo.resize(image.bitmap.width / 10, Jimp.AUTO);

        const xMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;
        const yMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;

        const X = image.bitmap.width - logo.bitmap.width - xMargin;
        const Y = image.bitmap.height - logo.bitmap.height - yMargin;

        return image.composite(logo, X, Y, [
            {
            mode: Jimp.BLEND_SCREEN,
            opacitySource: 0.05,
            opacityDest: 1
            }
        ]);
        };
        main().then(image => image.write(FILENAME));
    }
    static checkExtension(filename,object_type){
        console.log("filename:"+filename);
        if(filename!=null){
        var ext = filename.split('.').pop().toLowerCase();
        var lstExt= ["png","jpg","jpeg"];
        if(object_type==="Photo"){
            if(lstExt.indexOf(ext)===-1){
                return false;
            }
            else{
                return true;
            }
        }   
        }
        return false;
    }
}

module.exports = Watermark;

