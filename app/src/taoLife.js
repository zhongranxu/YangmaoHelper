let deviceWidth = device.width;
let deviceHeight = device.height;
let EUtil = require('../EUtil.js');

function startTaoLife(isFromGold) {
    //打开淘宝 金币庄园过来不判断

    if (!isFromGold) {
        launch("com.taobao.taobao");
        sleep(3000);
        //先判断是否游戏界面了
        let taoLifeDiv = className("android.webkit.WebView").text("第二人生").findOnce();
        if (taoLifeDiv == null) {
            //判断是否在淘宝首页
            let homeMine = className("android.widget.FrameLayout").descContains("我的淘宝").findOnce();
            let witeTaoBaoOpemTime = 8;

            while (homeMine == null && witeTaoBaoOpemTime > 0) {
                homeMine = className("android.widget.FrameLayout").descContains("我的淘宝").findOnce();
                sleep(1000);
                witeTaoBaoOpemTime--;
            }

            if (witeTaoBaoOpemTime == 0) {
                toastLog("等待进入界面超时");
                exit();
            }
            if (homeMine != null) {
                sleep(1000);
                //在首页
                homeMine.click();
                sleep(1000);
                //去到游戏界面
                let collectUI = className("android.widget.LinearLayout").descContains("收藏夹").findOnce();
                console.log("找到了收藏夹", collectUI);
                //找到头像
                if (collectUI != null) {
                    let clickY = collectUI.bounds().top - 100;
                    let clickX = collectUI.bounds().centerX();
                    click(clickX, clickY);
                }
            }
        }
    }

    let taoLifeDiv = className("android.webkit.WebView").text("第二人生").findOnce();
    let witeTime = 15;
    while (taoLifeDiv == null & witeTime > 0) {
        sleep(1000);
        witeTime--;
        taoLifeDiv = className("android.webkit.WebView").text("第二人生").findOnce();
    }
    if (taoLifeDiv == null) {
        toastLog("等待超时");
        exit();
    } else {
        console.log("进来了");
        //给加载时间
        sleep(10000);
        if (isFromGold) {
            toastLog("金币庄园过来,多呆10秒");
            sleep(11000);
        }
        if (isFromGold) {
            //判断当前界面 是否有送卡
            console.log("判断当前界面 是否有送卡");
            getCurentHasCartToGet();
            //判断当前是否有可关闭广告
            console.log("判断当前是否有可关闭广告");
            juadgeCurrentHasAD();
            //返回上级
            _backTo();
        } else {
            //判断当前界面 是否有送卡
            console.log("判断当前界面 是否有送卡");
            getCurentHasCartToGet();
            //判断当前是否有可关闭广告
            console.log("判断当前是否有可关闭广告");
            juadgeCurrentHasAD();
            //送卡
            sendCard();
            //抽套装
            getSuits();
            //去领取签到的
            singnGetCj();
        }

    }
}

