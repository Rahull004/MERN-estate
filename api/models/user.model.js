import mongoose from "mongoose";

const userSchemma = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://www.bing.com/images/search?view=detailV2&ccid=nVsGp19c&id=F7CEE94B9412DDD8EC7C535D607EE9FAE6437745&thid=OIP.nVsGp19c43-fpX_oIZ9ZAQAAAA&mediaurl=https%3a%2f%2fretroscroll.cat%2fwp-content%2fuploads%2f2014%2f10%2fshyguy.png&exph=352&expw=352&q=+random+avatar&simid=608021259227178514&FORM=IRPRST&ck=DF0196BA8681B3DDA3E75F023899E9E0&selectedIndex=4&itb=0&ajaxhist=0&ajaxserp=0"
    }
}, { timestamps: true })

const User = mongoose.model('User',userSchemma);

export default User;