
let deviceWidth = device.width;
let deviceHeight = device.height;

let EUtil = require('../EUtil.js');
const CONFIG_STORAGE_NAME = 'starsBallTargetScore'
let configStorage = storages.create(CONFIG_STORAGE_NAME);
let pwmap = require("../modules/MODULE_PWMAP");
let encrypt = pwmap.encrypt;
let passWorld = configStorage.get("savePhonePassword");
encrypt(passWorld);
require("../modules/MODULE_UNLOCK").unlock();
//偷能量开始了
function startAntForest() {
    sleep(3000);
    console.log("直接进入蚂蚁森林页面")
    app.startActivity({
        action: "VIEW",
        data: "alipays://platformapi/startapp?appId=60000002",
    });

    //过年增加 有个弹窗
    let closeMc = className("android.widget.Button").text("关闭蒙层").findOnce();
    if (closeMc != null) {
        closeMc.click();
        sleep(1000);
    }
    //是否有好友送的能量
    // getGoldEnergy();
    let onlyForOnce = true;
    while (onlyForOnce) {
        sleep(1000);
        startCircleTCenergy();
        let back2main = text("startapp?appId=60000002&url=%2Fwww%2Fhome").findOnce();
        if (back2main != null) {
            back2main.click();
            sleep(2000);
            onlyForOnce = false;
        }
    }
    back();
    sleep(500);
    back();
    sleep(500);
    back();
    sleep(500);
    toastLog("完成了");

    let h = new Date().getHours();
    // if (h < 9) {
        let afmillis = new Date().getTime() + 5 * 60 * 1000;
        timers.addDisposableTask({
            path: '../src/antForestTimeTask.js',
            date: afmillis
        })
        toastLog("下一个定时任务预定成功: " + task);
    // }

}


function getCurrentTimeMins() {
    let dateT = new Date();
    let hour = dateT.getHours();
    let month = dateT.getUTCMonth() + 1;
    let year = dateT.getFullYear();
    let day = dateT.getUTCDate();
    let minte = dateT.getMinutes() + 5;
    return year + '-' + month + '-' + day + 'T' + hour + ':' + minte + ':00'
}

function startCircleTCenergy() {
    let kanLinQu = className("android.widget.Button").text("看林区").findOne(3000);
    console.log("父布局", kanLinQu)
    if (kanLinQu != null) {
        console.log("执行中");
        sleep(2000);
        collectEnergy(kanLinQu);
        let beiBaoItem = className('android.widget.Button').text('背包').findOne(3000);
        let jiaoShuiItem = className('android.widget.Button').text('浇水').findOne(3000);
        if (beiBaoItem != null) {
            click(deviceWidth * 0.95, beiBaoItem.bounds().centerY());
        } else if (jiaoShuiItem != null) {
            click(deviceWidth * 0.95, jiaoShuiItem.bounds().centerY());
        }
    }
}


function getGoldEnergy() {
    toastLog("判断是否有黄金能量");
    let goldEnergy = EUtil.ImageSearchEngin('./res/antTree_gold_energy.png', [0, deviceHeight * 0.135, deviceWidth, deviceHeight * 0.135], 1);
    while (goldEnergy != -1) {
        click(goldEnergy[0].point.x + 50, goldEnergy[0].point.y - 50);
        sleep(1000);
        goldEnergy = EUtil.ImageSearchEngin('./res/antTree_gold_energy.png', [0, deviceHeight * 0.135, deviceWidth, deviceHeight * 0.135], 1);
    }
}


function collectEnergy(klq) {
    klq.parent().children().forEach(child => {
        if (child.text() == ' ' || child.text().startsWith("收集能量")) {
            click(child.bounds().centerX(), child.bounds().centerY());
            sleep(150);
            console.log("点击收能量")
        }
    });
}

/**
 * 从排行榜 找到可以收取能量的
 */
function getCanStealfriend(handImg) {
    let img = getScreenImg();
    let pList = images.matchTemplate(img, handImg, { threshold: 0.8, region: [deviceWidth * 0.9, deviceHeight * 0.16], max: 9 });
    if (pList != null) {
        console.log("找到的做标记", pList.matches);
        return pList.matches;
    }
}

/**
 * 获取屏幕图片
 */
function getScreenImg() {
    let screenPic = captureScreen();
    console.log(screenPic);
    sleep(100);
    if (screenPic == null || typeof (screenPic) == "undifined") {
        toastLog("截图失败,退出脚本");
        exit();
    } else {
        return screenPic;
    }
}

startAntForest()