function getSuits() {
    let taozhuangBtn = EUtil.ImageSearchEngin('./res/taolife_chou.png', [0, deviceHeight - 350, deviceWidth, 350], 1);
    console.log("判断是否首页");
    if (taozhuangBtn != -1) {
        click(taozhuangBtn[0].point.x + 50, taozhuangBtn[0].point.y + 50);
        //等待 是否进入界面
        let witeTime = 5;
        let getMoreCardBtn = EUtil.ImageSearchEngin('./res/taolife_get_more_card.png', [0, deviceHeight - 250, deviceWidth, 250], 1);
        while (getMoreCardBtn == null && witeTime > 0) {
            sleep(1000);
            getMoreCardBtn = EUtil.ImageSearchEngin('./res/taolife_get_more_card.png', [0, deviceHeight - 250, deviceWidth, 250], 1);
            witeTime--;
        }

        if (getMoreCardBtn != null) {
            //判断是否有卡片领取
            console.log("查看是否有12点后的卡片领取");
            let hasCardAfter12 = EUtil.ImageSearchEngin('./res/taolife_get_card6.png', [deviceWidth * 0.8, deviceHeight / 2, deviceWidth * 0.2, 200], 1);
            if (hasCardAfter12 != -1) {
                console.log("领取12点后的卡片");
                //点击领取
                click(hasCardAfter12[0].point.x, hasCardAfter12[0].point.y);
                sleep(1000);
                //关闭弹窗
                let confirmB = EUtil.ImageSearchEngin('./res/taolife_send_5_confirm.png', [deviceWidth / 3, deviceHeight / 2, deviceWidth / 3, deviceHeight * 0.21], 1);
                if (confirmB != -1) {
                    click(confirmB[0].point.x, confirmB[0].point.y);
                    sleep(1000);
                }
            } else {
                console.log("已领取12点后的卡片");
            }
            // 去获取的卡片任务都做了
            let moreCard = EUtil.ImageSearchEngin('./res/taolife_get_more_card.png', [0, deviceHeight - 250, deviceWidth, 250], 1);
            click(moreCard[0].point.x + 60, moreCard[0].point.y + 60);
            sleep(1000);
            let invest = EUtil.ImageSearchEngin('./res/taolife_go_invest.png', [deviceWidth / 2, deviceHeight * 0.45, deviceWidth / 2, 400], 1);
            if (invest != -1) {
                click(invest[0].point.x, invest[0].point.y);
                //等待弹窗
                sleep(2000);
                //固定点第一个
                click(100, deviceHeight * 0.6);
                sleep(2000);
                //返回
                id("left_item").findOnce().click();
                sleep(1000);
                let goldChangeCard = EUtil.ImageSearchEngin('./res/taolife_gold_card.png', [deviceWidth / 2, deviceHeight - 300, deviceWidth / 2, 300], 1);
                if (goldChangeCard != -1) {
                    click(goldChangeCard[0].point.x, goldChangeCard[0].point.y);
                    sleep(2000);
                    let confirmGold = EUtil.ImageSearchEngin('./res/taolife_gold_confirm.png', [deviceWidth / 2, deviceHeight / 2, deviceWidth / 2, deviceHeight * 0.21], 1);
                    if (confirmGold != -1) {
                        click(confirmGold[0].point.x, confirmGold[0].point.y);
                        sleep(1000);
                        let confirmCard3 = EUtil.ImageSearchEngin('./res/taolife_send_5_confirm.png', [deviceWidth / 3, deviceHeight / 2, deviceWidth / 3, deviceHeight * 0.21], 1);
                        if (confirmCard3 != -1) {
                            click(confirmCard3[0].point.x, confirmCard3[0].point.y);
                        }
                    }
                }
                //关闭pop
                click(deviceWidth / 2, 300);
                sleep(1000);
            }
            //做抽取任务
            //判断当前套装 是否已经集齐
            let hasNumSuit = EUtil.ImageSearchEngin('./res/taolife_has_suit.png', [0, deviceHeight - 430, deviceWidth * 0.669, 200], 6);
            console.log("当前套装状态", hasNumSuit);
            if (hasNumSuit != -1) {
                let maxSearch = 9;
                let hasGetSuit = false;
                console.log("当前套装所得数量", hasNumSuit.length);
                while (!hasGetSuit && maxSearch > 0) {
                    //判断当前套装数量
                    if (hasNumSuit.length < 4) {//没有抽完
                        console.log("当前套装没有抽完");
                        let choutaozhuang = EUtil.ImageSearchEngin('./res/taolife_get_suit.png', [deviceWidth / 2, deviceHeight - 300, deviceWidth / 2, 300], 1);
                        if (choutaozhuang != -1) {
                            console.log("抽套装");
                            click(choutaozhuang[0].point.x, choutaozhuang[0].point.y);
                            sleep(5000);
                            //抽套装
                            let confrimSuit = EUtil.ImageSearchEngin('./res/taolife_send_5_confirm.png', [deviceWidth / 3, deviceHeight / 2, deviceWidth / 3, deviceHeight * 0.21], 1);
                            if (confrimSuit != -1) {
                                click(confrimSuit[0].point.x, confrimSuit[0].point.y);
                                sleep(1000);
                                hasGetSuit = true;
                                break;
                            }
                        }
                    } else {//当前套装已经齐全 换下一套
                        console.log("当前套装已完成，换下一套");
                        swipe(deviceWidth / 2, deviceHeight * 0.688, deviceWidth / 5, deviceHeight * 0.688, 500);
                        sleep(500);
                        hasNumSuit = EUtil.ImageSearchEngin('./res/taolife_has_suit.png', [0, deviceHeight - 430, deviceWidth * 0.669, 200], 6);
                        maxSearch--;
                    }
                }

            }
        }
        //搞定了 回去
        backGameBtn();
    } else {
        toastLog("不在游戏首页，退出")
        exit();
    }
}

