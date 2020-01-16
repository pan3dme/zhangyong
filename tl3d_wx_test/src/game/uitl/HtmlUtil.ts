    class HtmlUtil {

        /**
         * 转换html样式
         * @param text 文本内容
         * @param remove 是否移除html样式
         */
        static convertHtmlText(text:string,remove:boolean=false):string {
            return remove ? text.replace(RegConst.HTML_REG, "") : text;
        }

        /**
         * 生成html文本
         * @param elements 
         */
        // static createHtmlText(elements: ITextElement[]): string {
        //     if (!elements || elements.length == 0) return "";
        //     let str = "";
        //     for (let i = 0, len = elements.length; i < len; i++) {
        //         let elmt = elements[i];
        //         let style = elmt.style;
        //         if(style && Object.keys(style).length > 0){
        //             if(style.imgSrc){
        //                 str += `<img style='${HtmlUtil.getStyleStr(style)}' src='${style.imgSrc}'>${elmt.text}</img>`;
        //             }else if(style.href){
        //                 str += `<span style='${HtmlUtil.getStyleStr(style)}' href='${style.href}'>${elmt.text}</span>`;
        //             }else{
        //                 str += `<span style='${HtmlUtil.getStyleStr(style)}'>${elmt.text}</span>`;
        //             }
        //         }else{
        //             str += elmt.text;
        //         }
        //     }
        //     return str;
        // }
        // /** 获取样式文本 */
        // static getStyleStr(style:ITextElementStyle):string {
        //     let styleText = "";
        //     for(let key in style){
        //         if(key == "textColor"){
        //             styleText += `color:${style.textColor};`;
        //         }else if(key == "fontSize"){
        //             styleText += `fontSize:${style.fontSize};`;
        //         }else if(key == "strokeColor"){
        //             styleText += `strokeColor:${style.strokeColor};`;
        //         }else if(key == "stroke"){
        //             styleText += `stroke:${style.stroke};`;
        //         }else if(key == "fontFamily"){
        //             styleText += `fontFamily:${style.fontFamily};`;
        //         }else if(key == "padding"){
        //             styleText += `padding:${style.padding};`;
        //         }
        //     }
        //     return styleText;
        // }

    }

    interface ITextElement {
        text: string;
        style?: ITextElementStyle;
    }

    interface ITextElementStyle {
        textColor?: string;
        fontSize?: number;
        strokeColor?: string;
        stroke?: number;
        fontFamily?: string;
        padding ?: string;
        imgSrc ?: string;
        href ?: string;
    }