function sendCard() {
    let searchResult = EUtil.ImageSearchEngin('./res/taolife_vist.png', [0, deviceHeight - 350, deviceWidth, 350], 1);
    toastLog("判断是否首页");
    if (searchResult != -1) {
        console.log("找到看朋友入口", searchResult);
        click(searchResult[0].point.x + 50, searchResult[0].point.y + 50);
        sleep(1000);
        let sendCard = 0;
        console.log("进入好友互动列表");
        for (let k = 0; k < 8; k++) {
            console.log("进入好友互动列表 开始送卡和点赞=" + k);
            let sendCardPosition = EUtil.ImageSearchEngin('./res/taolife_send_card.png', [deviceWidth * 0.7, deviceHeight / 2, deviceWidth * 0.3 - 100, deviceHeight / 2], 5);
            if (sendCardPosition != -1) {
                console.log("开始送卡");
                for (let i = 0; i < sendCardPosition.length; i++) {
                    let cardItem = sendCardPosition[i];
                    //需要进行二次对比 判断颜色是否一致  否则是送过得
                    let temple1 = images.read('./res/taolife_send_card.png');
                    let color1 = images.pixel(temple1, 65, 38);
                    let color2 = images.pixel(getScreenImg(), cardItem.point.x + 65, cardItem.point.y + 38)
                    let isSimiler = colors.isSimilar(color1, color2);
                    console.log("颜色对比", color1 + "===" + color2);
                    //第五个才开始判断颜色 不一样则直接跳过 否则不跳
                    if (sendCard > 4) {
                        if (!isSimiler) {
                            continue;
                        }
                    }
                    click(cardItem.point.x + 50, cardItem.point.y + 50);
                    sleep(300);
                    if (sendCard < 5) {
                        toastLog("送卡片");
                        click(cardItem.point.x + 50, cardItem.point.y + 50);

                        let atFriendHome = EUtil.ImageSearchEngin('./res/taolife_friend_photo.png', [deviceWidth * 0.7, deviceHeight / 2, deviceWidth * 0.3 - 100, deviceHeight / 2], 1);
                        //等待进家里时间
                        let maxWiteFriendTime = 10;
                        while (atFriendHome == -1 && maxWiteFriendTime > 0) {
                            sleep(1000);
                            atFriendHome = EUtil.ImageSearchEngin('./res/taolife_friend_photo.png', [deviceWidth * 0.7, deviceHeight / 2, deviceWidth * 0.3 - 50, deviceHeight / 2], 1);
                            maxWiteFriendTime--;
                        }
                        if (atFriendHome != -1) {//在别人家里面
                            console.log("进入好友家里");
                            let thumbUp = EUtil.ImageSearchEngin('./res/taolife_tumb_up.png', [deviceWidth * 0.7, deviceHeight / 2, deviceWidth * 0.3 - 50, deviceHeight / 2], 1);
                            if (thumbUp != -1) {
                                //点赞
                                click(thumbUp[0].point.x, thumbUp[0].point.y);
                                sleep(100);
                                toastLog("给好友点赞");
                                sendCard++;
                                if (sendCard == 5) {//5次送卡  有额外一个弹窗
                                    toastLog("5次送卡  有额外一个弹窗 关闭");
                                    sleep(1500);
                                    let confirmB = EUtil.ImageSearchEngin('./res/taolife_send_5_confirm.png', [deviceWidth / 3, deviceHeight / 2, deviceWidth / 3, deviceHeight * 0.21], 1);
                                    if (confirmB != -1) {
                                        sleep(1500);
                                        click(confirmB[0].point.x, confirmB[0].point.y);
                                        sleep(500);
                                    }
                                }
                            }

                            let findeBackPoint = EUtil.ColorSearchEngin("#333333", [45, 225, 30, 75]);
                            if (findeBackPoint != -1) {
                                click(findeBackPoint.x, findeBackPoint.y);
                                toastLog("返回下一个");
                                sleep(1500);
                            }
                        } else {
                            back();
                            toastLog("进好友家超时，退出");
                        }
                    }
                }
            }
            //滑动屏幕
            // let scrollHeight = 202 * 5 * k;
            swipe(deviceWidth / 2, deviceHeight - 200, deviceWidth / 2, deviceHeight - 1000, 4000);
            sleep(4000);
            toastLog("下一屏");
        }
        backGameBtn();
    } else {
        toastLog("不在游戏首页，退出")
        exit();
    }
}

function backGameBtn(color) {
    if (color == undefined || color == null) {
        color = "#333333";
    }
    let findeBackPoint = EUtil.ColorSearchEngin(color, [45, 225, 30, 75]);
    if (findeBackPoint != -1) {
        click(findeBackPoint.x, findeBackPoint.y);
        sleep(1000);
    }
}

function singnGetCj() {
    let qiandao = className("android.view.View").text("成就签到").findOnce().parent().children()[5].children()[0];
    if (qiandao != null) {
        console.log("成就签到");
        qiandao.click();
        sleep(1000);
        let xinyuanka = className("android.view.View").text("心愿卡 x2").findOnce().parent();
        let childs = xinyuanka.children()[3];
        childs.click();
        sleep(1000);
    }

    let tiliSign = className("android.view.View").text("拿服装消耗 5 次体力").findOnce().parent().children()[5].children()[0];
    tiliSign.click();
    console.log("拿服装消耗");

    let xiadan = className("android.view.View").text("下单购买宝贝1次").findOnce().parent().children()[5].children()[0];
    xiadan.click();
    console.log("下单购买宝贝1次");

    let taozhuan = className("android.view.View").text("抽套装玩法参与 1 次").findOnce().parent().children()[5].children()[0];
    taozhuan.click();
    console.log("抽套装玩法参与");
    //回去白色的
    backGameBtn("#FFFFFF");
}


function juadgeCurrentHasAD() {
    let adScreen = getScreenImg();
    let hasTip = images.read("./res/tao_life_no_tip.png");
    let hasAdMatches = images.matchTemplate(adScreen, hasTip, { threshold: 0.8, region: [0, deviceHeight / 2], max: 1 }).matches;
    while (hasAdMatches != null && hasAdMatches.length > 0) {
        let pointClose = hasAdMatches[0];
        //关闭
        click(pointClose.point.x + deviceWidth * 0.34, pointClose.point.y + deviceHeight * 0.089);
        sleep(1000);
        let adScreen = getScreenImg();
        hasAdMatches = images.matchTemplate(adScreen, hasTip, { threshold: 0.8, region: [0, deviceHeight / 2], max: 1 }).matches;
    }
}

function getCurentHasCartToGet() {
    let cardScreen = getScreenImg();
    let taoCardToGet = images.read("./res/send_wish_card.png");
    let hasCardMatches = images.matchTemplate(cardScreen, taoCardToGet, { threshold: 0.8, region: [deviceWidth / 3, deviceHeight * 0.338], max: 1 }).matches;
    if (hasCardMatches != null && hasCardMatches.length > 0) {
        let pointGet = hasCardMatches[0];
        console.log("找到的领卡位置", pointGet);
        toastLog("有可以领取的卡片");
        //点击领取
        for (let i = 0; i < 6; i++) {
            //领取
            click(pointGet.point.x + 110, pointGet.point.y + 50);
            sleep(300);
            //回赠
            click(pointGet.point.x - 135, pointGet.point.y + 50);
            sleep(300);
            //换
            click(pointGet.point.x + 310, pointGet.point.y - 142);
            sleep(400);
        }
        //点击关闭
        click(deviceWidth / 2, pointGet.point.y + 300);
        sleep(500)
    }
}

function _backTo() {
    back();
    sleep(1000);
    let backScreen = getScreenImg();
    let backTxt = images.read("./res/back_taobao.png");
    let hasCardMatches = images.matchTemplate(backScreen, backTxt, { threshold: 0.8, region: [deviceWidth / 3, deviceHeight / 2, deviceWidth / 3, deviceHeight * 0.27], max: 1 }).matches;
    if (hasCardMatches != null && hasCardMatches.length > 0) {
        click(deviceWidth / 2, hasCardMatches.point.y);
        sleep(2000);
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

// requestScreenCapture();
// getSuits();
// startTaoLife();
module.exports = startTaoLife;

